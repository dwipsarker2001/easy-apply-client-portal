import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ActionPanelProps } from "@/types";
import { HugeiconsIcon } from "@hugeicons/react";

interface Props {
  actions: ActionPanelProps[];
  className?: string;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const ActionPanel: React.FC<Props> = ({ actions, className, onClose, triggerRef }) => {
  const panelRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(document.createElement("div"));
  const [style, setStyle] = useState<React.CSSProperties>({});

  // Append to body
  useEffect(() => {
    const container = containerRef.current;
    document.body.appendChild(container);

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        (!triggerRef.current || !triggerRef.current.contains(target))
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.removeChild(container);
    };
  }, [onClose, triggerRef]);

  // Smart positioning logic
  useEffect(() => {
    if (triggerRef.current && panelRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const panelHeight = panelRef.current.offsetHeight;
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      const top =
        spaceBelow > panelHeight
          ? triggerRect.bottom + window.scrollY // open downward
          : spaceAbove > panelHeight
            ? triggerRect.top - panelHeight + window.scrollY // open upward
            : Math.max(0, triggerRect.bottom + window.scrollY - panelHeight); // fallback

      setStyle({
        position: "absolute",
        top,
        left: triggerRect.left + window.scrollX,
        zIndex: 9999,
        maxHeight: "80vh",
        overflowY: "auto",
      });
    }
  }, [triggerRef]);

  return createPortal(
    <ul
      ref={panelRef}
      style={style}
      className={`bg-component border-border/50 w-58 rounded-md border py-1 shadow-lg ${className || ""}`}
    >
      {actions.map((action, index) => (
        <li
          key={index}
          onClick={action.onClick}
          className="hover:bg-muted hover:bg-background mx-1 flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 font-medium transition"
        >
          <HugeiconsIcon icon={action.icon} className="h-5 w-5" />
          <span className="select-none">{action.label}</span>
        </li>
      ))}
    </ul>,
    containerRef.current,
  );
};

export default ActionPanel;

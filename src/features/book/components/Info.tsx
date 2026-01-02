import {
  Calendar03FreeIcons,
  CalendarUpload01FreeIcons,
  HelpSquareFreeIcons,
  LicenseFreeIcons,
  News01FreeIcons,
  Settings02FreeIcons,
  Delete02FreeIcons,
  CloudDownloadFreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import moment from "moment";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useDeleteBook } from "../hooks";
import { useRef, useState } from "react";
import ActionPanel from "@/components/ActionPanel";
import { ActionPanelProps } from "@/types";

interface TemplateProps {
  icon: IconSvgElement;
  property: string;
  value: string;
}

interface InfoProps {
  createdAt: string;
  updatedAt: string;
  totalChapters: string;
  totalGroups: string;
  totalQuestions: string;
}

const Template: React.FC<TemplateProps> = ({ icon, property, value }) => {
  return (
    <div className="text-secondary grid grid-cols-2 py-1">
      <div className="flex items-center gap-2">
        <HugeiconsIcon icon={icon} className="h-5 w-5" />
        <span className="font-semibold">{property}</span>
      </div>
      <span>: {value}</span>
    </div>
  );
};

const Info: React.FC<InfoProps> = (props) => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { deleteBook } = useDeleteBook();
  const [openActionPanel, setOpenActionPanel] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const actions: ActionPanelProps[] = [
    {
      label: "Download Book",
      icon: CloudDownloadFreeIcons,
      onClick: () => {
        toast.info("Download started...");
        setOpenActionPanel(false);
        window.open(`${import.meta.env.VITE_BASE_URL}brain-bank/download/database`, "_blank");
      },
    },
    {
      label: "Delete Book",
      icon: Delete02FreeIcons,
      onClick: () => {
        deleteBook(Number(bookId), () => {
          toast.success("Book Delete Successful");
          navigate("/brain-bank/create-book");
        });
        setOpenActionPanel(false);
      },
    },
  ];

  return (
    <div className="relative px-4 pb-4">
      <Template
        icon={Calendar03FreeIcons}
        property="Created At"
        value={moment(props.createdAt).format("MMMM Do YYYY")}
      />
      <Template
        icon={CalendarUpload01FreeIcons}
        property="Updated At"
        value={moment(props.updatedAt).format("MMMM Do YYYY")}
      />
      <Template icon={News01FreeIcons} property="Chapters" value={props.totalChapters} />
      <Template icon={LicenseFreeIcons} property="Group" value={props.totalGroups} />
      <Template icon={HelpSquareFreeIcons} property="Questions" value={props.totalQuestions} />

      {bookId && (
        <div className="absolute right-0 bottom-0 m-5">
          <button
            ref={buttonRef}
            onClick={() => setOpenActionPanel((prev) => !prev)}
            className="bg-background/50 hover:bg-background rounded-full p-2 transition"
          >
            <HugeiconsIcon className="h-4 w-4" icon={Settings02FreeIcons} />
          </button>
          {openActionPanel && (
            <ActionPanel triggerRef={buttonRef} actions={actions} onClose={() => setOpenActionPanel(false)} />
          )}
        </div>
      )}
    </div>
  );
};

export default Info;

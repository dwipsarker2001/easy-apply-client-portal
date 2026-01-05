import React from "react";

interface PropsType {
  message: string;
  direction?: "sent" | "received";
}

const TextMessage: React.FC<PropsType> = ({
  message,
  direction = "received",
}) => {
  return (
    <div className={direction === "sent" ? "flex flex-row-reverse" : "flex"}>
      <div
        className={
          direction === "sent" ? "bg-slate-700 p-2 text-white" : "bg-white p-2"
        }
      >
        {message}
      </div>
    </div>
  );
};

export default TextMessage;

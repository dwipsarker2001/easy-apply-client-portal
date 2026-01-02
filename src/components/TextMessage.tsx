import React from "react";

interface PropsType {
  message: string;
  type?: "sent" | "received";
}

const TextMessage: React.FC<PropsType> = ({ message, type = "received" }) => {
  return (
    <div className={type === "sent" ? "flex flex-row-reverse" : "flex"}>
      <div
        className={
          type === "sent" ? "bg-slate-700 p-2 text-white" : "bg-white p-2"
        }
      >
        {message}
      </div>
    </div>
  );
};

export default TextMessage;

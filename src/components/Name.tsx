import React from "react";
import { useAppSelector } from "../hooks"; // adjust path as needed
import { useTranslation } from "react-i18next";

const Name: React.FC = () => {
  const { t } = useTranslation();
  const { headingSize, paragraphSize } = useAppSelector((state) => state.theme);

  return (
    <div className="space-y-4 p-4">
      <h2 className={`${headingSize} font-bold`}>User Name Heading</h2>
      <p className={`${paragraphSize}`}>{t("welcome")}</p>
    </div>
  );
};

export default Name;

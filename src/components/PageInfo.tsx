import React from "react";
import { titleBarProps } from "../types";

const PageInfo: React.FC<titleBarProps> = (props) => {
  return (
    <section className="bg-component flex items-center justify-between px-7 py-2">
      <h2 className="text-primary text-lg font-semibold">{props.title}</h2>
      <ul className="flex items-center gap-2">
        {props.breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="text-secondary flex items-center">
            {index > 0 && <span className="mr-2">/</span>}
            {index === props.breadcrumbs.length - 1 ? (
              <span className="text-md">{breadcrumb.label}</span>
            ) : (
              <a href={breadcrumb.link} className="text-md text-primary hover:text-active">
                {breadcrumb.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PageInfo;

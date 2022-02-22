import React from "react";

export const BreadCrumbs: React.FC<{
  onChange: Function;
  tabs: string[];
  selecedTab: string;
}> = ({ onChange, tabs, selecedTab }) => {
  return (
    <div className="lg:max-w-5xl mx-auto px-4 mt-8">
      <div className="breadCrumbs">
        {tabs.map((tab, i) => (
          <div
            key={i + "tab"}
            className={`breadCrumbTab ${
              selecedTab === tab ? "selectedTab" : ""
            }`}
            onClick={() => onChange(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

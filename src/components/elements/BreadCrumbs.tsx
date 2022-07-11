import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ExplorerEvents } from "../ExplorerEvents";
import { Tools } from "../Tools";
import { useContext } from "react";
import { Paginator } from "./Paginator";
import { EventsContext } from "../../context/Events";

export const tabs = [{name: "View Tx", route: ''}, {name: "Processing Txns", route: 'processing'}, {name:"Tools", route: 'tools'}];

export const TabsNavigator = () => {

 return <Routes>
          <Route path="/*" element={<ExplorerEvents status=""/>} />
          <Route path="processing" element={ <ExplorerEvents status="Failed" />} />
          <Route path="tools" element={ <Tools />} />
        </Routes>
    

};

export const BreadCrumbs: React.FC<{
  onChange: Function;
  tabs: {name: string, route: string}[];
  selecedTab: string;
}> = ({ onChange, tabs, selecedTab }) => {

  const eventsContext = useContext(EventsContext);
 

  return (
    <div className="lg:max-w-5xl mx-auto px-4 mt-8">
      <div className="breadCrumbs">
        {tabs.map((tab, i) => (
          <Link to={tab.route} key={i + "key"}>
          <div
            key={i + "tab" }
            className={`breadCrumbTab text-sm text-[#222222] ${
              selecedTab === tab.name ? " selectedTab " : ""
            } ${eventsContext?.isLoading? 'nonactive': ''}`}
            onClick={() => onChange(tab.name)}
          >
            {tab.name}
          </div></Link>
        ))}
      </div>
    </div>
  );
};
//${ i === 1 || i === 2 ? ' nonactive ': ''}

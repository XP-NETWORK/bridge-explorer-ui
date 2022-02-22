import * as React from "react";

export const Chart: React.FC = () => {
  return (
    <div className="lg:max-w-5xl mx-auto px-4 mt-8">
      <div className="chartWrapper">
        <div className="chartVisual">
          <h3 className="font-medium">Daily Transactions</h3>
        </div>
        <div className="chartRates">
          <div className="periodButtons">
            <span>Today</span>
            <span>Last 7 days</span>
            <span>All period</span>
          </div>
          <ul className="chartInfoList">
            <li>
              <span className="chartItemName font-medium">Volume</span>
              <span className="chartItemValue">$324.34 M</span>
            </li>
            <li>
              <span className="chartItemName font-medium">Fees</span>
              <span className="chartItemValue">$324.34 M</span>
            </li>
            <li>
              <span className="chartItemName font-medium">Users</span>
              <span className="chartItemValue">$324.34 M</span>
            </li>
            <li>
              <span className="chartItemName font-medium">Tx</span>
              <span className="chartItemValue">$324.34 M</span>
            </li>
            <li>
              <span className="chartItemName font-medium">Avg Tx time</span>
              <span className="chartItemValue">213.12s/2.12m</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

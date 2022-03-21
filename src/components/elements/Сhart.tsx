import * as React from "react";
import { DailyData } from "../../pages/Dashboard";
import { withContainer } from "../../context/ServcieProvder";
import { Line, Column } from "@ant-design/plots";
import moment from "moment";
import { Loader } from "./Loader";

export const Chart = withContainer(
  ({
    dailyData,
    container: {
      fetching,
      appData: { totalTx },
    },
  }: {
    dailyData: DailyData[];
    container: any;
  }) => {
    let mockData = [
      {
        txNumber: 22,
        walletsNumber: 3,
        date: "2022/3/3",
      },
      {
        txNumber: 7,
        walletsNumber: 3,
        date: "2022/3/4",
      },
      {
        txNumber: 19,
        walletsNumber: 3,
        date: "2022/3/5",
      },
      {
        txNumber: 56,
        walletsNumber: 3,
        date: "2022/3/6",
      },
      {
        txNumber: 31,
        walletsNumber: 3,
        date: "2022/3/7",
      },
      ...dailyData,
    ];

    mockData = mockData.map((item, i) => ({
      ...item,
      adate: new Date(item.date).getTime(),
      idx: i,
    }));

    console.log(mockData);
    const config = {
      data: mockData,
      xField: "adate",
      yField: "txNumber",
      height: 200,
      
      tooltip: {
        showTitle: false,
        fields: ["txNumber", "date"],
      },
      yAxis: {
        grid: null
      },
      xAxis: {
        tickLine: {
          length: 0
        },
        
        label: {
          formatter: (text: string) => {
            if (+text === +moment("03/03/2022").startOf("day"))
              return moment("03/03/2022").format("D MMM YYYY");
            return +moment().startOf("day") === +text
              ? moment().format("D MMM YYYY")
              : null; //moment(+text).date()//dataObj.split('T')[0]
          },
        },
      },
    };

    return (
      <div className="lg:max-w-5xl mx-auto px-4 mt-3 md:mt-6">
        <div className="chartWrapper">
          <div className="chartVisual">
            <h3 className="font-medium text-[#222222]">Daily Transactions</h3>
            <div className="chartMetrics">
              <span>
                Today Tx:{" "}
                <span>
                  {fetching ? (
                    <Loader />
                  ) : (
                    mockData[mockData.length - 1].txNumber
                  )}
                </span>
              </span>
              <span>
                Total Tx: <span>{fetching ? <Loader /> : totalTx}</span>
              </span>
            </div>
            <div className="lineWrapper">
              <Column {...config} />
            </div>
          </div>
          {false && (
            <div className="chartRates">
              <div className="periodButtons">
                <span className="text-[#222222]">Today</span>
                <span className="text-[#222222]">Last 7 days</span>
                <span className="text-[#222222]">All period</span>
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
          )}
        </div>
      </div>
    );
  }
);

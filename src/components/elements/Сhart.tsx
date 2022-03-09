import * as React from "react";
import { DailyData } from "../../pages/Dashboard";

import { Line, Column } from '@ant-design/plots';


export const Chart = ({dailyData}:{dailyData: DailyData[]}) => {

  let mockData = [
    ...dailyData,
    {
      txNumber:22,
      walletsNumber:3,
      date:"2022/3/9"
    },
    {
      txNumber:7,
      walletsNumber:3,
      date:"2022/3/10"
    },
    {
      txNumber:19,
      walletsNumber:3,
      date:"2022/3/10"
    },
    {
      txNumber:56,
      walletsNumber:3,
      date:"2022/3/11"
    },
    {
      txNumber:31,
      walletsNumber:3,
      date:"2022/3/12"
    }]

   /* for (let j = 0; j < 20; j++) {
      mockData.push({
        txNumber: j,
        walletsNumber:3,
        date:"2022/3/12"
      })
    }*/

  mockData =  mockData.map((item, i) => ({
      ...item,
      adate: new Date(item.date).getTime(),
      idx: i
    }))

console.log(mockData);
  const config = {
    data: mockData,
    xField: 'adate',
    yField: 'txNumber',
    xAxis: {
     label: {
      formatter: (text:string) => {
        console.log(text);
        return new Date(+text).getMonth()
      }
     }
    },
 
  };

  console.log(mockData[999]);

  return (
    <div className="lg:max-w-5xl mx-auto px-4 mt-8">
      <div className="chartWrapper">
        <div className="chartVisual">
          <h3 className="font-medium">Daily Transactions</h3>
           <div className="lineWrapper">
              <Column {...config}/>
           </div>
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

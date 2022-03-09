import * as React from "react";
import { DailyData } from "../../pages/Dashboard";

import { Line, Column } from '@ant-design/plots';


export const Chart = ({dailyData}:{dailyData: DailyData[]}) => {

  let mockData = [
    {
      txNumber:22,
      walletsNumber:3,
      date:"2022/3/3"
    },
    {
      txNumber:7,
      walletsNumber:3,
      date:"2022/3/4"
    },
    {
      txNumber:19,
      walletsNumber:3,
      date:"2022/3/5"
    },
    {
      txNumber:56,
      walletsNumber:3,
      date:"2022/3/6"
    },
    {
      txNumber:31,
      walletsNumber:3,
      date:"2022/3/7"
    }, 
    ...dailyData,
  
  ]



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
    tooltip: {
      showTitle: false,
      fields: ['txNumber', 'date']
    },
    xAxis: {
     label: {
      formatter: (text:string) => {
        //const dataObj = new Date(+text).toISOString()
        return null//dataObj.split('T')[0]
      }
     }
    },
 
  };


  return (
    <div className="lg:max-w-5xl mx-auto px-4 mt-8">
      <div className="chartWrapper">
        <div className="chartVisual">
          <h3 className="font-medium">Daily Transactions</h3>
          <div className="chartMetrics">
            <span>Today Tx: {mockData[mockData.length -1].txNumber}</span>
            <span>Total Tx: {mockData.reduce((acc, cur) => acc += cur.txNumber, 0)}</span>
          </div>
           <div className="lineWrapper">
              <Column {...config}/>
           </div>
        </div>
        {false && <div className="chartRates">
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
        </div>}
      </div>
    </div>
  );
};

import { DailyData } from "../../pages/Dashboard";
import { withContainer } from "../../context/ServcieProvder";
import { Loader } from "./Loader";
import "./Chart.css";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
export const Chart = withContainer(
  ({
    dailyData,
    charFetching,
    container: {
      fetching,
      appData: { totalTx, totalAsstest },
    },
  }: {
    dailyData: DailyData[];
    charFetching: Boolean;
    container: any;
  }) => {
    const mockData = dailyData.map((item, i) => ({
      ...item,
      adate: new Date(item.date).getTime(),
      idx: i,
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="tooltipDiv">
            <p className="dateTool">{payload[0].payload.date}</p>
            <span>
              {payload[0].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} TXN <br />
            </span>
            <span>
              {payload[1].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Assets <br />
            </span>

            <br />
          </div>
        );
      }

      return null;
    };

    return (
      <div className="lg:max-w-5xl mx-auto px-4 mt-3 md:mt-6">
        <div className="chartWrapper">
          <div className="chartVisual">
            <div className="chartMetrics">
              <span>
                Today Tx:{" "}
                <span>
                  {fetching ? (
                    <Loader />
                  ) : (
                    Number(mockData[mockData.length - 1]?.Tx) -
                    Number(mockData[mockData.length - 2]?.Tx)
                  )}
                </span>
              </span>
              <span>
                Total Tx: <span>{fetching ? <Loader /> : totalTx.toLocaleString()}</span>
              </span>
              <span>
                Total Assets: <span>{fetching ? <Loader /> : totalAsstest.toLocaleString()}</span>
              </span>
            </div>
            <div className="lineWrapper">
              {charFetching ? (
                <div className="chartLoaderWrap">
                  <span className="super-loader"></span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={251}>
                  <AreaChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5B8FF9" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#5B8FF9" stopOpacity={0.25} />
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="1%" stopColor="#10B67A" stopOpacity={0.1} />
                        <stop offset="99%" stopColor="" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <YAxis axisLine={false} type="number" domain={[0, "dataMax + 2000"]} />
                    {/* <XAxis dataKey={() => mockData.map(i => i.date)} axisLine={false} /> */}
                    <CartesianGrid strokeDasharray="1" vertical={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="Tx"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                    <Area
                      type="monotone"
                      dataKey="sftNumber"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorPv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
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

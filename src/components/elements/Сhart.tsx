import * as React from "react";
import { DailyData } from "../../pages/Dashboard";
import { withContainer } from "../../context/ServcieProvder";
import { Line, Column } from "@ant-design/plots";
import moment from "moment";
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
            appData: { totalTx },
        },
    }: {
        dailyData: DailyData[];
        charFetching: Boolean;
        container: any;
    }) => {
        let mockData = [
            // {
            //   txNumber: 22,
            //   walletsNumber: 3,
            //   date: "2022/3/3",
            // },
            // {
            //   txNumber: 7,
            //   walletsNumber: 3,
            //   date: "2022/3/4",
            // },
            // {
            //   txNumber: 19,
            //   walletsNumber: 3,
            //   date: "2022/3/5",
            // },
            // {
            //   txNumber: 56,
            //   walletsNumber: 3,
            //   date: "2022/3/6",
            // },
            // {
            //   txNumber: 31,
            //   walletsNumber: 3,
            //   date: "2022/3/7",
            // },
            ...dailyData,
        ];

        mockData = mockData.map((item, i) => ({
            ...item,
            adate: new Date(item.date).getTime(),
            idx: i,
        }));

        console.log({ mockData });

        const CustomTooltip = ({ active, payload, label }: any) => {
            if (active && payload && payload.length) {
                console.log(payload[0]);
                return (
                    <div className="tooltipDiv">
                        <p className="dateTool">{payload[0].payload.date}</p>
                        {payload[0].value} Tx
                    </div>
                );
            }

            return null;
        };

        return (
            <div className="lg:max-w-5xl mx-auto px-4 mt-3 md:mt-6">
                <div className="chartWrapper">
                    <div className="chartVisual">
                        <h3 className="font-medium text-[#222222]">
                            Daily Transactions
                        </h3>
                        <div className="chartMetrics">
                            <span>
                                Today Tx:{" "}
                                <span>
                                    {fetching ? (
                                        <Loader />
                                    ) : (
                                        mockData[mockData.length - 1]?.Tx
                                    )}
                                </span>
                            </span>
                            <span>
                                Total Tx:{" "}
                                <span>{fetching ? <Loader /> : totalTx}</span>
                            </span>
                        </div>
                        <div className="lineWrapper">
                            {charFetching ? (
                                <div className="chartLoaderWrap">
                                    <span className="super-loader"></span>
                                </div>
                            ) : (
                                <ResponsiveContainer width="95%" height={251}>
                                    <AreaChart
                                        data={mockData}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="colorUv"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#5B8FF9"
                                                    stopOpacity={0.25}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#5B8FF9"
                                                    stopOpacity={0.25}
                                                />
                                            </linearGradient>
                                        </defs>
                                        {/* <XAxis dataKey="day" tickMargin={4} label="mar"/> */}
                                        <YAxis
                                            axisLine={false}
                                            type="number"
                                            domain={[
                                                (dataMin: any) => 0,
                                                (dataMax: any) =>
                                                    Math.round(
                                                        dataMax / 100 + 1
                                                    ) *
                                                        100 +
                                                    500,
                                            ]}
                                        />
                                        <CartesianGrid
                                            strokeDasharray="1"
                                            vertical={false}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="Tx"
                                            stroke="#2E66F5"
                                            fillOpacity={1}
                                            fill="url(#colorUv)"
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
                                <span className="text-[#222222]">
                                    Last 7 days
                                </span>
                                <span className="text-[#222222]">
                                    All period
                                </span>
                            </div>
                            <ul className="chartInfoList">
                                <li>
                                    <span className="chartItemName font-medium">
                                        Volume
                                    </span>
                                    <span className="chartItemValue">
                                        $324.34 M
                                    </span>
                                </li>
                                <li>
                                    <span className="chartItemName font-medium">
                                        Fees
                                    </span>
                                    <span className="chartItemValue">
                                        $324.34 M
                                    </span>
                                </li>
                                <li>
                                    <span className="chartItemName font-medium">
                                        Users
                                    </span>
                                    <span className="chartItemValue">
                                        $324.34 M
                                    </span>
                                </li>
                                <li>
                                    <span className="chartItemName font-medium">
                                        Tx
                                    </span>
                                    <span className="chartItemValue">
                                        $324.34 M
                                    </span>
                                </li>
                                <li>
                                    <span className="chartItemName font-medium">
                                        Avg Tx time
                                    </span>
                                    <span className="chartItemValue">
                                        213.12s/2.12m
                                    </span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

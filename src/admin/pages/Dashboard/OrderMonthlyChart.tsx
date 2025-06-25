import React, {useEffect, useState} from 'react';
import {
    ComposedChart,
    Area,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Legend
} from 'recharts';
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from '../../../state/store';
import {fetchMonthlyOrderStats} from '../../../state/admin/StatSlice';
import HomeDashboard from "./HomeDashboard";

const yearOptions = [2025, 2026];

interface ChartData {
    month: string;
    orderCount: number;
    revenue: number;
}

const OrderMonthlyChart = () => {
    const dispatch = useAppDispatch();
    const {monthlyStats, loading, error} = useAppSelector(state => state.stat);
    const {jwt} = useAppSelector(state => state.auth);
    const [selectedYear, setSelectedYear] = useState(yearOptions[0]);

    useEffect(() => {
        if (jwt) {
            console.log(`Fetching monthly stats for year: ${selectedYear} with JWT: ${jwt}`);
            dispatch(fetchMonthlyOrderStats({year: selectedYear, jwt}));
        }
    }, [dispatch, selectedYear, jwt]);

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(e.target.value));
    };

    // Định dạng dữ liệu cho chart
    const chartData: ChartData[] = (monthlyStats || []).map(item => ({
        ...item,
        month: `Tháng ${item.month}`,
        orderCount: item.totalOrders,
        revenue: item.totalRevenue
    }));

    return (
        <motion.div
            className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200 mb-10"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.5, duration: 0.8}}
        >
            {/*<HomeDashboard/>*/}

            <motion.div
                className="flex items-center justify-between mb-8"
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 0.7, duration: 0.6}}
            >
                <motion.h2
                    className="text-2xl font-bold text-gray-800"
                    initial={{scale: 0.8}}
                    animate={{scale: 1}}
                    transition={{delay: 0.8, duration: 0.4}}
                >
                    Thống kê đơn hàng theo tháng
                </motion.h2>
                <motion.select
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-200"
                    style={{minWidth: 90}}
                    initial={{opacity: 0, x: 20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: 0.9, duration: 0.6}}
                >
                    {yearOptions.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </motion.select>
            </motion.div>
            <motion.div
                className="w-full h-96"
                initial={{scale: 0.95}}
                animate={{scale: 1}}
                transition={{delay: 1, duration: 0.7}}
            >
                <ResponsiveContainer width="100%" height="100%">
                    {loading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : chartData.length > 0 ? (
                        <ComposedChart data={chartData} syncId="orderStats">
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/>
                            <XAxis dataKey="month" stroke="#4B5563"/>
                            <YAxis
                                stroke="#4B5563"
                                width={100}
                                tickFormatter={(value) => value.toLocaleString('vi-VN')}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgba(249, 250, 251, 0.9)",
                                    borderColor: "#D1D5DB"
                                }}
                                itemStyle={{
                                    color: "#1F2937"
                                }}
                                labelFormatter={(month: string) => `Tháng: ${month}`}
                                formatter={(value: number, name: string, props: any) => {
                                    if (props.dataKey === 'orderCount') {
                                        return [`Số đơn hàng: ${value.toLocaleString('vi-VN')}`];
                                    }
                                    if (props.dataKey === 'revenue') {
                                        return [`Doanh thu: ${value.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}`];
                                    }
                                    return null;
                                }}
                            />
                            <Legend
                                formatter={(value: string, entry: any) => {
                                    if (entry.dataKey === "orderCount") {
                                        return "Số đơn hàng";
                                    }
                                    if (entry.dataKey === "revenue") {
                                        return "Doanh thu";
                                    }
                                    return '';
                                }}
                            />
                            <defs>
                                <linearGradient id="colorOrder" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="orderCount"
                                stroke="#8884d8"
                                fill="url(#colorOrder)"
                                fillOpacity={1}
                                name="Số đơn hàng trong tháng"
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#82ca9d"
                                fill="#82ca9d22"
                                fillOpacity={0.5}
                                name="Doanh thu trong tháng"
                            />
                        </ComposedChart>
                    ) : (
                        <motion.p
                            className="text-center text-gray-500"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 1.2, duration: 0.5}}
                        >
                            Không có dữ liệu
                        </motion.p>
                    )}
                </ResponsiveContainer>
            </motion.div>
        </motion.div>
    );
};

export default OrderMonthlyChart; 
import React, { useState, useEffect, useCallback } from "react";
import {
    IoWalletOutline, IoCartOutline, IoPeopleOutline,
    IoCubeOutline, IoDownloadOutline, IoTrendingUpOutline, IoCheckmarkCircleOutline
} from "react-icons/io5";
import MainChartCard from "../../components/admin/MainChartCard";
import styles from "./styles/AnalyticsPage.module.css";

const AnalyticsPage = () => {
    const [range, setRange] = useState("7D");
    const [activeMetric, setActiveMetric] = useState("revenue");
    const [customDates, setCustomDates] = useState({ start: "", end: "" });
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(false);

    const metricConfig = {
        revenue: { label: "Revenue (PKR)", color: "#1b4d3e", icon: <IoWalletOutline /> },
        orders: { label: "Total Orders", color: "#3b82f6", icon: <IoCartOutline /> },
        customers: { label: "New Customers", color: "#8b5cf6", icon: <IoPeopleOutline /> }
    };

    // Centralized Data Generator
    const generateAnalyticsData = useCallback((startDate, endDate) => {
        setLoading(true);
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

        const newData = [];
        for (let i = 0; i <= diffDays; i++) {
            const d = new Date(start);
            d.setDate(d.getDate() + i);

            newData.push({
                date: d.toISOString(),
                revenue: Math.floor(Math.random() * 8000) + 2000,
                orders: Math.floor(Math.random() * 25) + 5,
                customers: Math.floor(Math.random() * 12) + 1,
            });
        }

        setTimeout(() => {
            setRawData(newData);
            setLoading(false);
        }, 500);
    }, []);

    // Effect for Predefined Ranges
    useEffect(() => {
        if (range !== "Custom") {
            const end = new Date();
            const start = new Date();
            const days = range === "7D" ? 7 : (range === "30D" ? 30 : 365);
            start.setDate(end.getDate() - days);
            generateAnalyticsData(start, end);
        }
    }, [range, generateAnalyticsData]);

    // Handler for Custom Apply Button
    const handleApplyCustomRange = () => {
        if (customDates.start && customDates.end) {
            generateAnalyticsData(customDates.start, customDates.end);
        } else {
            alert("Please select both start and end dates");
        }
    };

    return (
        <div className={`${styles.analyticsContainer} ${styles.fadeIn}`}>
            <div className={styles.analyticsHeader}>
                <div className={styles.titleSection}>
                    <h1><IoTrendingUpOutline /> Business Intelligence</h1>
                    <p>Analyzing key performance indicators for <strong>Khan Traders</strong>.</p>
                </div>

                <div className={styles.actionSection}>
                    {range === "Custom" && (
                        <div className={`${styles.customDateWrapper} ${styles.fadeIn}`}>
                            <div className={styles.customDateInputs}>
                                <input 
                                    type="date" 
                                    value={customDates.start} 
                                    onChange={(e) => setCustomDates({ ...customDates, start: e.target.value })} 
                                />
                                <span className={styles.toSep}>to</span>
                                <input 
                                    type="date" 
                                    value={customDates.end} 
                                    onChange={(e) => setCustomDates({ ...customDates, end: e.target.value })} 
                                />
                            </div>
                            <button className={styles.applyBtn} onClick={handleApplyCustomRange}>
                                <IoCheckmarkCircleOutline /> Apply
                            </button>
                        </div>
                    )}

                    <div className={styles.rangePicker}>
                        {["7D", "30D", "1Y", "Custom"].map((r) => (
                            <button
                                key={r}
                                className={range === r ? styles.active : ""}
                                onClick={() => setRange(r)}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    <button className={styles.exportBtn}>
                        <IoDownloadOutline /> <span>Export Report</span>
                    </button>
                </div>
            </div>

            <div className={styles.metricSelectorGrid}>
                {Object.keys(metricConfig).map((key) => (
                    <div
                        key={key}
                        className={`${styles.metricTab} ${activeMetric === key ? styles.active : ""}`}
                        onClick={() => setActiveMetric(key)}
                    >
                        <div className={styles.tabIconWrapper} style={{ backgroundColor: `${metricConfig[key].color}15`, color: metricConfig[key].color }}>
                            {metricConfig[key].icon}
                        </div>
                        <div className={styles.tabInfo}>
                            <span>{metricConfig[key].label}</span>
                            <h3>
                                {key === "revenue" ? "Rs. 145,280" : (key === "orders" ? "342" : "89")}
                            </h3>
                        </div>
                        {activeMetric === key && <div className={styles.activeIndicator} style={{ backgroundColor: metricConfig[key].color }}></div>}
                    </div>
                ))}

                <div className={`${styles.metricTab} ${styles.staticTab}`}>
                    <div className={styles.tabIconWrapper} style={{ backgroundColor: "#f59e0b15", color: "#f59e0b" }}>
                        <IoCubeOutline />
                    </div>
                    <div className={styles.tabInfo}>
                        <span>Inventory Sold</span>
                        <h3>1,204</h3>
                    </div>
                </div>
            </div>

            <MainChartCard
                rawData={rawData}
                loading={loading}
                activeMetric={activeMetric}
                metricConfig={metricConfig}
                range={range}
            />
        </div>
    );
};

export default AnalyticsPage;
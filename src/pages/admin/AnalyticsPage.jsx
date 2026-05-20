import React, { useState, useEffect, useCallback } from "react";
import {
    IoWalletOutline, IoCartOutline, IoPeopleOutline,
    IoCubeOutline, IoDownloadOutline, IoTrendingUpOutline, IoCheckmarkCircleOutline
} from "react-icons/io5";
import MainChartCard from "../../components/admin/MainChartCard";
import styles from "./styles/AnalyticsPage.module.css";
import { buildApiUrl, getAuthHeaders } from "../../utils/apiConfig";

const AnalyticsPage = () => {
    const [range, setRange] = useState("7D");
    const [activeMetric, setActiveMetric] = useState("revenue");
    const [customDates, setCustomDates] = useState({ start: "", end: "" });
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [insights, setInsights] = useState({
        statusBreakdown: [],
        categorySales: [],
        recentOrders: []
    });
    const [metrics, setMetrics] = useState({
        revenue: { current: 0, previous: 0, percentage: 0 },
        orders: { current: 0, previous: 0, percentage: 0 },
        customers: { current: 0, previous: 0, percentage: 0 },
        products: 0
    });

    const metricConfig = {
        revenue: { label: "Revenue (PKR)", color: "#1b4d3e", icon: <IoWalletOutline /> },
        orders: { label: "Total Orders", color: "#2f6f3e", icon: <IoCartOutline /> },
        customers: { label: "New Customers", color: "#556b2f", icon: <IoPeopleOutline /> }
    };

    // Fetch Analytics Data
    const fetchAnalyticsData = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const params = new URLSearchParams({ range });
            if (range === "Custom" && customDates.start && customDates.end) {
                params.set("start", customDates.start);
                params.set("end", customDates.end);
            }

            const requestOptions = {
                headers: getAuthHeaders()
            };

            // Fetch dashboard summary
            const summaryResponse = await fetch(buildApiUrl(`/api/dashboard/summary?${params.toString()}`), requestOptions);
            const summaryData = await summaryResponse.json();

            if (!summaryResponse.ok || !summaryData.success) {
                throw new Error(summaryData.message || "Unable to load analytics summary");
            }

            if (summaryData.success) {
                const data = summaryData.data;

                setMetrics({
                    revenue: { current: data.totalRevenue, previous: data.previousDayRevenue, percentage: data.percentageChanges?.revenue || 0 },
                    orders: { current: data.totalOrders, previous: data.previousDayOrders, percentage: data.percentageChanges?.orders || 0 },
                    customers: { current: data.totalCustomers, previous: data.previousDayCustomers, percentage: data.percentageChanges?.customers || 0 },
                    products: data.totalProducts
                });

                setInsights({
                    statusBreakdown: data.statusBreakdown || [],
                    categorySales: data.categorySales || [],
                    recentOrders: data.recentOrders || []
                });
            }

            // Fetch trend data
            const trendResponse = await fetch(buildApiUrl(`/api/dashboard/revenue-trend?${params.toString()}`), requestOptions);
            const trendData = await trendResponse.json();

            if (!trendResponse.ok || !trendData.success) {
                throw new Error(trendData.message || "Unable to load analytics trend");
            }

            if (trendData.success) {
                setRawData(trendData.data.map(item => ({
                    date: new Date(item.date).toISOString(),
                    revenue: item.revenue,
                    orders: item.orders,
                    customers: item.customers
                })));
            }
        } catch (error) {
            console.error('Error fetching analytics:', error);
            setError(error.message || "Analytics data could not be loaded.");
        } finally {
            setLoading(false);
        }
    }, [range, customDates.start, customDates.end]);

    // Load data on mount and when range changes
    useEffect(() => {
        if (range !== "Custom") {
            fetchAnalyticsData();
        }
    }, [range, fetchAnalyticsData]);

    // Handler for Custom Apply Button
    const handleApplyCustomRange = () => {
        if (customDates.start && customDates.end) {
            fetchAnalyticsData();
        } else {
            alert("Please select both start and end dates");
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
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
                                onClick={() => {
                                    setRange(r);
                                    if (r !== "Custom") setError("");
                                }}
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

            {error && <div className={styles.errorBanner}>{error}</div>}

            <div className={styles.metricSelectorGrid}>
                {Object.keys(metricConfig).map((key) => {
                    const m = metrics[key];
                    const percentage = m.percentage || 0;
                    const isPositive = percentage >= 0;
                    
                    return (
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
                                    {key === "revenue" ? formatCurrency(m.current) : m.current}
                                </h3>
                                <div className={`${styles.percentageChange} ${isPositive ? styles.positive : styles.negative}`}>
                                    {isPositive ? "+" : "-"}{Math.abs(percentage).toFixed(2)}% vs previous range
                                </div>
                            </div>
                            {activeMetric === key && <div className={styles.activeIndicator} style={{ backgroundColor: metricConfig[key].color }}></div>}
                        </div>
                    );
                })}

                <div className={`${styles.metricTab} ${styles.staticTab}`}>
                    <div className={styles.tabIconWrapper} style={{ backgroundColor: "#f59e0b15", color: "#f59e0b" }}>
                        <IoCubeOutline />
                    </div>
                    <div className={styles.tabInfo}>
                        <span>Total Products</span>
                        <h3>{metrics.products}</h3>
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

            <div className={styles.insightGrid}>
                <section className={styles.insightCard}>
                    <h2>Order Status</h2>
                    {loading ? (
                        <p className={styles.mutedText}>Loading status data...</p>
                    ) : insights.statusBreakdown.length ? (
                        <div className={styles.statusList}>
                            {insights.statusBreakdown.map((item) => (
                                <div key={item.status} className={styles.statusRow}>
                                    <span>{item.status}</span>
                                    <strong>{item.count}</strong>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.mutedText}>No orders found for this range.</p>
                    )}
                </section>

                <section className={styles.insightCard}>
                    <h2>Top Categories</h2>
                    {loading ? (
                        <p className={styles.mutedText}>Loading category data...</p>
                    ) : insights.categorySales.length ? (
                        <div className={styles.statusList}>
                            {insights.categorySales.map((item) => (
                                <div key={item.category} className={styles.statusRow}>
                                    <span>{item.category}</span>
                                    <strong>{formatCurrency(item.revenue)}</strong>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.mutedText}>No category sales yet.</p>
                    )}
                </section>

                <section className={styles.insightCard}>
                    <h2>Recent Activity</h2>
                    {loading ? (
                        <p className={styles.mutedText}>Loading recent orders...</p>
                    ) : insights.recentOrders.length ? (
                        <div className={styles.recentList}>
                            {insights.recentOrders.map((order) => (
                                <div key={order._id} className={styles.recentRow}>
                                    <span>{order.user?.name || "Guest Customer"}</span>
                                    <strong>{formatCurrency(order.totalAmount || 0)}</strong>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.mutedText}>No recent orders yet.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AnalyticsPage;

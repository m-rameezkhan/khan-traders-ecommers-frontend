import React, { useState, useMemo } from "react";
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { IoStatsChartOutline, IoBarChartOutline } from "react-icons/io5";
import "./styles/MainChartCard.css";

const CustomTooltip = ({ active, payload, label, currentMetric }) => {
  if (active && payload && payload.length) {
    const fullDate = new Date(label).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });

    return (
      <div className="custom-chart-tooltip">
        <span className="tooltip-date">{fullDate}</span>
        <div className="tooltip-value-row">
          <span className="pulse-dot" style={{ backgroundColor: currentMetric.color }}></span>
          <span className="tooltip-label">{currentMetric.label}:</span>
          <span className="tooltip-amount" style={{ color: currentMetric.color }}>
            {currentMetric.label.includes("Revenue") 
              ? `Rs. ${payload[0].value.toLocaleString()}` 
              : payload[0].value.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const MainChartCard = ({ rawData, loading, activeMetric, metricConfig, range }) => {
  const [viewType, setViewType] = useState("Daily");
  const [activeChart, setActiveChart] = useState("Area");
  const currentMetric = metricConfig[activeMetric];

  const chartData = useMemo(() => {
    let data = viewType === "Daily" ? rawData : [];
    if (viewType === "Cumulative") {
      let runningTotal = 0;
      data = rawData.map(d => {
        runningTotal += d[activeMetric];
        return { ...d, [activeMetric]: runningTotal };
      });
    }
    return data;
  }, [rawData, viewType, activeMetric]);

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="main-chart-card premium-shadow">
      <div className="chart-header">
        <div className="left-controls">
          <div className="view-toggle-group">
            <button className={viewType === "Daily" ? "active" : ""} onClick={() => setViewType("Daily")}>Daily</button>
            <button className={viewType === "Cumulative" ? "active" : ""} onClick={() => setViewType("Cumulative")}>Total</button>
          </div>
          <div className="divider-line"></div>
          <div className="chart-type-group">
            <button className={activeChart === "Area" ? "active" : ""} onClick={() => setActiveChart("Area")}><IoStatsChartOutline /></button>
            <button className={activeChart === "Bar" ? "active" : ""} onClick={() => setActiveChart("Bar")}><IoBarChartOutline /></button>
          </div>
        </div>

        <div className="chart-legend">
          <div className="legend-item">
            <span className="pulse-dot" style={{ backgroundColor: currentMetric.color }}></span>
            <span className="legend-label">{currentMetric.label}</span>
          </div>
        </div>
      </div>

      <div className="detailed-chart-wrapper">
        {loading ? (
          <div className="chart-empty-state">Loading analytics...</div>
        ) : chartData.length === 0 ? (
          <div className="chart-empty-state">No analytics data found for this range.</div>
        ) : (
        <ResponsiveContainer width="100%" height={400}>
          {activeChart === "Area" ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentMetric.color} stopOpacity={0.15}/>
                  <stop offset="95%" stopColor={currentMetric.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                dy={10} /* Reduced dy so it doesn't cut */
                tickFormatter={formatXAxis}
              />
              <YAxis 
                axisLine={false} tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}k` : val}
              />
              <Tooltip 
                content={<CustomTooltip currentMetric={currentMetric} />} 
                wrapperStyle={{ outline: 'none' }} /* Removes focus outline */
              />
              <Area 
                type="monotone" dataKey={activeMetric} stroke={currentMetric.color} 
                strokeWidth={3} fill="url(#chartGradient)" 
                activeDot={{ r: 5, strokeWidth: 0, fill: currentMetric.color }}
              />
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" axisLine={false} tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                dy={10}
                tickFormatter={formatXAxis}
              />
              <YAxis 
                axisLine={false} tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}k` : val}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }} 
                content={<CustomTooltip currentMetric={currentMetric} />} 
                wrapperStyle={{ outline: 'none' }}
              />
              <Bar 
                dataKey={activeMetric} fill={currentMetric.color} 
                radius={[6, 6, 0, 0]} 
                barSize={range === "7D" ? 30 : 10}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MainChartCard;

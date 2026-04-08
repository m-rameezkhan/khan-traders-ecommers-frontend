import React from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";
import { IoArrowForwardOutline, IoStatsChartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../styles/AnalyticsPanel.css";

const AnalyticsPanel = ({ data }) => {
  const navigate = useNavigate();

  // Mock data for Dashboard (Last 7 Days)
  const chartData = data || [
    { name: "Mon", revenue: 4200, orders: 12 },
    { name: "Tue", revenue: 3800, orders: 10 },
    { name: "Wed", revenue: 5100, orders: 15 },
    { name: "Thu", revenue: 4900, orders: 14 },
    { name: "Fri", revenue: 6200, orders: 20 },
    { name: "Sat", revenue: 7500, orders: 25 },
    { name: "Sun", revenue: 5800, orders: 18 },
  ];

  return (
    <div className="analytics-card dashboard-version">
      <div className="card-header">
        <div className="header-left">
          <h2><IoStatsChartOutline /> Weekly Growth</h2>
          <p>Last 7 days performance</p>
        </div>
        <button 
          className="view-report-btn" 
          onClick={() => navigate("/admin/analytics")}
        >
          Full Report <IoArrowForwardOutline />
        </button>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1b4d3e" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#1b4d3e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 11}}
            />
            <YAxis hide /> {/* Hide Y axis on dashboard for cleaner look */}
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#1b4d3e" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
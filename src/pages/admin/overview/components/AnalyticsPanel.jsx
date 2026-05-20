import React, { useEffect, useState } from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";
import { IoArrowForwardOutline, IoStatsChartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AnalyticsPanel.css";
import { buildApiUrl, getAuthHeaders } from "../../../../utils/apiConfig";

const AnalyticsPanel = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const res = await axios.get(buildApiUrl("/api/dashboard/revenue-trend?range=7D"), {
          headers: getAuthHeaders()
        });
        const data = res.data?.data || [];
        setChartData(data.map((item) => ({
          name: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }),
          revenue: item.revenue,
          orders: item.orders
        })));
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load weekly growth");
      } finally {
        setLoading(false);
      }
    };

    fetchTrend();
  }, []);

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
        {loading ? (
          <div className="analytics-mini-state">Loading weekly growth...</div>
        ) : error ? (
          <div className="analytics-mini-state error">{error}</div>
        ) : chartData.length === 0 ? (
          <div className="analytics-mini-state">No sales data yet.</div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default AnalyticsPanel;

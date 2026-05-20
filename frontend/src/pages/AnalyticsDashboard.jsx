import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { API, AppContext } from "../App";
import {
  BarChart3, TrendingUp, Users, FileText, Eye, Download,
  RefreshCw, Loader2, Calendar, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export default function AnalyticsDashboard() {
  const { darkMode } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [articles, setArticles] = useState([]);
  const [downloading, setDownloading] = useState(false);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const [overviewRes, articlesRes] = await Promise.all([
        axios.get(`${API}/analytics/overview`),
        axios.get(`${API}/analytics/articles?limit=20`)
      ]);
      setOverview(overviewRes.data);
      setArticles(articlesRes.data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const downloadReport = async () => {
    try {
      setDownloading(true);
      const response = await axios.get(`${API}/analytics/report/csv`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `analytics_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toString() || '0';
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-[#080808]" : "bg-[#111]"}`}>
        <Loader2 size={40} className="animate-spin text-[#7c3aed]" />
      </div>
    );
  }

  const summary = overview?.summary || {};

  return (
    <div data-testid="analytics-page" className={`min-h-screen ${darkMode ? "bg-[#080808]" : "bg-[#111]"}`}>
      {/* Header */}
      <div className={`border-b py-4 px-4 sticky top-0 z-20 ${darkMode ? "bg-[#0d0d0d] border-[#1f1f1f]" : "bg-[#0d0d0d] border-[#1f1f1f]"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin")}
              className={darkMode ? "text-[#a3a3a3]" : ""}
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <BarChart3 size={24} className="text-[#7c3aed]" />
              <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-[#f0f0f0]"}`}>
                Analytics Dashboard
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchAnalytics}
              className={darkMode ? "border-[#262626]" : ""}
            >
              <RefreshCw size={14} className="mr-1" />
              Refresh
            </Button>
            <Button
              size="sm"
              onClick={downloadReport}
              disabled={downloading}
              className="bg-green-600 hover:bg-green-700"
            >
              {downloading ? (
                <Loader2 size={14} className="animate-spin mr-1" />
              ) : (
                <Download size={14} className="mr-1" />
              )}
              Download CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-xl border ${darkMode ? "bg-[#0d0d0d] border-[#1f1f1f]" : "bg-[#0d0d0d] border-[#1f1f1f]"}`}>
            <div className="flex items-center gap-2 mb-2">
              <Eye size={18} className="text-[#7c3aed]" />
              <span className={`text-xs ${darkMode ? "text-[#555]" : "text-[#737373]"}`}>
                Views Today
              </span>
            </div>
            <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-[#f0f0f0]"}`}>
              {formatNumber(summary.views_today)}
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${darkMode ? "bg-[#0d0d0d] border-[#1f1f1f]" : "bg-[#0d0d0d] border-[#1f1f1f]"}`}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={18} className="text-green-500" />
              <span className={`text-xs ${darkMode ? "text-[#555]" : "text-[#737373]"}`}>
                This Week
              </span>
            </div>
            <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-[#f0f0f0]"}`}>
              {formatNumber(summary.views_week)}
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${darkMode ? "bg-[#0d0d0d] border-[#1f1f1f]" : "bg-[#0d0d0d] border-[#1f1f1f]"}`}>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} className="text-purple-500" />
              <span className={`text-xs ${darkMode ? "text-[#555]" : "text-[#737373]"}`}>
                This Month
              </span>
            </div>
            <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-[#f0f0f0]"}`}>
              {formatNumber(summary.views_month)}
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${darkMode ? "bg-[#0d0d0d] border-[#1f1f1f]" : "bg-[#0d0d0d] border-[#1f1f1f]"}`}>
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} className="text-[#7c3aed]" />
              <span className={`text-xs ${darkMode ? "text-[#555]" : "text-[#737373]"}`}>
                Total Users
              </span>
            </div>
            <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-[#f0f0f0]"}`}>
              {formatNumber(summary.total_users)}
            </p>
          </div>
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded-xl border ${darkMode ? "bg-[#0d0d0d] border-[#1f1f1f]" : "bg-[#0d0d0d] border-[#1f1f1f]"}`}>
            <div className="flex items-center gap-2 mb-1">
              <FileText size={16} className="text-[#7c3aed]" />
              <span className={`text-xs ${darkMode ? "text-[#555]" : "text-[#737373]"}`}>
                Total Articles
              </span>
            </div>
            <p className={`text-xl font-bold ${darkMode ? "text-white" : "text-[#f0f0f0]"}`}>
              {summary.total_articles}
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${darkMode ? "bg-[#0d0d0d] border-[#1f1f1f]" : "bg-[#0d0d0d] border-[#1f1f1f]"}`}>
            <div className="flex items-center gap-2 mb-1">
              <Users size={16} className="text-green-500" />
              <span className={`text-xs ${darkMode ? "text-[#555]" : "text-[#737373]"}`}>
                Reporters
              </span>
            </div>
            <p className={`text-xl font-bold ${darkMode ? "text-white" : "text-[#f0f0f0]"}`}>
              {summary.approved_reporters}/{summary.total_reporters}
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${darkMode ? "bg-[#0d0d0d] border-[#1f1f1f]" : "bg-[#0d0d0d] border-[#1f1f1f]"}`}>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 size={16} className="text-purple-500" />
              <span className={`text-xs ${darkMode ? "text-[#555]" : "text-[#737373]"}`}>
                Avg/Day
              </span>
            </div>
            <p className={`text-xl font-bold ${darkMode ? "text-white" : "text-[#f0f0f0]"}`}>
              {Math.round((summary.views_week || 0) / 7)}
            </p>
          </div>
        </div>

        {/* Daily Trend Chart (Simple bar representation) */}
        {overview?.daily_trend?.length > 0 && (
          <div className={`p-4 rounded-xl border mb-6 ${darkMode ? "bg-[#0d0d0d] border-[#1f1f1f]" : "bg-[#0d0d0d] border-[#1f1f1f]"}`}>
            <h3 className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-[#f0f0f0]"}`}>
              Views Trend (Last 7 Days)
            </h3>
            <div className="flex items-end gap-2 h-32">
              {overview.daily_trend.map((day, index) => {
                const maxCount = Math.max(...overview.daily_trend.map(d => d.count));
                const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <span className={`text-xs ${darkMode ? "text-[#555]" : "text-[#737373]"}`}>
                      {day.count}
                    </span>
                    <div
                      className="w-full bg-[#7c3aed] rounded-t transition-all"
                      style={{ height: `${Math.max(height, 5)}%` }}
                    />
                    <span className={`text-[10px] ${darkMode ? "text-[#737373]" : "text-[#555]"}`}>
                      {day._id.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Views by Category */}
        {overview?.views_by_category?.length > 0 && (
          <div className={`p-4 rounded-xl border mb-6 ${darkMode ? "bg-[#0d0d0d] border-[#1f1f1f]" : "bg-[#0d0d0d] border-[#1f1f1f]"}`}>
            <h3 className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-[#f0f0f0]"}`}>
              Views by Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {overview.views_by_category.map((cat, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`text-sm py-1 px-3 ${darkMode ? "border-[#262626] text-[#a3a3a3]" : ""}`}
                >
                  {cat._id}: <span className="font-bold ml-1">{cat.views}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Top Articles Table */}
        <div className={`rounded-xl border overflow-hidden ${darkMode ? "bg-[#0d0d0d] border-[#1f1f1f]" : "bg-[#0d0d0d] border-[#1f1f1f]"}`}>
          <div className="p-4 border-b border-[#1f1f1f] dark:border-[#1f1f1f]">
            <h3 className={`font-semibold ${darkMode ? "text-white" : "text-[#f0f0f0]"}`}>
              Top Performing Articles
            </h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className={darkMode ? "bg-[#1a1a1a]/50" : "bg-[#111]"}>
                <TableHead className="w-8">#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-[#737373]">
                    No data yet
                  </TableCell>
                </TableRow>
              ) : (
                articles.slice(0, 10).map((article, index) => (
                  <TableRow key={article.id}>
                    <TableCell className={`font-medium ${darkMode ? "text-[#555]" : "text-[#737373]"}`}>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <p className={`font-medium line-clamp-1 ${darkMode ? "text-white" : "text-[#f0f0f0]"}`}>
                        {article.title}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={darkMode ? "border-[#262626]" : ""}>
                        {article.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`font-bold ${article.view_count > 0 ? "text-green-600" : darkMode ? "text-[#737373]" : "text-[#555]"}`}>
                        {formatNumber(article.view_count)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export { AnalyticsDashboard };

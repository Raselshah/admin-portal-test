import { Card, Radio } from "antd";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import dayjs from "dayjs";
import { RootState } from "../../app/redux/store";

type ViewType = "daily" | "monthly";

const ArticleChart: React.FC = () => {
  const articles = useSelector((state: RootState) => state.articles.articles);
  const filters = useSelector((state: RootState) => state.articles.filters);

  const [view, setView] = useState<ViewType>("daily");

  const filteredArticles = useMemo(() => {
    let filtered = [...articles];
    if (filters.author) {
      filtered = filtered.filter((a) => a.author === filters.author);
    }
   if (filters.dateRange) {
  const [startDate, endDate] = filters.dateRange;  

  filtered = filtered.filter(a => {
    const d = dayjs(a.publishedDate);
    return d.isAfter(dayjs(startDate)) && d.isBefore(dayjs(endDate));
  });
}

    if (filters.searchTerm) {
      filtered = filtered.filter((a) =>
        a.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [articles, filters]);

  const data = useMemo(() => {
    const map = new Map<string, number>();

    filteredArticles.forEach((article) => {
      const date = dayjs(article.publishedDate);
      let key = "";
      if (view === "daily") {
        key = date.format("YYYY-MM-DD");
      } else {
        key = date.format("YYYY-MM");
      }
      map.set(key, (map.get(key) || 0) + article.views);
    });

    const sortedKeys = Array.from(map.keys()).sort();

    return sortedKeys.map((key) => ({
      date: key,
      views: map.get(key),
    }));
  }, [filteredArticles, view]);

  return (
    <Card
      title="Article Views Over Time"
      extra={
        <Radio.Group
          value={view}
          onChange={(e) => setView(e.target.value)}
          size="small"
        >
          <Radio.Button value="daily">Daily</Radio.Button>
          <Radio.Button value="monthly">Monthly</Radio.Button>
        </Radio.Group>
      }
      style={{ marginBottom: 24 }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#1890ff"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ArticleChart;

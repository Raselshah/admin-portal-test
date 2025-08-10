import { Button, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";


import dayjs from "dayjs";
import { setFilters } from "../../app/redux/features/articles/articlesSlice";
import { RootState } from "../../app/redux/store";
import { IArticle } from "../../types/IArticle.type";
import EditArticleModal from "./EditArticleModal";

const ArticleTable = () => {
  const { articles, filters } = useSelector((state: RootState) => state.articles);
  const { role, username } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [editingArticle, setEditingArticle] = useState<IArticle | null>(null);

  let filtered = [...articles];
  if (filters.author) {
    filtered = filtered.filter(a => a.author === filters.author);
  }
  // if (filters.dateRange) {
  //   filtered = filtered.filter(a => {
  //     const d = dayjs(a.publishedDate);
  //     return d.isAfter(dayjs(filters.dateRange[0])) && d.isBefore(dayjs(filters.dateRange[1]));
  //   });
  // }
  if (filters.dateRange && filters.dateRange.length === 2) {
  const [startDate, endDate] = filters.dateRange;
  filtered = filtered.filter(a => {
    const d = dayjs(a.publishedDate);
    return d.isAfter(dayjs(startDate)) && d.isBefore(dayjs(endDate));
  });
}
  if (filters.searchTerm) {
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
    );
  }

  // Sorting
  if (filters.sortBy && filters.sortOrder) {
    filtered.sort((a, b) => {
      const field = filters.sortBy!;
      if (filters.sortOrder === "ascend") return a[field] - b[field];
      else return b[field] - a[field];
    });
  }
const columns: ColumnsType<IArticle> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    sorter: false,
    ellipsis: true,
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    filters: Array.from(new Set(articles.map(a => a.author))).map(a => ({
      text: a,
      value: a,
    })),
    filteredValue: filters.author ? [filters.author] : null,
    onFilter: (value, record) => record.author === value,
  },
  {
    title: "Published Date",
    dataIndex: "publishedDate",
    key: "publishedDate",
    render: date => dayjs(date).format("YYYY-MM-DD"),
    sorter: (a, b) =>
      dayjs(a.publishedDate).unix() - dayjs(b.publishedDate).unix(),
  },
  {
    title: "Views",
    dataIndex: "views",
    key: "views",
    sorter: true,
    sortOrder: filters.sortBy === "views" ? filters.sortOrder : null,
  },
  {
    title: "Likes",
    dataIndex: "likes",
    key: "likes",
    sorter: true,
    sortOrder: filters.sortBy === "likes" ? filters.sortOrder : null,
  },
  {
    title: "Comments",
    dataIndex: "comments",
    key: "comments",
    sorter: true,
    sortOrder: filters.sortBy === "comments" ? filters.sortOrder : null,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: status => (
      <Tag color={status === "Published" ? "green" : "orange"}>{status}</Tag>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => {
      if (role === "admin" || (role === "editor" && record.author === username)) {
        return (
          <Button type="link" onClick={() => setEditingArticle(record)}>
            Edit
          </Button>
        );
      }
      return null;
    },
    fixed: "right",
    width: 80,
  },
];


  const handleTable = (
    sorter: any
  ) => {
    // Sorting
    if (sorter.order) {
      dispatch(
        setFilters({
          sortBy: sorter.field,
          sortOrder: sorter.order,
        })
      );
    } else {
      dispatch(
        setFilters({
          sortBy: null,
          sortOrder: null,
        })
      );
    }
  };

  return (
    <>
       <Table<IArticle>
      columns={columns}
      dataSource={filtered}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      onChange={handleTable}
      scroll={{ x: 'max-content' }} 
    />
      {editingArticle && (
        <EditArticleModal
          article={editingArticle}
          onClose={() => setEditingArticle(null)}
        />
      )}
    </>
  );
};

export default ArticleTable;

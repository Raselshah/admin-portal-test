import { Col, DatePicker, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setFilters } from "../../app/redux/features/articles/articlesSlice";
import { RootState } from "../../app/redux/store";
import useDebounce from "../../hooks/useDebounce";

const { RangePicker } = DatePicker;

const ArticleFilters: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.articles.filters);
  const articles = useSelector((state: RootState) => state.articles.articles);

  const [author, setAuthor] = useState<string | null>(filters.author);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    filters.dateRange ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])] : null
  );
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const authors = Array.from(new Set(articles.map(a => a.author)));

  useEffect(() => {
    dispatch(
      setFilters({
        author,
        dateRange:
          dateRange && dateRange.length === 2
            ? [dateRange[0].toISOString(), dateRange[1].toISOString()]
            : null,
        searchTerm: debouncedSearchTerm,
      })
    );
  }, [author, dateRange, debouncedSearchTerm, dispatch]);

  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col xs={24} sm={8}>
        <Select
          allowClear
          placeholder="Filter by Author"
          value={author || undefined}
          onChange={value => setAuthor(value || null)}
          style={{ width: "100%" }}
          options={authors.map(a => ({ label: a, value: a }))}
        />
      </Col>
      <Col xs={24} sm={10}>
        <RangePicker
          style={{ width: "100%" }}
          value={dateRange}
          onChange={dates => setDateRange(dates as any)}
          allowClear
        />
      </Col>
      <Col xs={24} sm={6}>
        <Input
          placeholder="Search by Title"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          allowClear
        />
      </Col>
    </Row>
  );
};

export default ArticleFilters;

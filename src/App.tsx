import { Button, Layout, Menu, Typography } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { logout } from "./app/redux/features/auth/authSlice";
import { RootState } from "./app/redux/store";
import ArticleChart from "./Components/articles/ArticleChart";
import ArticleFilters from "./Components/articles/ArticleFilters";
import ArticleTable from "./Components/articles/ArticleTable";
import LoginPage from "./Components/auth/LoginPage";


const { Header, Content, Footer, Sider } = Layout;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            height: 32,
            margin: 16,
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Admin Dashboard
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["articles"]}
          items={[
            {
              key: "articles",
              label: "Articles",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 24,
          }}
        >
          <Typography.Text style={{ marginLeft: 24 }}>
            Welcome, {auth.username} ({auth.role})
          </Typography.Text>
          <Button onClick={onLogout} danger>
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <ArticleFilters />
          <ArticleChart />
          <ArticleTable />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Admin Dashboard ©2025 Created by Rasel
        </Footer>
      </Layout>
    </Layout>
  );
};

const AppRoutes: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route
        path="/login"
        element={auth.token ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/"
        element={auth.token ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;

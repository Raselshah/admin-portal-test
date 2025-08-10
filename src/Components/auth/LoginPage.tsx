import { Alert, Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { login } from "../../app/redux/features/auth/authSlice";

const users: { username: string; password: string; role: "admin" | "editor" }[] = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "editor", password: "editor123", role: "editor" },
];

const LoginPage: React.FC = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    const user = users.find(
      u => u.username === values.username && u.password === values.password
    );
    if (user) {
      dispatch(
        login({
          username: user.username,
          token: "fake-jwt-token",
          role: user.role,
        })
      );
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "100px auto", padding: 20, border: "1px solid #ddd", borderRadius: 4 }}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Admin Dashboard Login
      </Typography.Title>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input placeholder="admin or editor" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password placeholder="admin123 or editor123" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
        </Form.Item>
      </Form>
      <div
  style={{
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "16px 20px",
   
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    fontFamily: "system-ui, sans-serif",
    color: "#111827",
    lineHeight: "1.6",
  }}
>
  <p style={{ margin: 0, fontWeight: "bold", fontSize: "14px" }}>Username: <span style={{ fontWeight: "normal" }}>admin</span></p>
  <p style={{ margin: "8px 0 0", fontWeight: "bold", fontSize: "14px" }}>Pass: <span style={{ fontWeight: "normal" }}>admin123</span></p>
</div>

    </div>
  );
};

export default LoginPage;

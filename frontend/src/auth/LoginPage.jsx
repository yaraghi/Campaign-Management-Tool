import React, { useReducer, useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const initialState = { email: "", password: "" };

const formReducer = (state, action) => ({ ...state, [action.name]: action.value });

function LoginPage() {
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    dispatch({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}>
      <Title level={3}>Login</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Email" required>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Password" required>
          <Input.Password name="password" value={formData.password} onChange={handleChange} />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Login
        </Button>
      </Form>

      <Text style={{ display: "block", marginTop: 10 }}>
        New user? <Link to="/register">Register</Link>
      </Text>
    </Card>
  );
}

export default LoginPage;

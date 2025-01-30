import React, { useReducer, useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const initialState = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const formReducer = (state, action) => ({ ...state, [action.name]: action.value });

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    dispatch({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.password_confirmation) {
      return message.error("Passwords do not match!");
    }

    setLoading(true);
    try {
      const data = await registerUser(formData);
      localStorage.setItem("token", data.token);
      toast.success("Registered successfully!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}>
      <Title level={3}>Register</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Full Name" required>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Email" required>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Password" required>
          <Input.Password name="password" value={formData.password} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Confirm Password" required>
          <Input.Password
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Register
        </Button>
      </Form>

      <Text style={{ display: "block", marginTop: 10 }}>
        Already have an account? <Link to="/login">Login</Link>
      </Text>
    </Card>
  );
}

export default RegisterPage;

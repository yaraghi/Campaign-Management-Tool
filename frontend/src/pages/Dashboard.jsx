import React, { useState, useCallback, useEffect } from "react";
import { Layout, Button, Space, Typography, message, Dropdown, Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import CreateCampaignModal from "./../components/CreateCampaignForm";
import CampaignList from "./../components/CampaignList";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

function Dashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCampaignCreated = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
    setShowCreateModal(false);
  }, []);

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    message.success("Logged out successfully!");
    window.location.href = "/login";
  };

  const menu = (
    <Menu>
      <Menu.Item key="2" onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 🏷️ Header with User & Logout */}
      <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#001529", padding: "0 20px" }}>
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          Campaign Management Tool
        </Title>

        {/* User Info & Logout */}
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button type="text" style={{ color: "#fff" }}>
          Profile ▼
          </Button>
        </Dropdown>
      </Header>

      <Content style={{ padding: "20px", background: "#fff" }}>
        <Title level={2}>Manage Your Campaigns</Title>
        <Paragraph>Efficiently handle all your marketing campaigns.</Paragraph>

        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={() => setShowCreateModal(true)}>
            Create New Campaign
          </Button>
        </Space>

        <CreateCampaignModal open={showCreateModal} onCancel={handleCloseModal} onCampaignCreated={handleCampaignCreated} />

        <CampaignList key={refreshKey} />
      </Content>
    </Layout>
  );
}

export default Dashboard;

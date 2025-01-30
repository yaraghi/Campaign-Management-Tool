import React, { useEffect, useState } from "react";
import { Table, Button, Input, Select, Spin, Space, message, Typography } from "antd";
import { getCampaigns, updateCampaignStatus } from "../services/api";
import { AiFillPlayCircle, AiFillPauseCircle, AiOutlineSearch } from "react-icons/ai";

const { Title } = Typography;
const { Option } = Select;

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    title: "",
    status: "",
  });
  useEffect(()=>{
    fetchCampaigns()
  },[])

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const data = await getCampaigns(filters);
      setCampaigns(data);
    } catch (error) {
      message.error(`Failed to fetch campaigns: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleStatusChange = async (campaignId, newStatus) => {
    try {
      await updateCampaignStatus(campaignId, newStatus);
      message.success(`Campaign status changed to ${newStatus}`);
      fetchCampaigns();
    } catch (error) {
      message.error(`Failed to update status: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Title level={4}>Campaign List</Title>
      
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by title"
          value={filters.title}
          onChange={(e) => handleFilterChange("title", e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          value={filters.status}
          onChange={(value) => handleFilterChange("status", value)}
          style={{ width: 150 }}
          placeholder="Select Status"
        >
          <Option value="">All Statuses</Option>
          <Option value="active">Active</Option>
          <Option value="paused">Paused</Option>
        </Select>
        <Button type="default" onClick={fetchCampaigns} disabled={loading}>
          {loading ? <Spin size="small" /> : <AiOutlineSearch />} Search
        </Button>
      </Space>

      {loading ? (
        <Spin tip="Loading campaigns..." style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Table bordered dataSource={campaigns} rowKey="id" pagination={{ pageSize: 5 }}>
          <Table.Column title="Title" dataIndex="title" key="title" />
          <Table.Column
            title="Landing Page"
            dataIndex="landing_page_url"
            key="landing_page_url"
            render={(url) => <a href={url} target="_blank" rel="noreferrer">{url}</a>}
          />
          <Table.Column title="Status" dataIndex="activity_status" key="status" />
          <Table.Column
            title="Payouts"
            key="payouts"
            render={(_, record) => (
              <>
                {record.payouts?.map((p) => (
                  <div key={p.id}>
                    <strong>{p.country.name}:</strong> €{p.amount}
                  </div>
                ))}
              </>
            )}
          />
          <Table.Column
            title="Actions"
            key="actions"
            render={(_, record) => (
              <Button
                type={record.activity_status === "active" ? "default" : "primary"}
                size="middle"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: record.activity_status === "active" ? "#FFC107" : "",
                  borderColor: record.activity_status === "active" ? "#FFC107" : "",
                  color: record.activity_status === "active" ? "#000" : "",
                  width: 120,
                  height: 40,
                  fontWeight: "bold",
                }}
                onClick={() =>
                  handleStatusChange(record.id, record.activity_status === "active" ? "paused" : "active")
                }
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {record.activity_status === "active" ? (
                    <>
                      <AiFillPauseCircle size={22} /> Pause
                    </>
                  ) : (
                    <>
                      <AiFillPlayCircle size={22} /> Activate
                    </>
                  )}
                </span>
              </Button>
            )}
          />
        </Table>
      )}
    </div>
  );
}

export default CampaignList;

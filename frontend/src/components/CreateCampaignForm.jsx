import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Form, Input, Select, Row, Col, Spin, message } from "antd";
import { createCampaign, getCountries } from "../services/api";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const { Option } = Select;

function CreateCampaignModal({ open, onCancel, onCampaignCreated }) {
  const [title, setTitle] = useState("");
  const [landingPageUrl, setLandingPageUrl] = useState("");
  const [activityStatus, setActivityStatus] = useState("paused");
  const [countries, setCountries] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchCountries = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCountries = await getCountries();
      setCountries(fetchedCountries);

      setPayouts(fetchedCountries.map((country) => ({ country_id: country.id, amount: "" })));
    } catch (error) {
      message.error(`Failed to fetch countries: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) fetchCountries();
  }, [open, fetchCountries]);

  const validateForm = () => {
    if (!title.trim() || !landingPageUrl.trim()) {
      message.error("Please fill in all required fields!");
      return false;
    }

    for (let payout of payouts) {
      if (!payout.amount || isNaN(payout.amount) || parseFloat(payout.amount) <= 0) {
        message.error("All country payout amounts must be valid number");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      await createCampaign({ title, landing_page_url: landingPageUrl, activity_status: activityStatus, payouts });

      message.success(
        <span>
          Campaign created successfully!
        </span>
      );

      resetForm();
      onCancel();
      if (onCampaignCreated) onCampaignCreated();
    } catch (error) {
      message.error(
        <span>
          <AiOutlineCloseCircle /> {error.response?.data?.error || "Failed to create campaign"}
        </span>
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setLandingPageUrl("");
    setActivityStatus("paused");
    setPayouts([]);
  };

  const handlePayoutChange = (index, field, value) => {
    const updatedPayouts = [...payouts];
    updatedPayouts[index][field] = value;
    setPayouts(updatedPayouts);
  };

  return (
    <Modal
      title="Create New Campaign"
      open={open}
      onCancel={onCancel} 
      footer={[
        <Button key="cancel" onClick={onCancel} disabled={submitting}>Close</Button>,
        <Button key="submit" type="primary" onClick={handleSubmit} loading={submitting}>
          Create Campaign
        </Button>,
      ]}
    >
      {loading ? (
        <div className="text-center">
          <Spin />
          <p>Loading countries...</p>
        </div>
      ) : (
        <Form layout="vertical">
          <Form.Item label="Title" required>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Campaign title" />
          </Form.Item>

          <Form.Item label="Landing Page URL" required>
            <Input value={landingPageUrl} onChange={(e) => setLandingPageUrl(e.target.value)} placeholder="https://example.com" />
          </Form.Item>

          <Form.Item label="Activity Status">
            <Select value={activityStatus} onChange={setActivityStatus}>
              <Option value="paused">Paused</Option>
              <Option value="active">Active</Option>
            </Select>
          </Form.Item>

          <h5>Payouts</h5>
          <Row gutter={16}>
            {payouts.map((payout, idx) => (
              <Col key={payout.country_id} xs={24} md={12}>
                <Form.Item
                  label={`${countries.find((c) => c.id === payout.country_id)?.name} Amount`}
                  validateStatus={isNaN(payout.amount) || parseFloat(payout.amount) <= 0 ? "error" : ""}
                  help={isNaN(payout.amount) || parseFloat(payout.amount) <= 0 ? "Enter a valid number greater than 0" : ""}
                >
                  <Input
                    type="number"
                    step="0.01"
                    value={payout.amount}
                    onChange={(e) => handlePayoutChange(idx, "amount", e.target.value)}
                    placeholder="0.00"
                  />
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Form>
      )}
    </Modal>
  );
}

export default CreateCampaignModal;

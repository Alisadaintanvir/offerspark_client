import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Avatar,
  message,
} from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  BarChartOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { apiClient, API_ENDPOINTS } from "../config/api";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(API_ENDPOINTS.auth.me);
        console.log(response);
        setUserData(response.data);
      } catch (error) {
        message.error("Failed to fetch user data. Please login again.");
        console.error("Error fetching user data:", error);
        // Redirect to login if unauthorized
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        style={{
          boxShadow: "2px 0 8px 0 rgba(29,35,41,.05)",
        }}
      >
        <div className="p-4">
          <Title level={4} className="text-center mb-0">
            OffersPark
          </Title>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <BarChartOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <ShoppingCartOutlined />,
              label: "Orders",
            },
            {
              key: "3",
              icon: <UserOutlined />,
              label: "Customers",
            },
            {
              key: "4",
              icon: <SettingOutlined />,
              label: "Settings",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            boxShadow: "0 1px 4px rgba(0,21,41,.08)",
          }}
        >
          <div className="flex justify-between items-center h-full">
            <Title level={4} className="mb-0">
              Dashboard
            </Title>
            <div className="flex items-center gap-4">
              <BellOutlined className="text-xl cursor-pointer" />
              <Avatar
                icon={<UserOutlined />}
                src={userData?.avatar}
                alt={userData?.name || "User"}
              />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px",
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} lg={6}>
                  <Card>
                    <Statistic
                      title="Total Sales"
                      value={112893}
                      prefix={<DollarOutlined />}
                      precision={2}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Card>
                    <Statistic
                      title="Total Orders"
                      value={156}
                      prefix={<ShoppingCartOutlined />}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Card>
                    <Statistic
                      title="Active Users"
                      value={2842}
                      prefix={<UserOutlined />}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Card>
                    <Statistic title="Conversion Rate" value={3.2} suffix="%" />
                  </Card>
                </Col>
              </Row>

              <Row gutter={[24, 24]} className="mt-6">
                <Col xs={24} lg={16}>
                  <Card title="Recent Activity">
                    <p>Activity content will go here</p>
                  </Card>
                </Col>
                <Col xs={24} lg={8}>
                  <Card title="Quick Actions">
                    <p>Quick actions will go here</p>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

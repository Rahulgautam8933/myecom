import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Table } from "antd";
import { Col, Row } from "react-bootstrap";
import CreateProduct from "./CreateProduct";
import AllProducts from "./AllProducts";
import AdminDashboard from "./AdminDashboard";
import OrderList from "./OrderList";
import UserList from "./UserList";
import OrderDEtails1 from "./OrderDEtails1";
const { Header, Sider, Content } = Layout;
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1"); // Initial selected key

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  return (
    <>
      <Layout style={{ paddingTop: "6rem" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Dashboard",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "All Products",
              },
              {
                key: "3",
                icon: <VideoCameraOutlined />,
                label: "Create Products",
              },
              {
                key: "4",
                icon: <UploadOutlined />,
                label: "UserList",
              },

              {
                key: "6",
                icon: <UploadOutlined />,
                label: "Order List",
              },
            ]}
          />
        </Sider>
        <Layout>

          <Content
            style={{
              margin: "8px 16px",
              padding: "40px 9px",
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              position: "relative",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                // width: 64,
                // height: 64,
                // fontSize: "2rem",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            />
            {selectedKey === "1" && (
              <div>
                <AdminDashboard />
              </div>
            )}
            {selectedKey === "2" && (
              <div>
                <AllProducts />
              </div>
            )}
            {selectedKey === "3" && (
              <div>
                <CreateProduct />
              </div>
            )}
            {selectedKey === "4" && (
              <div>
                <UserList />
              </div>
            )}
            {selectedKey === "5" && (
              <div>
                <OrderDEtails1 />
              </div>
            )}
            {selectedKey === "6" && (
              <div>
                <OrderList selectedKey={setSelectedKey} />
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default Dashboard;

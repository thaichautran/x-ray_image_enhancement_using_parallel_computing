import React, { useState, useEffect } from "react";
import Footer from "./TheFooter";
import Header from "./TheHeader";
import { UserOutlined, StarOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Button, theme, Spin } from "antd";
import { getCategories } from "../../apis/Categories";
import { useNavigate, Link } from "react-router-dom";
import LogoIcon from "../../assets/images/logo.svg";
export default function AppBar({ children }) {
  const { Content, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(0);
  const [cateList, setCateList] = useState([]);
  //Breadcum item
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleChangeBreakpoints = (broken) => {
    if (broken) {
      setCollapsedWidth(0);
    } else {
      setCollapsedWidth(75);
    }
  };
  const setCollapseChild = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
          padding: "0.5rem",
        }}
        hasSider
      >
        <Sider
          breakpoint="md"
          collapsedWidth={collapsedWidth}
          onBreakpoint={(broken) => {
            handleChangeBreakpoints(broken);
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          width={225}
          style={{
            borderRadius: "1.25rem",
            boxShadow: "0 1px 4px 0 rgba(0, 21, 41, 0.08)",
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 1,
          }}
        >
          <div className="demo-logo-vertical" />
          <div
            style={{
              padding: "0.75rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                style={{ width: 50, height: 50, marginRight: "0.5rem" }}
                src={LogoIcon}
                alt="logo"
              />
              {!collapsed ? (
                <span className="logo-text">E-Hospital</span>
              ) : null}
            </div>
            {!collapsed ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#7A7A7A",
                  fontSize: "0.75rem",
                  marginTop: "0.5rem",
                }}
              >
                YOU ONLY LIVE ONCE
              </p>
            ) : null}
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            style={{
              borderRadius: "1.25rem",
              padding: "0.75rem",
            }}
            onSelect={(props) => {}}
          >
            <Menu.Item
              key="1"
              icon={<UserOutlined />}
              onClick={() => {
                navigate("/");
              }}
            >
              Bệnh nhân
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<StarOutlined />}
              onClick={() => {
                navigate("/careful");
              }}
            >
              Chú ý
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            setCollapse={setCollapseChild}
            collapsed={collapsed}
            colorBgContainer={colorBgContainer}
          />
          <Content
            className="app-content"
            style={{
              margin: !collapsed ? "4rem 1rem 0 15rem" : "4rem 1rem 0 5rem",
              transition: "all .3s",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: "100%",
                background: colorBgContainer,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
}

import React, { Fragment, useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  FileOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Input, Avatar, Dropdown, Space, message } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { searchDocuments } from "../../apis/Documents";

export default function TheHeader({
  setCollapse,
  collapsed,
  colorBgContainer,
}) {
  const { Search } = Input;
  const navigate = useNavigate();
  const [documentList, setDocumentList] = useState([]);
  const [keySearch, setKeySearch] = useState("");
  const [isBlur, setIsBlur] = useState(false);
  let timer = null;
  const debounce = (callback) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(), 500);
  };
  useEffect(() => {
    searchDocuments(keySearch)
      .then((res) => {
        let result = res.data;
        result = result.map((doc) => {
          if (doc.name) {
            return doc.name;
          }
          return doc.file_name;
        });
        setDocumentList([...new Set(result)]);
      })
      .catch((err) => {
        console.log(err);
      });
    // if (keySearch) {
    //   setTimeout(() => {
    //     searchDocuments(keySearch)
    //       .then((res) => {
    //         let result = res.data;
    //         result = result.map((doc) => {
    //           if (doc.name) {
    //             return doc.name;
    //           }
    //           return doc.file_name;
    //         });
    //         setDocumentList([...new Set(result)]);
    //       })
    //       .catch((err) => {
    //         message.error("Không tìm thấy tài liệu nào!");
    //       });
    //   }, 300);
    // }
  }, [keySearch]);

  const onSearch = async (value) => {};

  const renderDocumentList = () => {
    return documentList.map((document, index) => {
      return (
        <Fragment>
          <li
            onClick={() => {
              onSearch(document);
            }}
            key={index}
          >
            {document}
          </li>
        </Fragment>
      );
    });
  };

  const items = [
    {
      label: (
        <span
          style={{ fontSize: "0.8rem" }}
          onClick={() => {
            viewFileUploaded();
          }}
        >
          <FileOutlined /> Tài liệu đã đăng
        </span>
      ),
      key: "0",
    },
    {
      label: (
        <span
          style={{ fontSize: "0.8rem" }}
          onClick={() => {
            handleLogout();
          }}
        >
          <LogoutOutlined /> Đăng xuất
        </span>
      ),
      key: "1",
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();

  const viewFileUploaded = () => {
    navigate("/user/uploaded");
  };
  const handleLogout = () => {
    messageApi.open({
      type: "success",
      content: "Đăng xuất thành công!",
      duration: 2,
    });

    navigate("/");
  };

  return (
    <div>
      {contextHolder}
      <Header
        id="header"
        style={{
          maxHeight: "64px",
          padding: 0,
          background: colorBgContainer,
          borderRadius: "20px",
          boxShadow: "0 1px 4px 0 rgba(0, 21, 41, 0.08)",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: !collapsed ? "calc(15vw + 10px)" : "calc(5vw + 10px)",
          zIndex: 1,
          width: !collapsed ? "calc(82.5vw + 10px)" : "calc(92.5vw + 10px)",
          transition: "all .3s",
        }}
      >
        <Button
          className="btn-sider"
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapse()}
          style={{
            width: 64,
            height: 64,
          }}
        />
        <Search style={{ width: "50%" }}></Search>
        <div
          className="header-right"
          style={{
            textAlign: "right",
            display: "flex",
            minWidth: "65%",
            paddingRight: "10rem",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          {/* <ModalUpload cateList={cateList}></ModalUpload> */}

          <Space>
            <Avatar
              className="btn-avatar"
              style={{ cursor: "pointer" }}
              size={40}
              icon={<UserOutlined />}
            />
          </Space>
        </div>
      </Header>
      <div
        className="search-list"
        style={{
          right: !collapsed ? "0" : "12%",
        }}
      >
        {documentList.length > 0 && keySearch && !isBlur ? (
          <ul className="search-ul">{renderDocumentList()}</ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

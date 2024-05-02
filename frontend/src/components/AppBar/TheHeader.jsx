import React, { Fragment, useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  FileOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Input, Avatar, Dropdown, Space, message, Modal } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { searchImage } from "../../apis/image";
import UploadModal from "../Modals/UploadModal";
export default function TheHeader({
  setCollapse,
  collapsed,
  colorBgContainer,
}) {
  const { Search } = Input;
  const navigate = useNavigate();
  const [albumList, setAlbumList] = useState([]);
  const [keySearch, setKeySearch] = useState("");
  const [isBlur, setIsBlur] = useState(false);

  let timer = null;
  const debounce = (callback) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(), 500);
  };
  useEffect(() => {
    searchImage(keySearch)
      .then((res) => {
        let firstImage = res?.data?.imageDTOList?.find(
          (image) => image?.length > 0
        );
        console.log(firstImage);
        let result = firstImage?.map((item) => {
          if (item?.name?.includes(keySearch)) {
            return item.name?.split("\n")[0].trim();
          } else if (item?.phone?.includes(keySearch)) {
            return item?.phone?.split("\n")[0].trim();
          } else if (item?.address?.includes(keySearch)) {
            return item?.address?.split("\n")[0].trim();
          } else {
            return (
              item?.name?.split("\n")[0].trim(),
              item?.phone?.split("\n")[0].trim(),
              item?.address?.split("\n")[0].trim()
            );
          }
        });

        setAlbumList([...new Set(result)]);
      })
      .catch((err) => {
        console.log(err);
      });
    // if (keySearch) {
    //   setTimeout(() => {
    //     searchImage(keySearch)
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

  const onSearch = async (keySearch) => {
    searchImage(keySearch)
      .then((res) => {
        let firstImage = res?.data?.map((album) => {
          return album?.imageDTOList?.map((image) => {
            return image;
          });
        });
        console.log(firstImage);
        let result = firstImage?.map((item) => {
          if (item?.name?.includes(keySearch)) {
            return item.name?.split("\n")[0].trim();
          } else if (item?.phone?.includes(keySearch)) {
            return item?.phone?.split("\n")[0].trim();
          } else if (item?.address?.includes(keySearch)) {
            return item?.address?.split("\n")[0].trim();
          } else {
            return (
              item?.name?.split("\n")[0].trim(),
              item?.phone?.split("\n")[0].trim(),
              item?.address?.split("\n")[0].trim()
            );
          }
        });

        setAlbumList([...new Set(result)]);
      })
      .catch((err) => {
        message.error("Không tìm thấy ảnh nào!");
        console.log(err);
      });
  };

  const renderAlbumList = () => {
    return albumList.map((album, index) => {
      return (
        <Fragment>
          <li
            onClick={() => {
              onSearch(album);
            }}
            key={index}
          >
            {album?.name}
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
        <Search
          style={{ width: "50%" }}
          onChange={(e) => debounce(() => setKeySearch(e.target.value))}
          onFocus={() => setIsBlur(false)}
          onBlur={() => setTimeout(() => setIsBlur(true), 200)}
          onSearch={onSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(keySearch);
              setTimeout(() => setIsBlur(true), 200);
            }
          }}
        ></Search>
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
          <UploadModal></UploadModal>

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
          zIndex: "10",
        }}
      >
        {albumList.length > 0 && keySearch && !isBlur ? (
          <ul className="search-ul">{renderAlbumList()}</ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "../../assets/scss/pages/Home.scss";
import ImageView from "../../components/Images/ImageView";
import { getTrash, deleteTrash } from "../../apis/image";
import { message, Button, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

export default function Trash() {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    handleGetTrash();
  }, []);
  const handleGetTrash = async () => {
    await getTrash()
      .then((res) => {
        let newList = [];
        res.data.forEach((album) => {
          album?.imageDTOList?.forEach((image) => {
            newList.push(image);
          });
        });
        setImageList(newList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteTrash = async () => {
    setLoading(true);
    await deleteTrash()
      .then((res) => {
        handleGetTrash();
        setLoading(false);
        message.success("Đã xóa tất cả ảnh trong thùng rác");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra");
        setLoading(false);
      });
  };
  const getNewList = () => {
    handleGetTrash();
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <ImageView imageList={imageList} getNewList={getNewList}></ImageView>

      <Popconfirm
        title="Bạn có muốn xóa toàn bộ thùng rác không?"
        description="Xóa ảnh khỏi thùng rác sẽ không thể khôi phục!"
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ type: "primary", danger: true }}
        onConfirm={() => {
          handleDeleteTrash();
        }}
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      >
        <Button
          type="primary"
          danger
          loading={loading}
          disabled={imageList.length <= 0}
        >
          <DeleteOutlined></DeleteOutlined>
          Xóa toàn bộ thùng rác
        </Button>
      </Popconfirm>
    </div>
  );
}

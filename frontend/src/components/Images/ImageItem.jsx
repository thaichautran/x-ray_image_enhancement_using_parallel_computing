import React from "react";
import { useState } from "react";
import { Button, Col, Modal } from "antd";
import ImageModal from "../Modals/ImageModal";
import { ThunderboltOutlined, StarOutlined } from "@ant-design/icons";
import "../../assets/scss/components/ImageItem.scss";
export default function ImageItem({ image, imageList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="image-item">
      <Col
        onClick={() => {
          showModal();
        }}
        style={{ cursor: "pointer" }}
      >
        <img className="image" src={image.url} alt={image.name} />
      </Col>

      <Modal
        width={1100}
        open={isModalOpen}
        onOk={() => {
          handleOk();
        }}
        closable={false}
        footer={
          <div style={{ textAlign: "-webkit-right" }}>
            <div
              style={{
                display: "flex",
                textAlign: "left",
                justifyContent: "space-between",
                width: "50%",
              }}
            >
              <Button>
                <StarOutlined /> Chú ý
              </Button>
              <Button>
                <ThunderboltOutlined /> Tăng cường ảnh
              </Button>
            </div>
          </div>
        }
      >
        <ImageModal
          image={image}
          imageList={imageList}
          onCancel={handleCancel}
        ></ImageModal>
      </Modal>
    </div>
  );
}

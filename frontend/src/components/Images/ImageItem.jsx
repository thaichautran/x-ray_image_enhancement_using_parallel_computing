import React from "react";
import { useState } from "react";
import { Col, Modal } from "antd";
import ImageModal from "../Modals/ImageModal";
import "../../assets/scss/components/ImageItem.scss";
export default function ImageItem({ image }) {
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
      >
        <img className="image" src={image.image_url} alt={image.patient_name} />
      </Col>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => {
          handleOk();
        }}
        onCancel={() => {
          handleCancel();
        }}
      >
        <ImageModal></ImageModal>
      </Modal>
    </div>
  );
}

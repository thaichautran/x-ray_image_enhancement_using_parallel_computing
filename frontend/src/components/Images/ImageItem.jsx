import React from "react";
import { useState } from "react";
import { Button, Col, Modal } from "antd";
import ImageModal from "../Modals/ImageModal";
import {
  ThunderboltOutlined,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import "../../assets/scss/components/ImageItem.scss";
import { enhanceImage, markImage } from "../../apis/image";

export default function ImageItem({ image, imageList, getNewList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enhancedImageList, setEnhancedImage] = useState();
  const [isMark, setIsMark] = useState(image.mark);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const enhance = async () => {
    setLoading(true);

    let rqbody = {
      image_url: image.url,
    };
    await enhanceImage(rqbody)
      .then((res) => {
        setEnhancedImage(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleMarkImage = async () => {
    setIsMark(!isMark);

    await markImage(image.imageId, !isMark);
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
              <Button
                onClick={() => {
                  getNewList();
                  handleMarkImage();
                }}
              >
                {isMark ? (
                  <StarFilled style={{ color: "yellow" }} />
                ) : (
                  <StarOutlined />
                )}{" "}
                Chú ý
              </Button>
              <Button
                type="primary"
                loading={loading}
                onClick={() => {
                  enhance();
                }}
              >
                <ThunderboltOutlined /> Tăng cường ảnh
              </Button>
            </div>
          </div>
        }
      >
        <ImageModal
          enhancedImageList={enhancedImageList}
          image={image}
          imageList={imageList}
          onCancel={handleCancel}
          getNewList={getNewList}
        ></ImageModal>
      </Modal>
    </div>
  );
}

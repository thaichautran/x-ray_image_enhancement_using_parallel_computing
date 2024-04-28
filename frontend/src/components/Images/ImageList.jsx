import React, { useEffect } from "react";
import ImageItem from "./ImageItem";
import { Row, Col } from "antd";
export default function ImageList({ imageList }) {
  const renderImageList = () => {
    return imageList.map((image) => {
      return (
        <Col span={4}>
          <ImageItem
            key={image.phone}
            imageList={imageList}
            image={image}
          ></ImageItem>
        </Col>
      );
    });
  };
  return (
    <div>
      <Row gutter={12}>{renderImageList()}</Row>
    </div>
  );
}

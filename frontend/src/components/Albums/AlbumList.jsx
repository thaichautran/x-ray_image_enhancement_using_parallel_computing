import React, { useEffect } from "react";
import { Row, Col } from "antd";
import AlbumItem from "./AlbumItem";
export default function AlbumList({ albumList }) {
  useEffect(() => {}, [albumList]);
  const renderAlbumList = () => {
    return albumList.map((album) => {
      return (
        <Col span={4}>
          <AlbumItem key={album.name} album={album}></AlbumItem>
        </Col>
      );
    });
  };
  return (
    <div>
      <Row gutter={12}>{renderAlbumList()}</Row>
    </div>
  );
}

import React, { useEffect } from "react";
import { Row, Col } from "antd";
import AlbumItem from "./AlbumItem";
export default function AlbumList({ albumList, getNewList }) {
  useEffect(() => {}, [albumList]);

  const renderAlbumList = () => {
    return albumList.map((album) => {
      return album.imageDTOList.length > 0 ? (
        <Col span={4}>
          <AlbumItem
            getNewList={getNewList}
            key={album.albumId}
            album={album}
          ></AlbumItem>
        </Col>
      ) : (
        <div style={{ display: "none" }}></div>
      );
    });
  };
  return (
    <div>
      <Row gutter={12}>{renderAlbumList()}</Row>
    </div>
  );
}

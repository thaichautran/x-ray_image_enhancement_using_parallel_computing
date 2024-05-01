import React from "react";
import { useState } from "react";
import { Button, Col, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "../../assets/scss/components/ImageItem.scss";

export default function AlbumItem({ album }) {
  const navigate = useNavigate();

  return (
    <div id="image-item">
      <Col
        onClick={() => {
          navigate(`/album/${album.name}`, {
            state: { imageList: album.imageDTOList },
          });
        }}
        style={{ cursor: "pointer" }}
      >
        <img
          className="image album-cover"
          src={album.imageDTOList[0].url}
          alt={album.name}
        />
        <div className="image-info">
          <p style={{ fontSize: "1rem", fontWeight: "600" }}>
            BN - {album.imageDTOList[0].name}
          </p>
          <p>{album.imageDTOList.length} ảnh</p>
        </div>
      </Col>
    </div>
  );
}

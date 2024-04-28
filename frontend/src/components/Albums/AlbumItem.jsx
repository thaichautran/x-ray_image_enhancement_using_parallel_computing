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
            state: { imageList: album.imageList },
          });
        }}
        style={{ cursor: "pointer" }}
      >
        <img
          className="image album-cover"
          src={album.cover_photo}
          alt={album.name}
        />
        <div className="image-info">
          <p style={{ fontSize: "1rem", fontWeight: "600" }}>
            BN - {album.name}
          </p>
          <p>{album.imageList.length} ảnh</p>
        </div>
      </Col>
    </div>
  );
}

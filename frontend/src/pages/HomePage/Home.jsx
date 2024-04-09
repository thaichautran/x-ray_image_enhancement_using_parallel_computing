import React, { useState, useEffect } from "react";
import { Row } from "antd";
import "../../assets/scss/pages/Home.scss";
import imageList from "./test.json";
import ImageList from "../../components/Images/ImageList";
export default function Home() {
  const [images, setImages] = useState(imageList);

  useEffect(() => {
    setImages(imageList);
  });
  return (
    <div>
      <ImageList imageList={images}></ImageList>
    </div>
  );
}

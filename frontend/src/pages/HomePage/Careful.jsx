import React, { useState, useEffect } from "react";
import "../../assets/scss/pages/Home.scss";
import imageList from "./test.json";
import ImageView from "../../components/Images/ImageView";
export default function Careful() {
  return (
    <div>
      <ImageView imageList={imageList}></ImageView>
    </div>
  );
}

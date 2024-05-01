import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ImageView from "../Images/ImageView";

export default function ImageByAlbum() {
  const location = useLocation();
  const imageList = location.state.imageList;
  const getNewList = () => {};

  return (
    <section id="album-view">
      {<ImageView imageList={imageList} getNewList={getNewList}></ImageView>}
    </section>
  );
}

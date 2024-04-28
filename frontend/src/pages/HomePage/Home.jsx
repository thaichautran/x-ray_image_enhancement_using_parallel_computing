import React, { useState, useEffect } from "react";
import "../../assets/scss/pages/Home.scss";
import albumList from "./albumList.json";
import AlbumView from "../../components/Albums/AlbumView";
export default function Home() {
  return (
    <section className="home-page">
      <h1 style={{ fontSize: "2rem" }}>Hồ sơ bệnh nhân</h1>
      <div>
        <AlbumView albumList={albumList}></AlbumView>
      </div>
    </section>
  );
}

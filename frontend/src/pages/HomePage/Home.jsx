import React, { useState, useEffect } from "react";
import "../../assets/scss/pages/Home.scss";

import AlbumView from "../../components/Albums/AlbumView";
export default function Home() {
  return (
    <section className="home-page">
      <h1 style={{ fontSize: "2rem" }}>Hồ sơ bệnh nhân</h1>
      <div>
        <AlbumView></AlbumView>
      </div>
    </section>
  );
}

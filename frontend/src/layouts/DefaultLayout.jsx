import React from "react";
import AppBar from "../components/AppBar/AppBar";
import { FloatButton, Popover, Tooltip } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { useState } from "react";
export default function DefaultLayout({ children }) {
  //popupconfirm
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <div id="default-layout">
      <AppBar>
        {" "}
        {children}
        <FloatButton.Group
          shape="circle"
          style={{
            right: 26,
            bottom: 10,
          }}
          className="float-button-group"
        >
          <FloatButton.BackTop />
        </FloatButton.Group>
      </AppBar>
    </div>
  );
}

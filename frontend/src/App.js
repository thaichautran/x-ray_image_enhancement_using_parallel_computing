import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import NotHeaderLayout from "./layouts/NotHeaderLayout";
import { routes } from "./router/routes";
import React, { Fragment, useEffect } from "react";
import "./App.scss";
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultLayout : NotHeaderLayout;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;

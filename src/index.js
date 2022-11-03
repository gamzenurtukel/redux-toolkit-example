import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.min.css";
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navbar from "./Components/Navbar";
import MenuCart from "./Components/MenuCart";
const { Header, Content, Sider } = Layout;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Header
          className="header"
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            padding: 0,
          }}
        >
          <MenuCart />
        </Header>
        <Content
          style={{
            padding: "0 50px",
            marginTop: 64,
          }}
        >
          <Layout
            className="site-layout-background"
            style={{
              padding: "24px 0",
            }}
          >
            <Sider className="site-layout-background" width={200}>
              <Navbar />
            </Sider>
            <Content
              style={{
                padding: "0 24px",
                minHeight: 900,
                background: "#fff",
                justifyContent: "center",
              }}
            >
              <App />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </BrowserRouter>
  </Provider>
);
reportWebVitals();

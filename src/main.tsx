import React from "react";
import ReactDOM from "react-dom/client";
import MemoListContainer from "./MemoListContainer.tsx";
import "./index.css";
import Layout from "./layout";
import Provider from "./provider/index";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <Layout>
        <MemoListContainer />
      </Layout>
    </Provider>
  </React.StrictMode>
);

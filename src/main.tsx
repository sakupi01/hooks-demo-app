import React from "react";
import ReactDOM from "react-dom/client";
import MemoListContainer from "./MemoListContainer.tsx";
import "./index.css";
import Layout from "./layout";
import ThemeProvider from "./provider/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Layout>
        <MemoListContainer />
      </Layout>
    </ThemeProvider>
  </React.StrictMode>
);

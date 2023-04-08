import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { TextEditor } from "./Editor";

export const loader = async ({ params }: any) => {
  return { docId: params.docId };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "docs/:docId",
        element: <TextEditor />,
        loader: loader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />;
    </MantineProvider>
  </React.StrictMode>
);

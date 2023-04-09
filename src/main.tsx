import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {Button, Flex, MantineProvider, TextInput, Title} from "@mantine/core";
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import {TextEditor} from "./Editor";
import {IconSend} from "@tabler/icons-react";

export const loader = async ({params}: any) => {
  return {documentName: params.documentName};
};

const Home = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  return <Flex direction={"column"} gap={20} align={"center"}>
    <Title>Name your document</Title>
    <Flex gap={20} justify={"center"}>
      <TextInput
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`documents/${value}`);
          }
        }}
        placeholder={"Type something...."}
        value={value} onChange={(e) => setValue(e.target.value)}
      />
      <Button

        onClick={() => navigate(`documents/${value}`)}>
        <IconSend stroke={1.5} size={"1.5em"} />
      </Button>
    </Flex>
  </Flex>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "documents/:documentName",
        element: <Flex direction={"column"} gap={20}>
          <TextEditor isPromptInput={false} />
          <TextEditor isPromptInput />
        </Flex>,
        loader: loader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <RouterProvider router={router}/>
  </MantineProvider>
  // </React.StrictMode>
);

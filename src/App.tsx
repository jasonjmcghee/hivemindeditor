import {Container, Flex} from "@mantine/core";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <Flex>
      <Container w={"70em"} m={"auto"}>
        <Outlet />
      </Container>
    </Flex>
  );
}

export default App;

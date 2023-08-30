import styled from "@emotion/styled";
import Header from "./components/Header";
import RepoList from "./components/RepoList";

const Main = styled("div")(() => ({
  background: "#f5f6fa",
  color: "#000",
  minHeight: "100vh"
}));

function App() {
  return (
    <Main>
      <Header />
      <RepoList />
    </Main>
  );
}

export default App;

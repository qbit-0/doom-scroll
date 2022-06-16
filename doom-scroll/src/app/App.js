import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Content } from "../components/Content/Content";
import { Hero } from "../components/Hero/Hero";
import { Login } from "../components/Login/Login";
import { NavBar } from "../components/NavBar/NavBar";
import { Comments } from "../features/comments/Comments";

function App() {
  return (
    <Router>
      <header>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="r/all" element={<Hero />} />
          <Route path="*" element={<></>} />
        </Routes>
      </header>
      <main>
        <NavBar />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="r/:subreddit" element={<Content />} />
          <Route path="login" element={<Login />} />
          <Route
            path="r/:subreddit/comments/:subreddit_id/:title"
            element={<Comments />}
          />
          <Route path="*" element={<></>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

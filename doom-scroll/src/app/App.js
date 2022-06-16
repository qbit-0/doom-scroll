import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import { Comments } from "../components/Comments/Comments";
import { Content } from "../components/Content/Content";
import { Hero } from "../components/Hero/Hero";
import { Login } from "../components/Login/Login";
import { NavBar } from "../components/NavBar/NavBar";

function App() {
  return (
    <Router>
      <header>
        <Routes>
          <Route path="r/all" element={<Hero />} />
        </Routes>
      </header>
      <main>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="r/all" />} />
          <Route path="login" element={<Login />} />
          <Route path="r/:subreddit" element={<Content />} />
          <Route
            path="r/:subreddit/comments/:subreddit_id/:title"
            element={<Comments />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

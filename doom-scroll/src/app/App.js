import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { CommentsPage } from "../components/CommentsPage/CommentsPage";
import { Hero } from "../components/Hero/Hero";
import { Login } from "../components/Login/Login";
import { NavBar } from "../components/NavBar/NavBar";
import { PostsPage } from "../components/PostsPage/PostsPage";

function App() {
  return (
    <Router>
      <header>
        <Hero />
      </header>
      <main>
        <NavBar />
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="r/:subreddit" element={<PostsPage />} />
          <Route path="search" element={<PostsPage />} />
          <Route
            path="r/:subreddit/comments/:article/:title"
            element={<CommentsPage />}
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<></>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

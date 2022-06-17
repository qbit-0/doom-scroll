import {
  BrowserRouter as Router, Route,
  Routes
} from "react-router-dom";
import { Hero } from "../components/Hero";
import { ListingsPage } from "../components/ListingsPage";
import { Login } from "../components/Login";
import { NavBar } from "../components/NavBar";

function App() {
  return (
    <Router>
      <header>
        <Hero />
      </header>
      <main>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<PostsPage />} />
          <Route path="r/:subreddit" element={<PostsPage />} />
          <Route path="search" element={<PostsPage />} />
          <Route
            path="r/:subreddit/comments/:article/:title"
            element={<CommentsPage />}
          /> */}
          
          <Route path="/" element={<ListingsPage />} />
          <Route path="r/:subreddit" element={<ListingsPage />} />
          <Route path="search" element={<ListingsPage />} />
          <Route path="r/:subreddit/comments/:article/:title" element={<ListingsPage />} />

          <Route path="login" element={<Login />} />
          <Route path="*" element={<></>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

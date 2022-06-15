import {
  BrowserRouter as Router, Route,
  Routes
} from "react-router-dom";
import { Comments } from "../components/Comments/Comments";
import { Hero } from "../components/Hero/Hero";
import { NavBar } from "../components/NavBar/NavBar";
import { Subreddit } from "../components/Subreddit/Subreddit";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <header>
          <Hero />
          <NavBar />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Subreddit />} />
            <Route path="r/:subreddit" element={<Subreddit />} />
            <Route
              path="r/:subreddit/comments/:subreddit_id/:title"
              element={<Comments />}
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;

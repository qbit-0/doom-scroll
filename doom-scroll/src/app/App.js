import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import model from "wink-eng-lite-web-model";
import winkNLP from "wink-nlp";
import { CommentsPage } from "../pages/CommentsPage/CommentsPage";
import { Hero } from "../components/Hero/Hero";
import { Login } from "../components/Login/Login";
import { NavBar } from "../components/NavBar/NavBar";
import { SearchPage } from "../pages/SearchPage/SearchPage";
import { SubredditPage } from "../pages/SubredditPage/SubredditPage";

function App() {
  const nlp = winkNLP(model, ["sbd", "negation", "sentiment"]);

  return (
    <Router>
      <Hero />
      <main className="bg-gray-900 text-amber-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="r/popular" />} />
          <Route path="/r/:subreddit/" element={<SubredditPage nlp={nlp} />} />
          <Route
            path="/r/:subreddit/:sort"
            element={<SubredditPage nlp={nlp} />}
          />
          <Route path="/search" element={<SearchPage nlp={nlp} />} />
          <Route
            path="/r/:subreddit/comments/:name/:title"
            element={<CommentsPage nlp={nlp} />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<></>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

import { Link, NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="sticky top-0 bg-red-400">
      <NavLink to="r/all">ALL</NavLink>
      <NavLink to="r/popular">POPULAR</NavLink>
      <NavLink to="r/news">NEWS</NavLink>
      <NavLink to="r/worldnews">WORLD NEWS</NavLink>
      <form>
        <input type="text" placeholder="Search" />
        <input type="submit" />
      </form>
      <form>
        <input type="number" placeholder="Sentiment" />
        <input type="submit" />
      </form>
      <button>Doom Scroll</button>
      <button>Bloom Scroll</button>
    </nav>
  );
};

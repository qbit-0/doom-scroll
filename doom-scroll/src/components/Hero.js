import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="h-screen bg-stone-900">
      <header>
        <blockquote
          cite="www.merriam-webster.com"
          className="w-3/5 max-w-md pt-16 mx-auto"
        >
          <p className="p-4 border-8 border-double text-justify text-lg font-thin text-amber-100">
            Doomscrolling and doomsurfing are new terms referring to the
            tendency to continue to surf or scroll through bad news, even though
            that news is saddening, disheartening, or depressing.
          </p>
        </blockquote>
        <h1 className="mt-16 text-9xl text-center font-black font-sans text-amber-100">
          <span className="underline decoration-rose-600">Doom</span>Scroll
        </h1>
        <h2 className="mt-8 text-4xl font-thin text-amber-100 text-center">
          The{" "}
          <button className="p-2 border-4 font-black text-sky-600">Best</button>{" "}
          and{" "}
          <button className="p-2 border-4 font-black text-rose-600">
            Worst
          </button>{" "}
          of Reddit.
        </h2>
      </header>
      <footer className="absolute bottom-0 w-full p-4 bg-amber-100">
        <p className="relative bottom-0 text-center font-medium text-stone-900">
          Designed and Built by Duy Pham
        </p>
      </footer>
    </div>
  );
};

import React from "react";

const Hero = () => {
  return (
    <div className="h-screen bg-zinc-900">
      <header className="text-amber-100">
        <blockquote
          cite="www.merriam-webster.com"
          className="w-3/5 max-w-md pt-16 mx-auto"
        >
          <p className="p-4 text-justify text-lg font-serif font-light">
            Doomscrolling and doomsurfing are new terms referring to the
            tendency to continue to surf or scroll through bad news, even though
            that news is saddening, disheartening, or depressing.
          </p>
        </blockquote>
        <h1 className="mt-16 text-8xl text-center font-extrabold">
          <span className="text-transparent bg-clip-text bg-gradient-to-tl from-amber-100 to-rose-600 drop-shadow-md">
            Doom
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-100 to-sky-600 drop-shadow-md">
            Scroll
          </span>
        </h1>
        <h2 className="mt-16 text-2xl font-light text-center">
          The{" "}
          <span className="p-2 text-4xl font-extrabold text-sky-600 drop-shadow-md">
            Best
          </span>{" "}
          and{" "}
          <span className="p-2 text-4xl font-extrabold text-rose-600 drop-shadow-md">
            Worst
          </span>{" "}
          of Reddit.
        </h2>
      </header>
      <footer className="absolute bottom-0 w-full p-4 bg-zinc-800 shadow-md text-amber-100">
        <p className="relative bottom-0 text-center font-medium">
          Designed and Built by Duy Pham
        </p>
      </footer>
    </div>
  );
};

export default Hero;

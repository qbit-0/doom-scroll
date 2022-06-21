
export const Hero = () => {
  return (
    <div className="h-screen bg-gray-900">
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
          <span className="text-transparent bg-clip-text bg-gradient-to-tl from-amber-100 to-rose-600">
            Doom
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-100 to-sky-600">
            Scroll
          </span>
        </h1>
        <h2 className="mt-16 text-2xl font-light text-center">
          The{" "}
          <button className="p-2 border-2 border-amber-100 rounded-2xl text-4xl font-extrabold transition-all text-sky-300 hover:bg-sky-600 hover:text-gray-900">
            Best
          </button>{" "}
          and{" "}
          <button className="p-2 border-2 border-amber-100 rounded-2xl text-4xl font-extrabold transition-all text-rose-300 hover:bg-rose-600 hover:text-gray-900">
            Worst
          </button>{" "}
          of Reddit.
        </h2>
      </header>
      <footer className="absolute bottom-0 w-full p-4 bg-gray-800 text-amber-100">
        <p className="relative bottom-0 text-center font-medium">
          Designed and Built by Duy Pham
        </p>
      </footer>
    </div>
  );
};

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
                        Doomscrolling refers to the tendency to continue to surf
                        or scroll through bad news, even though that news is
                        saddening, disheartening, or depressing.
                    </p>
                </blockquote>
                <h1 className="mt-16 text-8xl text-center font-extrabold">
                    <p className="inline-block text-transparent bg-clip-text bg-gradient-to-t from-rose-600 to-black drop-shadow-xl animate-shake">
                        Doom
                    </p>
                    <p className="inline-block text-transparent bg-clip-text bg-sky-600 drop-shadow-xl animate-fadeintop">
                        Scroll
                    </p>
                </h1>
                <h2 className="mt-16 text-2xl font-light text-center">
                    The Best and Worst of Reddit.
                </h2>
            </header>
            <footer className="absolute bottom-0 w-full p-4 bg-zinc-800 shadow-xl text-amber-100">
                <p className="relative bottom-0 text-center font-medium">
                    Designed and Built by Duy Pham
                </p>
            </footer>
        </div>
    );
};

export default Hero;

import Button from "components/Button/Button";
import { ButtonStyle } from "components/Button/Button";
import React, { FC } from "react";

type Props = {};

const Hero: FC<Props> = () => {
    return (
        <div className="h-screen bg-neutral-900">
            <header>
                <blockquote
                    cite="www.merriam-webster.com"
                    className="w-3/5 max-w-md pt-16 mx-auto"
                >
                    <p className="p-4 text-justify text-lg font-serif font-light text-amber-100">
                        Doomscrolling refers to the tendency to continue to surf
                        or scroll through bad news, even though that news is
                        saddening, disheartening, or depressing.
                    </p>
                </blockquote>
                <h1 className="mt-16 text-8xl text-center font-black">
                    <p className="inline-block text-transparent bg-clip-text bg-gradient-to-t from-rose-600 to-black drop-shadow-lg animate-shake">
                        Doom
                    </p>
                    <p className="inline-block text-transparent bg-clip-text bg-cyan-600 drop-shadow-lg animate-fadeintop">
                        Scroll
                    </p>
                </h1>
                <h2 className="mt-16 text-2xl font-light text-center text-amber-100">
                    The <Button bgColor="bg-cyan-600">Best</Button> and{" "}
                    <Button bgColor="bg-rose-600">Worst</Button> of Reddit.
                </h2>
            </header>

            <footer className="absolute bottom-0 w-full py-4 bg-neutral-800 drop-shadow-lg text-amber-100">
                <p className="relative bottom-0 text-center font-medium">
                    Designed and Built by Duy Pham
                </p>
            </footer>
        </div>
    );
};

export default Hero;

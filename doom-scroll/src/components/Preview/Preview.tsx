import React from "react";

type Props = {
    src: string;
    href: string;
};

const Preview: React.FC<Props> = ({ src, href }) => {
    return (
        <div className="my-4">
            <a
                title="post preview"
                href={href}
                target="_blank"
                rel="noreferrer"
            >
                <figure className="flex overflow-clip max-w-2xl max-h-[40rem] mt-4 mx-auto rounded-xl drop-shadow-lg bg-neutral-700">
                    <img
                        alt="post preview"
                        src={src}
                        className="block object-contain mx-auto"
                    />
                </figure>
            </a>
        </div>
    );
};

export default Preview;

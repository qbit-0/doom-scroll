import React from "react";

type Props = {
    src: string;
    href: string;
};

const ImagePreview: React.FC<Props> = ({ src, href }) => {
    return (
        <figure className="flex overflow-clip max-w-2xl min-h-[20rem] max-h-[40rem] mx-auto rounded-xl drop-shadow-lg bg-neutral-700">
            <img
                alt="post body"
                src={src}
                className="block object-contain mx-auto"
            />
            <div className="absolute bottom-0 w-full px-8 p-2 backdrop-blur-3xl backdrop-brightness-50">
                <a title="link" href={href} target="_blank" rel="noreferrer">
                    <p className="underline text-sm text-amber-100 overflow-auto">
                        {href}
                    </p>
                </a>
            </div>
        </figure>
    );
};

export default ImagePreview;

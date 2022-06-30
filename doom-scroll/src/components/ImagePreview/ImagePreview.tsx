import React from "react";

type Props = {
    src: string;
    href: string;
};

const ImagePreview: React.FC<Props> = ({ src, href }) => {
    return (
        <figure className="flex overflow-clip max-w-2xl min-h-[10rem] max-h-[40rem] mx-auto drop-shadow-lg bg-neutral-800">
            <img
                className="block object-contain mx-auto"
                alt="post body"
                src={src}
            />
            <div className="invisible sm:visible absolute bottom-0 w-full backdrop-blur-md">
                <a title="link" href={href} target="_blank" rel="noreferrer">
                    <p className="px-8 py-2 underline text-sm text-amber-100 overflow-ellipsis">
                        {href}
                    </p>
                </a>
            </div>
        </figure>
    );
};

export default ImagePreview;

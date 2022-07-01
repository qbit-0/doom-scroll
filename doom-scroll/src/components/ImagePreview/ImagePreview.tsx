import React from "react";

type Props = {
    src: string;
    href: string;
};

const ImagePreview: React.FC<Props> = ({ src, href }) => {
    return (
        <figure className="flex max-h-[25rem] min-h-[10rem] overflow-clip bg-neutral-800 drop-shadow-lg">
            <img
                className="mx-auto block object-contain"
                alt="post body"
                src={src}
            />
            <div className="invisible absolute bottom-0 w-full backdrop-blur-md backdrop-brightness-50 sm:visible">
                <a title="link" href={href} target="_blank" rel="noreferrer">
                    <p className="overflow-ellipsis px-8 py-2 text-sm text-amber-100 underline">
                        {href}
                    </p>
                </a>
            </div>
        </figure>
    );
};

export default ImagePreview;

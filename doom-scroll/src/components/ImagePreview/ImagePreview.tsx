import React from "react";

type Props = {
    src: string;
    href: string;
};

const ImagePreview: React.FC<Props> = ({ src, href }) => {
    return (
        <figure className="leading-none drop-shadow-lg">
            <img className="max-h-96" alt="post body" src={src} />
            <div className="invisible absolute bottom-0 w-full backdrop-blur-md backdrop-brightness-50 sm:visible">
                <a
                    title="link"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-auto"
                >
                    <p className="overflow-hidden overflow-ellipsis px-8 py-2 text-sm text-amber-100 underline">
                        {href}
                    </p>
                </a>
            </div>
        </figure>
    );
};

export default ImagePreview;

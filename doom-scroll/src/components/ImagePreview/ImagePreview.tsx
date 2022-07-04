import React from "react";

type Props = {
    src: string;
    href: string;
};

const ImagePreview: React.FC<Props> = ({ src, href }) => {
    return (
        <figure className="leading-none drop-shadow-lg">
            <a
                title="link"
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group"
            >
                <img className="max-h-[40rem]" alt="post body" src={src} />
                <div className="invisible absolute bottom-0 w-full backdrop-blur-md backdrop-brightness-50 group-hover:visible">
                    <p className="overflow-hidden overflow-ellipsis px-8 py-2 text-sm text-neutral-50 underline">
                        {href}
                    </p>
                </div>
            </a>
        </figure>
    );
};

export default ImagePreview;

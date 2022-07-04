import ImagePreview from "components/ImagePreview/ImagePreview";
import React, { FC } from "react";

type Props = {
    srcs: string[];
};

const Gallery: FC<Props> = ({ srcs }) => {
    return (
        <div className="w-full overflow-x-auto whitespace-nowrap">
            {srcs.map((src, index) => {
                return (
                    <div className="inline-flex max-w-[90%]" key={index}>
                        <ImagePreview src={src} href={src} />
                    </div>
                );
            })}
        </div>
    );
};

export default Gallery;

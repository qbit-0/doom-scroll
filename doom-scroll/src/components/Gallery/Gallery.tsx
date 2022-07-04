import ImagePreview from "components/ImagePreview/ImagePreview";
import React, { FC } from "react";

type Props = {
    srcs: string[];
};

const Gallery: FC<Props> = ({ srcs }) => {
    return (
        <div className="w-full overflow-x-auto overflow-y-clip whitespace-nowrap">
            {srcs.map((src, index) => {
                return (
                    <div className="inline-flex h-full max-w-[95%]" key={index}>
                        <ImagePreview src={src} href={src} />
                    </div>
                );
            })}
        </div>
    );
};

export default Gallery;

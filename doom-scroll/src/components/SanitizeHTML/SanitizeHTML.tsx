import React from "react";
import DOMPurify from "dompurify";

type Props = {
    dirty: string;
};

const SanitizeHTML: React.FC<Props> = ({ dirty }) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(dirty, {
                    ADD_TAGS: ["iframe"],
                    ADD_ATTR: [
                        "allow",
                        "allowfullscreen",
                        "frameborder",
                        "scrolling",
                    ],
                }),
            }}
            className="unreset text-neutral-50"
        />
    );
};

export default SanitizeHTML;

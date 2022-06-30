import React from "react";
import sanitizeHtml from "sanitize-html";

type Props = {
    dirty: string;
};

const sanitize = (dirty: string) => {
    return dirty;
    // return sanitizeHtml(dirty);
};

const SanitizeHTML: React.FC<Props> = ({ dirty }) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: sanitize(dirty),
            }}
            className="text-amber-100"
        />
    );
};

export default SanitizeHTML;

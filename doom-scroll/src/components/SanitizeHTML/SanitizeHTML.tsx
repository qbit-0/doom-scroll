import React from "react";
import sanitizeHtml from "sanitize-html";

type Props = {
    dirty: string;
};

const SanitizeHTML: React.FC<Props> = ({ dirty }) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: sanitizeHtml(dirty),
            }}
            className="text-amber-100"
        />
    );
};

export default SanitizeHTML;
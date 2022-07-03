import React from "react";
import DOMPurify from "dompurify";

type Props = {
    dirty: string;
};

const SanitizeHTML: React.FC<Props> = ({ dirty }) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(dirty),
            }}
            className="unreset text-amber-100"
        />
    );
};

export default SanitizeHTML;

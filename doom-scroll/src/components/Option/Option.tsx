import React, { FC } from "react";

type Props = {
    value: string | number;
    children: React.ReactNode;
};

const Option: FC<Props> = ({ value, children }) => {
    return (
        <option value={value} className="bg-neutral-800">
            {children}
        </option>
    );
};

export default Option;

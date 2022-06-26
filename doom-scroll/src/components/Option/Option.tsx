import React, { ReactNode } from "react";

type Props = {
  value: string | number;
  children: ReactNode;
};

const Option: React.FC<Props> = ({ value, children }) => {
  return (
    <option value={value} className="bg-zinc-900">
      {children}
    </option>
  );
};

export default Option;

import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEventHandler, MouseEventHandler } from "react";
import { KeyboardEventHandler } from "react";

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
};

const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  onKeyDown,
  onSubmit,
}) => {
  return (
    <div className="inline-block border-2 border-amber-100 rounded-2xl">
      <input
        type="text"
        placeholder="Search Term"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="text-amber-100 p-2 rounded-l-2xl bg-gray-900 font-bold placeholder:font-thin"
      />
      <button
        onClick={onSubmit}
        className="p-2 rounded-r-2xl decoration-gray-600 decoration-4 transition-all font-bold"
      >
        <FontAwesomeIcon icon={solid("magnifying-glass")} />
      </button>
    </div>
  );
};

export default SearchBar;

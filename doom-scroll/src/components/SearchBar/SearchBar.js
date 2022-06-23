import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchBar = ({ value, onChange, onSubmit }) => {
  return (
    <div className="inline-block border-2 border-amber-100 rounded-2xl">
      <input
        type="text"
        placeholder="Search Term"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            onSubmit();
          }
        }}
        className="text-amber-100 p-2 rounded-l-2xl bg-gray-900 font-bold placeholder:font-thin"
      />
      <button
        onClick={onSubmit}
        className="p-2 rounded-r-2xl decoration-gray-600 decoration-4 transition-all font-bold"
      >
        <FontAwesomeIcon icon={solid("magnifying-glass")}/>
      </button>
    </div>
  );
};

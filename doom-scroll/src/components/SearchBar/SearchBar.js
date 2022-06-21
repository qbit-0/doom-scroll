export const SearchBar = ({ value, onChange, onSubmit }) => {
  return (
    <div className="inline-block">
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
        className="text-amber-100 p-2 border-y-2 border-l-2 border-amber-100 rounded-l-2xl bg-gray-900"
      />
      <button
        onClick={onSubmit}
        className="p-2 border-2 border-amber-100 rounded-r-2xl decoration-gray-600 decoration-4 transition-all"
      >
        Search
      </button>
    </div>
  );
};

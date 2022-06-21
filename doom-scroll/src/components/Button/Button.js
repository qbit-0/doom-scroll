export const Button = ({ highlight, onClick, children }) => {
  if (highlight) {
    return (
      <button
        onClick={onClick}
        type="button"
        className="p-2 border-2 border-amber-100 rounded-2xl decoration-gray-600 decoration-4 transition-all bg-gray-700"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className="p-2 border-2 border-amber-100 rounded-2xl decoration-gray-600 decoration-4 transition-all"
    >
      {children}
    </button>
  );
};

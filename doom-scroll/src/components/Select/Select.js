export const Select = ({ onChange, value, children }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="p-2 border-2 border-amber-100 rounded-2xl bg-transparent text-amber-100 font-bold"
    >
      {children}
    </select>
  );
};

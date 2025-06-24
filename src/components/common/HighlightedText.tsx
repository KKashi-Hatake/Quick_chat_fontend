export const HighlightedText = ({ name, search }: { name: string; search: string }) => {
  if (!search) return <>{name}</>;

  const index = name.toLowerCase().indexOf(search.toLowerCase());

  if (index === -1) return <>{name}</>;

  const before = name.slice(0, index);
  const match = name.slice(index, index + search.length);
  const after = name.slice(index + search.length);

  return (
    <>
      {before}
      <span className="text-blue-500">{match}</span>
      {after}
    </>
  );
}

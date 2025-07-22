function MonsterImage({ imageUrl }) {
  if (!imageUrl) return null;

  //styling unabhängig vom Form an
  return (
    <div className="mt-4">
      <img
        src={imageUrl}
        alt="Generated Monster"
        className="rounded-lg shadow-lg w-full"
      />
    </div>
  );
}

export default MonsterImage;

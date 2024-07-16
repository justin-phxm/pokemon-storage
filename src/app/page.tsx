import BlockGrid from "./components/BlockGrid";
import { type Block } from "./types";
import { pokemons } from "./pokemons";
import BlockBox from "./components/BlockBox";
export default function HomePage() {
  const blocks: Partial<Block>[] = Array.from({ length: 5 }, () => {
    const randomColor = Math.floor(Math.random() * 0xffffff).toString(16);
    const pokemonImage = pokemons[3];
    console.log(pokemonImage);
    return {
      name: `#${randomColor}`,
      color: `#${randomColor}`,
      pokemonImage: pokemonImage,
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <BlockGrid />
        <br />
        <div className="mt-1 grid grid-cols-5 gap-4">
          {blocks.map((block, index) => {
            return <BlockBox block={block} key={index} />;
          })}
        </div>
      </div>
    </main>
  );
}

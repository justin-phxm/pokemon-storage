import PokemonStorageBox from "./components/PokemonStorageBox";
import { pokemons } from "./pokemons";
import Party from "./components/Party";
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-4xl font-bold">PokeDungeon</h1>
        <PokemonStorageBox />
        <div className="mt-1 grid grid-cols-6 gap-4">
          {pokemons.map((pokemon, index) => {
            return <Party pokemon={pokemon} key={index} />;
          })}
        </div>
      </div>
    </main>
  );
}

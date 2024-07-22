import { pokemons } from "@/pokemons";
import Party from "@/components/Party";
import PokemonStorageContainer from "@/components/PokemonStorageContainer";
import SearchPokemon from "./components/SearchPokemon";
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col items-center justify-center gap-6 py-8">
        <h1 className="text-4xl font-bold">PokeDungeon</h1>
        <h2 className="text-xl font-semibold">
          Drag a Pokemon from your party to your box!
        </h2>
        <h2 className="text-xl font-semibold">
          Right click Pokemon to view their pokedex entry!
        </h2>
        <div className="flex gap-20">
          <SearchPokemon />
          <div className="grid grid-rows-6">
            {pokemons.map((pokemon, index) => {
              return <Party pokemon={pokemon} key={index} />;
            })}
          </div>
          <PokemonStorageContainer />
        </div>
      </div>
    </main>
  );
}

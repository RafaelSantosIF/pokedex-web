import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import { fetchPokemonList, type Pokemon } from "@/api";
import LoadingScreen from "@/components/LoadingScreen";
import Pokeball from "@/components/Pokeball";
import PokedexScreen from "@/modules/pokedex/PokedexScreen";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-400.woff2", weight: "400" },
    { path: "./fonts/poppins-500.woff2", weight: "500" },
    { path: "./fonts/poppins-600.woff2", weight: "600" },
    { path: "./fonts/poppins-700.woff2", weight: "700" },
    { path: "./fonts/poppins-800.woff2", weight: "800" },
  ],
});

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Os 151 Pokémon da primeira geração.",
};

async function PokemonList() {
  let pokemons: Pokemon[] = [];
  let error: string | null = null;
  try {
    pokemons = await fetchPokemonList();
  } catch {
    error = "Não foi possível carregar os Pokémon. Verifique sua internet.";
  }

  return (
    <>
      <LoadingScreen done />
      <PokedexScreen pokemons={pokemons} error={error} />
    </>
  );
}

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <Pokeball className="watermark" />

        <div className="page">
          <Suspense fallback={<LoadingScreen />}>
            <PokemonList />
          </Suspense>
          {children}
        </div>
      </body>
    </html>
  );
}

import { useEffect, useState } from "react";
import { fetchPokemon, type Pokemon } from "@/api";

export function usePokemonViewModel(id: number) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shiny, setShiny] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPokemon() {
      setLoading(true);
      setError(null);
      setPokemon(null);
      setShiny(false);

      try {
        const data = await fetchPokemon(id);
        if (!cancelled) {
          setPokemon(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Não foi possível carregar o Pokémon.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPokemon();
    return () => {
      cancelled = true;
    };
  }, [id]);

  function toggleShiny() {
    setShiny((current) => !current);
  }

  return { pokemon, loading, error, shiny, toggleShiny };
}

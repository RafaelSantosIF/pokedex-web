import { useState } from "react";
import { useParams } from "next/navigation";
import type { Pokemon } from "@/api";

const PAGE_SIZE = 24;

export function usePokedexViewModel(pokemons: Pokemon[]) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const params = useParams();
  const selectedId = Number(params.id);

  const text = search.trim().toLowerCase();

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name.includes(text);
    const matchesType =
      selectedType === "" || pokemon.types.includes(selectedType);
    return matchesName && matchesType;
  });

  const visiblePokemons = filteredPokemons.slice(0, visibleCount);
  const hasMore = filteredPokemons.length > visibleCount;

  function showMore() {
    setVisibleCount(visibleCount + PAGE_SIZE);
  }

  return {
    search,
    setSearch,
    selectedType,
    setSelectedType,
    filteredPokemons,
    visiblePokemons,
    hasMore,
    showMore,
    selectedId,
  };
}

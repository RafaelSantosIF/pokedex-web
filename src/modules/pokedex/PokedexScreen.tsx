"use client";

import type { Pokemon } from "@/api";
import PokemonCard from "@/components/PokemonCard";
import Pokeball from "@/components/Pokeball";
import { TYPE_NAMES, typeInfo } from "@/utils";
import styles from "./PokedexScreen.module.css";
import { usePokedexViewModel } from "./usePokedexViewModel";

type Props = {
  pokemons: Pokemon[];
  error: string | null;
};

function SearchIcon() {
  return (
    <span className={styles.searchIcon}>
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="white"
          strokeWidth="2.2"
        />
        <path d="M3 12h6M15 12h6" stroke="white" strokeWidth="2.2" />
        <circle
          cx="12"
          cy="12"
          r="3"
          fill="none"
          stroke="white"
          strokeWidth="2.2"
        />
      </svg>
    </span>
  );
}

export default function PokedexScreen({ pokemons, error }: Props) {
  const {
    search,
    setSearch,
    selectedType,
    setSelectedType,
    filteredPokemons,
    visiblePokemons,
    hasMore,
    showMore,
    selectedId,
  } = usePokedexViewModel(pokemons);

  return (
    <section>
      <div className={styles.toolbarWrap}>
        <header className={styles.toolbar}>
          <div className={styles.logo}>
            <Pokeball size={34} />
            Pokédex
          </div>

          <div className={styles.searchBar}>
            <input
              className={styles.input}
              type="search"
              placeholder="Buscar Pokémon pelo nome"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon />
          </div>

          <p className={styles.count}>
            <strong>{filteredPokemons.length}</strong> Pokémon
          </p>
        </header>
      </div>

      <div className={styles.types}>
        <button
          className={
            selectedType === ""
              ? `${styles.chip} ${styles.chipAll}`
              : styles.chip
          }
          onClick={() => setSelectedType("")}
        >
          Todos
        </button>

        {TYPE_NAMES.map((type) => {
          const info = typeInfo(type);
          const active = selectedType === type;
          return (
            <button
              key={type}
              className={
                active ? `${styles.chip} ${styles.chipActive}` : styles.chip
              }
              style={active ? { backgroundColor: info.color } : undefined}
              onClick={() => setSelectedType(type)}
            >
              <span
                className={styles.dot}
                style={{ backgroundColor: info.color }}
              />
              {info.label}
            </button>
          );
        })}
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      {filteredPokemons.length === 0 && !error ? (
        <div className={styles.empty}>
          <Pokeball size={56} className={styles.emptyIcon} />
          <p>Nenhum Pokémon encontrado.</p>
        </div>
      ) : null}

      <div className={styles.grid}>
        {visiblePokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            selected={pokemon.id === selectedId}
          />
        ))}
      </div>

      {hasMore ? (
        <button className={styles.moreButton} onClick={showMore}>
          <Pokeball size={22} />
          Ver mais
        </button>
      ) : null}
    </section>
  );
}

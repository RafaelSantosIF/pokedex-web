"use client";

import Image from "next/image";
import Link from "next/link";
import { TOTAL_POKEMON } from "@/api";
import AbilityList from "@/components/AbilityList";
import InfoBox from "@/components/InfoBox";
import Modal from "@/components/Modal";
import Pokeball from "@/components/Pokeball";
import StatBar from "@/components/StatBar";
import TypeBadge from "@/components/TypeBadge";
import {
  formatHeight,
  formatName,
  formatNumber,
  formatWeight,
  typeInfo,
} from "@/utils";
import styles from "./PokemonScreen.module.css";
import { usePokemonViewModel } from "./usePokemonViewModel";

type Props = {
  id: number;
};

export default function PokemonScreen({ id }: Props) {
  const { pokemon, loading, error, shiny, toggleShiny } =
    usePokemonViewModel(id);

  if (loading) {
    return (
      <Modal>
        <div className={styles.center}>
          <Pokeball size={56} className={styles.spinner} />
          <p className={styles.muted}>Carregando Pokémon...</p>
        </div>
      </Modal>
    );
  }

  if (error || !pokemon) {
    return (
      <Modal>
        <div className={styles.center}>
          <span className={styles.errorIcon}>!</span>
          <p className={styles.errorText}>{error}</p>
          <Link href="/" className={styles.backButton}>
            ← Voltar para a lista
          </Link>
        </div>
      </Modal>
    );
  }

  const color = typeInfo(pokemon.types[0]).color;

  let total = 0;
  for (const stat of pokemon.stats) {
    total = stat.value;
  }

  return (
    <Modal>
      <div className={styles.content}>
        <div className={styles.hero} style={{ backgroundColor: color }}>
          <Pokeball size={260} className={styles.heroPokeball} />
          <button
            className={
              shiny ? `${styles.shiny} ${styles.shinyOn}` : styles.shiny
            }
            onClick={toggleShiny}
          >
            ✨ Shiny
          </button>
          <Image
            className={styles.image}
            src={shiny ? pokemon.shinyImage : pokemon.image}
            alt={formatName(pokemon.name)}
            width={240}
            height={240}
            loading="eager"
          />
          <p className={styles.number}>{formatNumber(pokemon.id)}</p>
          <h1 className={styles.name}>{formatName(pokemon.name)}</h1>
          <div className={styles.types}>
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>

        <div className={styles.details}>
          <h2 className={styles.section}>Habilidades</h2>
          <AbilityList abilities={pokemon.abilities} />

          <div className={styles.infoGrid}>
            <InfoBox label="Altura" value={formatHeight(pokemon.height)} />
            <InfoBox label="Peso" value={formatWeight(pokemon.weight)} />
            <InfoBox label="Exp. base" value={String(pokemon.baseExperience)} />
          </div>

          <h2 className={styles.section}>Status base</h2>
          <div className={styles.stats}>
            {pokemon.stats.map((stat) => (
              <StatBar key={stat.name} stat={stat} />
            ))}
          </div>
          <div className={styles.total}>
            <span>Total</span>
            <strong>{total}</strong>
          </div>

          <nav className={styles.nav}>
            {pokemon.id > 1 ? (
              <Link
                href={`/pokemon/${pokemon.id - 1}`}
                className={styles.navLink}
              >
                ← {formatNumber(pokemon.id - 1)}
              </Link>
            ) : null}
            {pokemon.id < TOTAL_POKEMON ? (
              <Link
                href={`/pokemon/${pokemon.id + 1}`}
                className={`${styles.navLink} ${styles.navNext}`}
              >
                {formatNumber(pokemon.id + 1)} →
              </Link>
            ) : null}
          </nav>
        </div>
      </div>
    </Modal>
  );
}

import PokemonScreen from "@/modules/pokemon/PokemonScreen";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PokemonPage({ params }: Props) {
  const { id } = await params;
  return <PokemonScreen id={Number(id)} />;
}

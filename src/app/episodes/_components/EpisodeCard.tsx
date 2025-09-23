'use client';
import CharacterItem from "./CharacterItem";
import { useMemo } from "react";
import { EpisodeCardProps } from "@/app/api/Episode";


export default function EpisodeCard({
  episode,
  isFavorite,
  likeEpisode,
  removeEpisode,}: EpisodeCardProps) {

const characterIds = useMemo(() => { // useMemo para no recalcular en cada render los ids
  const characterUrlsOrObjects = episode.characters as (string | { id: number })[];

  const ids = characterUrlsOrObjects
    .map((character) => {
      if (typeof character === "string") {
        const lastSegment = character.split("/").pop();
        return lastSegment ? Number(lastSegment) : undefined;
      }
      if ("id" in character) {
        return character.id;
      }
      return undefined;
    })
    .filter((id): id is number => typeof id === "number")
    .slice(0, 5);

  return ids;
}, [episode]);

  return (
    <div className="episode-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="episode-title" style={{ margin: 0 }}>{episode.name}</h2>
        <p className="episode-date" style={{ margin: 0 }}>Fecha del episodio: {episode.air_date}</p>
      </div>
      <div className="episode-characters">
        {characterIds.map((id_char) => (
          <CharacterItem key={id_char} id={id_char} />
        ))}
      </div>
           <div className="episode-buttons">
        <button
          type="button"
          className="btn-favorite-add"
          onClick={likeEpisode}
          disabled={isFavorite}
          aria-disabled={isFavorite}
        >
          Añadir a Favoritos
        </button>

        <button
          type="button"
          className="btn-favorite-remove"
          onClick={removeEpisode}
          disabled={!isFavorite}
          aria-disabled={!isFavorite}
        >
          Eliminar de Favoritos
        </button>
      </div>
    </div>
  );
}
'use client'

import { Episode } from "../../api/Episode";
import EpisodeCard from "./EpisodeCard";

export default function FavoritesList({
  episodes,
  favoriteIds,
  removeEpisode,
    }: {
   
  // esto es lo que recibe el componente desde page.tsx  
  episodes: Episode[];
  favoriteIds: number[];
  removeEpisode: (id: number) => void;
    }) {
  const favorites = episodes.filter((ep) => favoriteIds.includes(ep.id));
  if (favorites.length === 0) return <p className="favorites-empty">No hay favoritos por ahora.</p>;

  return (
    <section className="favorites-section">
      <h2 className="favorites-title">Favoritos</h2>
      <div className="favorites-container">
        {favorites.map((episode) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            isFavorite={true}
            likeEpisode={() => {}}
            removeEpisode={() => removeEpisode(episode.id)}
          />
        ))}
      </div>
    </section>
  );
}

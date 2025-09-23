'use client'
import {Episode} from '../../api/Episode'
import EpisodeCard from './EpisodeCard'
// rafc 
import React from 'react'

export const EpisodesList = ({
  episodes,
  isLoading,
  error,
  favoriteIds,
  likeEpisode,
  removeEpisode,
  }: {
    // esto es lo que recibe el componente desde page.tsx
  episodes: Episode[];
  isLoading: boolean;
  error: string | null;
  favoriteIds: number[];
  likeEpisode: (id: number) => void;
  removeEpisode: (id: number) => void;

  } ) => {

  return (
    <section className="episodes-section">
      <h2 className="episodes-title">Episodes</h2>
      {isLoading ? (
        <p className="episodes-loading">Cargando...</p>
      ) : error ? (
        <p className="episodes-error">Error: {error}</p>
      ) : (
        <div className="episodes-container">
          {episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              isFavorite={favoriteIds.includes(episode.id)}
              likeEpisode={() => likeEpisode(episode.id)}
              removeEpisode={() => removeEpisode(episode.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
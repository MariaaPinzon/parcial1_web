'use client'
import { useEffect, useState } from "react";
import { Episode } from "../api/Episode";
import { EpisodesList } from "./_components/EpisodesList";
import FavoritesList from "./_components/FavoritesList";
import EpisodeForm from './ui/CreateEpisodeForm';
import { EpisodeFormData } from './validation/episodeSchema';
import { toast } from "sonner";


export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const LS_KEY = "favoriteEpisodes";

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("https://rickandmortyapi.com/api/episode");
        const data = await response.json();
        setEpisodes(data.results as Episode[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocurrió un error desconocido.");
      } finally {
        setIsLoading(false);
      }
    };
    loadEpisodes();
  }, []);

  // cargar favoritos desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as number[];
        if (Array.isArray(parsed)) setFavoriteIds(parsed);
      }
    } catch {}
  }, []);

const likeEpisode = (id: number) => {
  const newFav = Array.from(new Set([...favoriteIds, id]));
  setFavoriteIds(newFav);
  localStorage.setItem(LS_KEY, JSON.stringify(newFav));
  toast.success("Episodio añadido a favoritos");
};

const removeEpisode = (id: number) => {
  const newFav = favoriteIds.filter((x) => x !== id);
  setFavoriteIds(newFav);
  localStorage.setItem(LS_KEY, JSON.stringify(newFav));
  toast.error("Episodio eliminado de favoritos");
};
const handleCreateEpisode = async (data: EpisodeFormData) => {
    const now = new Date();

    const nextId =
      episodes.length > 0 ? Math.max(...episodes.map((e) => e.id)) + 1 : 1;

    const baseCharacterUrl = 'https://rickandmortyapi.com/api/character';
    const characterIds = data.characters.split('-').map((x) => Number(x.trim()));
    const characterUrls = characterIds.map((id) => `${baseCharacterUrl}/${id}`);

      const newEpisode: Episode = {
        id: nextId,
        name: data.name,
        air_date: now.toDateString(),
        episode: "S00E00",
        characters: characterUrls,
        url: `https://rickandmortyapi.com/api/episode/${nextId}`,
        created: now.toISOString(),
      };


    setEpisodes((prev) => [newEpisode, ...prev]);
    toast.success('Episodio guardado correctamente');
  };


  return (
    <main className="episodes-main">
      <div className="episodes-grid">
        {/* Izquierda */}
        <EpisodesList
          episodes={episodes}
          isLoading={isLoading}
          error={error}
          favoriteIds={favoriteIds}
          likeEpisode={likeEpisode}
          removeEpisode={removeEpisode}
        />

        {/* Derecha: mitad arriba Favoritos, mitad abajo Form */}
        <aside className="episodes-right">
          <div className="panel-scroll">
            <FavoritesList
              episodes={episodes}
              favoriteIds={favoriteIds}
              removeEpisode={removeEpisode}
            />
          </div>
          <div className="panel-scroll">
            <h2 className="form-title">Crear un elemento</h2>
            <EpisodeForm
              isSubmitting={false}
              onSubmit={handleCreateEpisode}
            />
          </div>
        </aside>
      </div>
    </main>
  );
}
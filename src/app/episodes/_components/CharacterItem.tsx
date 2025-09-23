"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Character } from "@/app/api/Episode";

export default function CharacterItem({ id }: { id: number }) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await res.json();
        setCharacter(data as Character);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocurrió un error desconocido.");
      } finally {
        setIsLoading(false);
      }
    };
    loadCharacter();
  }, [id]);

 return (
    <div>
      {isLoading && (
        <div className="character-loading" />
      )}

      {!isLoading && (error || !character) && (
        <div className="character-error">Error</div>
      )}

      {!isLoading && !error && character && (
        <div className="character-item">
          <Image
            src={character.image}
            alt={character.name}
            width={56}
            height={56}
            className="character-image"
          />
          <p className="character-name">{character.name}</p>
        </div>
      )}
    </div>
  );
}

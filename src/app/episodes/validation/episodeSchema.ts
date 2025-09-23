import { z } from "zod";

export const episodeSchema = z.object({
  name: z
    .string()
    .min(6, "El título debe tener al menos 6 caracteres"),
  characters: z
    .string()
    .regex(/^\d+-\d+-\d+-\d+-\d+$/, "Formato inválido. Ejemplo: 12-14-1-23-8"),
});

export type EpisodeFormData = z.infer<typeof episodeSchema>;

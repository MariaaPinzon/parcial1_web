'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { episodeSchema, EpisodeFormData } from '../validation/episodeSchema';

interface EpisodeFormProps {
  onSubmit: SubmitHandler<EpisodeFormData>;
  defaultValues?: EpisodeFormData;
  isSubmitting: boolean;
}

export default function EpisodeForm({
      onSubmit,
        defaultValues,
        isSubmitting,
      }: EpisodeFormProps) {
      const {
          register,
          handleSubmit,
          setError,
          reset,
          formState: { errors, isSubmitting: rhfSubmitting, isValid },
        } = useForm<EpisodeFormData>({
          defaultValues: {
            name: '',
            characters: '',
            ...defaultValues,
          },
    resolver: zodResolver(episodeSchema),
    mode: 'onChange', // para  isValid 
  });

  const onSubmitWrapped: SubmitHandler<EpisodeFormData> = async (data) => {
    try {
      //  latencia 
      await new Promise((resolve) => setTimeout(resolve, 600));
      await onSubmit(data);
      reset(); // esto es para limpiar el formulario
    } catch (err) {
      setError('root', { message: err instanceof Error ? err.message : 'Error al guardar' });
    }
  };

    const disabled = !isValid || rhfSubmitting || isSubmitting;


  return (
    <div className="flex flex-col">
      <div className="flex-1" />
      <div className="flex-1 flex items-center justify-center">
        <form className="episode-form" onSubmit={handleSubmit(onSubmitWrapped)}>
          {/* Episode Name */}
          <div className="form-field">
            <label htmlFor="name" className="form-label">
              Nnombre del Episodio
            </label>
            <input
              id="name"
              type="text"
              placeholder="Mínimo 6 caracteres"
              {...register('name', { required: 'Campo requerido' })}
              className="form-input"
            />
            {errors.name && <span className="form-error">{errors.name.message}</span>}
          </div>

          {/* Characters */}
          <div className="form-field">
            <label htmlFor="characters" className="form-label">
              Personajes (IDs separados por guiones)
            </label>
            <input
              id="characters"
              type="text"
              placeholder="Ej: 12-14-1-23-8"
              {...register('characters', { required: 'Campo requerido' })}
              className="form-input"
            />
            {errors.characters && (
              <span className="form-error">{errors.characters.message}</span>
            )}
          </div>

          {errors.root && <span className="form-error">{errors.root.message}</span>}

            <button
            type="submit"
            className="btn-save"
            disabled={disabled}
            aria-disabled={disabled}
          >
            {rhfSubmitting || isSubmitting ? 'Cargando...' : 'Crear'}
          </button>

        </form>
      </div>
      <div className="flex-1" />
    </div>
  );
}

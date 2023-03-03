import * as React from 'react';
import './style.css';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z
  .object({
    password: z.string().min(6, 'A senha precisa ter 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais',
  })
  .transform((fields) => ({
    password: fields.password.toUpperCase(),
    confirmPassword: fields.confirmPassword.toUpperCase(),
  }));

type FormProps = z.infer<typeof schema>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    resolver: zodResolver(schema),
  });

  console.log('erros', errors);

  const handleForm = (data: FormProps) => {
    console.log(data);
  };

  return (
    <div
      style={{ display: 'block', alignItems: 'center', textAlign: 'center' }}
    >
      <h2>Zod</h2>
      <form
        onSubmit={handleSubmit(handleForm)}
        style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
      >
        <input
          type="password"
          {...register('password')}
          style={{ padding: '12px', borderRadius: '8px' }}
          placeholder="senha"
        />
        {errors.password?.message && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.password.message}
          </span>
        )}
        <input
          type="password"
          {...register('confirmPassword')}
          style={{ padding: '12px', borderRadius: '8px' }}
          placeholder="confirme sua senha"
        />
        {errors.confirmPassword?.message && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.confirmPassword.message}
          </span>
        )}
        <button type="submit" style={{ padding: '12px', width: '150px' }}>
          Enviar
        </button>
      </form>
    </div>
  );
}

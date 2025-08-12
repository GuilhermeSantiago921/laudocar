// Este ficheiro é obrigatório para o App Router funcionar.
// Ele define a estrutura HTML base de todas as páginas.

// Importa a fonte 'Poppins' para ser usada no site.
import { Poppins } from 'next/font/google';
// Importa o ficheiro de estilos globais do Tailwind CSS.
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata = {
  title: 'Laudocar - Consultas Veiculares',
  description: 'Consulte o histórico completo de qualquer veículo de forma rápida e confiável.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}

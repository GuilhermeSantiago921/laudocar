'use client';

import { useState, useEffect } from 'react';

// Este componente é apenas para a parte visual do site.
// Toda a lógica de API foi removida.

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  // Efeito para mudar a cor do header ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Para que o visual funcione, certifique-se que o Tailwind CSS está configurado no seu projeto.
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* O <Head> foi removido daqui e agora é gerido pelo layout.js */}

      {/* Header e Navegação */}
      <header className={`fixed top-0 left-0 w-full z-50 text-white shadow-md transition-colors duration-300 ${headerScrolled ? 'bg-blue-900' : 'bg-blue-900/80 backdrop-blur-sm'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold">Laudocar</a>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#planos" className="hover:text-yellow-400">Planos</a>
            <a href="#como-funciona" className="hover:text-yellow-400">Como Funciona</a>
            <a href="#contato" className="hover:text-yellow-400">Contato</a>
            <a href="#" className="hover:text-yellow-400 text-xl">🛒</a>
          </nav>
          <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-blue-900 text-center space-y-4 py-4">
            <a href="#planos" className="block hover:text-yellow-400 py-2">Planos</a>
            <a href="#como-funciona" className="block hover:text-yellow-400 py-2">Como Funciona</a>
            <a href="#contato" className="block hover:text-yellow-400 py-2">Contato</a>
            <a href="#" className="block hover:text-yellow-400 py-2">Carrinho</a>
          </nav>
        )}
      </header>

      <main>
        {/* Seção Principal (Hero) */}
        <section
          id="inicio"
          className="min-h-screen bg-cover bg-center flex items-center justify-center text-white"
          style={{ backgroundImage: "linear-gradient(rgba(0, 85, 164, 0.8), rgba(0, 85, 164, 0.8)), url('https://autocredcardesevolvimento.com.br/wp-content/uploads/2025/08/Gemini_Generated_Image_yki723yki723yki7.png')" }}
        >
          <div className="text-center p-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">A segurança de um bom negócio começa aqui.</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Consulte o histórico completo de qualquer veículo de forma rápida e confiável. Evite fraudes e prejuízos.
            </p>
            {/* Formulário apenas visual */}
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="text"
                placeholder="Digite a placa"
                maxLength="7"
                className="px-6 py-3 rounded-lg text-gray-800 w-full sm:w-80 focus:ring-4 focus:ring-yellow-400/50 focus:outline-none"
              />
              <button type="submit" className="px-8 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors">
                Consultar
              </button>
            </form>
          </div>
        </section>

        {/* Seção de Planos */}
        <section id="planos" className="py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-blue-900 mb-4">Nossas Consultas</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">Escolha o plano ideal para a sua necessidade.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Plano 1 */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gray-200">
                        <h3 className="text-2xl font-bold mb-4">Consulta Básica</h3>
                        <p className="text-4xl font-extrabold mb-6">R$29<span className="text-xl">,90</span></p>
                        <ul className="space-y-3 text-left mb-8">
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Dados Cadastrais</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Restrições</li>
                            <li className="flex items-center"><span className="text-red-400 mr-2">✗</span> Roubo e Furto</li>
                        </ul>
                        <a href="#" className="block w-full py-3 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900">Contratar</a>
                    </div>
                    {/* Plano 2 - Destaque */}
                    <div className="bg-blue-900 text-white p-8 rounded-xl shadow-2xl transform md:scale-105 border-t-4 border-yellow-400">
                        <h3 className="text-2xl font-bold mb-4">Consulta Completa</h3>
                        <p className="text-4xl font-extrabold mb-6">R$49<span className="text-xl">,90</span></p>
                        <ul className="space-y-3 text-left mb-8">
                            <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Todos os itens da Básica</li>
                            <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Histórico de Roubo e Furto</li>
                            <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Indício de Sinistro</li>
                        </ul>
                        <a href="#" className="block w-full py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-500">Contratar</a>
                    </div>
                    {/* Plano 3 */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gray-200">
                        <h3 className="text-2xl font-bold mb-4">Consulta Premium</h3>
                        <p className="text-4xl font-extrabold mb-6">R$69<span className="text-xl">,90</span></p>
                        <ul className="space-y-3 text-left mb-8">
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Todos os itens da Completa</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Histórico de Leilão</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Análise de Chassi</li>
                        </ul>
                        <a href="#" className="block w-full py-3 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900">Contratar</a>
                    </div>
                </div>
            </div>
        </section>

        {/* Seção Como Funciona */}
        <section id="como-funciona" className="py-20 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-blue-900 mb-4">Simples, Rápido e Online</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">Em apenas 3 passos você tem acesso ao relatório completo.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col items-center">
                        <div className="bg-yellow-400 text-blue-900 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-4">1</div>
                        <h3 className="text-xl font-bold mb-2">Informe a Placa</h3>
                        <p>Digite a placa do veículo que deseja consultar no campo principal.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-yellow-400 text-blue-900 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-4">2</div>
                        <h3 className="text-xl font-bold mb-2">Faça o Pagamento</h3>
                        <p>Escolha o plano e pague de forma segura com cartão de crédito ou Pix.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-yellow-400 text-blue-900 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-4">3</div>
                        <h3 className="text-xl font-bold mb-2">Receba o Relatório</h3>
                        <p>O relatório completo é gerado instantaneamente e enviado para seu e-mail.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Rodapé */}
        <footer id="contato" className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-6 text-center">
                <p className="text-2xl font-bold mb-4">Laudocar</p>
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="#planos" className="hover:text-yellow-400">Planos</a>
                    <a href="#como-funciona" className="hover:text-yellow-400">Como Funciona</a>
                    <a href="#contato" className="hover:text-yellow-400">Contato</a>
                </div>
                <p>&copy; {new Date().getFullYear()} Laudocar. Todos os direitos reservados.</p>
            </div>
        </footer>
      </main>
    </div>
  );
}

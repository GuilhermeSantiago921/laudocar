'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

// Ícones do Font Awesome (exemplo)
import { FaShoppingCart, FaBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Componente principal da página
export default function HomePage() {
  const [placa, setPlaca] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  // Efeito para o header com scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Função para lidar com a consulta da placa
  const handleConsultaPlaca = async (e) => {
    e.preventDefault();
    if (placa.length < 7) {
      setError('Por favor, digite uma placa válida.');
      setResultado(null);
      return;
    }
    setLoading(true);
    setError('');
    setResultado(null);

    try {
      // CHAMADA CORRETA PARA A API NEXT.JS
      const response = await fetch('/api/consultar-placa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placa }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao consultar a placa.');
      }

      setResultado(`Modelo: ${data.marca} ${data.modelo}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com o processo de compra
  const handleComprar = async (priceId) => {
      if (placa.length < 7) {
          alert('Por favor, consulte uma placa antes de contratar.');
          return;
      }
      
      setLoading(true);
      setError('');
      try {
          // CHAMADA CORRETA PARA A API DE CHECKOUT
          const response = await fetch('/api/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ priceId: priceId, placa: placa }),
          });

          const { url } = await response.json();
          if (url) {
              window.location.href = url;
          } else {
              throw new Error('Não foi possível iniciar o pagamento.');
          }
      } catch (err) {
          setError('Erro ao iniciar pagamento: ' + err.message);
      } finally {
        setLoading(false);
      }
  };


  return (
    <div className="bg-gray-50 text-gray-800">
      <Head>
        <title>Laudocar - Consultas Veiculares</title>
        <meta name="description" content="Consulte o histórico completo de qualquer veículo de forma rápida e confiável." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 text-white shadow-md transition-colors duration-300 ${headerScrolled ? 'bg-blue-900' : 'bg-blue-900/80 backdrop-blur-sm'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold">Laudocar</a>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#planos" className="hover:text-yellow-400">Planos</a>
            <a href="#como-funciona" className="hover:text-yellow-400">Como Funciona</a>
            <a href="#contato" className="hover:text-yellow-400">Contato</a>
            <a href="/carrinho" className="hover:text-yellow-400 text-xl">🛒</a>
          </nav>
          <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-blue-900 text-center space-y-4 py-4">
            <a href="#planos" className="block hover:text-yellow-400">Planos</a>
            <a href="#como-funciona" className="block hover:text-yellow-400">Como Funciona</a>
            <a href="#contato" className="block hover:text-yellow-400">Contato</a>
            <a href="/carrinho" className="block hover:text-yellow-400">Carrinho</a>
          </nav>
        )}
      </header>

      <main>
        {/* Seção Hero */}
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
            <form onSubmit={handleConsultaPlaca} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="text"
                value={placa}
                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                placeholder="Digite a placa"
                maxLength="7"
                className="px-6 py-3 rounded-lg text-gray-800 w-full sm:w-80 focus:ring-4 focus:ring-yellow-400/50 focus:outline-none"
              />
              <button type="submit" disabled={loading} className="px-8 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                {loading ? 'Consultando...' : 'Consultar'}
              </button>
            </form>
            <div className="mt-6 text-lg h-8">
                {error && <p className="text-red-300 bg-red-900/50 px-4 py-2 rounded-md">{error}</p>}
                {resultado && <p className="text-yellow-300 bg-blue-900/50 px-4 py-2 rounded-md font-bold">{resultado}</p>}
            </div>
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
                        <button onClick={() => handleComprar('price_XXXX_basico')} className="w-full py-3 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900">Contratar</button>
                    </div>
                    {/* Plano 2 - Destaque */}
                    <div className="bg-blue-900 text-white p-8 rounded-xl shadow-2xl transform scale-105 border-t-4 border-yellow-400">
                        <h3 className="text-2xl font-bold mb-4">Consulta Completa</h3>
                        <p className="text-4xl font-extrabold mb-6">R$49<span className="text-xl">,90</span></p>
                        <ul className="space-y-3 text-left mb-8">
                            <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Todos os itens da Básica</li>
                            <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Histórico de Roubo e Furto</li>
                            <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Indício de Sinistro</li>
                        </ul>
                        <button onClick={() => handleComprar('price_YYYY_completo')} className="w-full py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-500">Contratar</button>
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
                        <button onClick={() => handleComprar('price_ZZZZ_premium')} className="w-full py-3 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900">Contratar</button>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}

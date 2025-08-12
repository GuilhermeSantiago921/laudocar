// Este arquivo lida com a criação de uma sessão de pagamento no Stripe.

// Instale o Stripe: npm install stripe
import Stripe from 'stripe';

// Use a sua chave secreta do Stripe. Guarde-a em variáveis de ambiente!
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'SUA_CHAVE_SECRETA_AQUI');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { priceId, placa } = req.body;

    try {
      // Cria uma sessão de checkout no Stripe
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId, // O ID do preço do seu produto no Stripe
            quantity: 1,
          },
        ],
        mode: 'payment',
        // Salva a placa como metadados no pagamento do Stripe
        payment_intent_data: {
            metadata: {
                placa_consultada: placa,
            },
        },
        // URLs para onde o cliente será redirecionado
        success_url: `${req.headers.origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
      });
      
      res.status(200).json({ url: session.url });

    } catch (err) {
      console.error('Erro ao criar sessão do Stripe:', err);
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Método não permitido');
  }
}

// Salve este código como app/api/checkout/route.js

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Use a sua chave secreta do Stripe. Guarde-a em variáveis de ambiente!
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('*** ERRO FATAL: A chave secreta do Stripe (STRIPE_SECRET_KEY) não está configurada.');
}

// No App Router, a função exportada chama-se POST, GET, etc.
export async function POST(request) {
  try {
    // O corpo do pedido é obtido com request.json()
    const { priceId, placa } = await request.json();

    if (!priceId || !placa) {
      return NextResponse.json({ message: 'ID do preço ou placa não fornecidos.' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;

    // Cria a sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        metadata: {
          placa_consultada: placa,
        },
      },
      success_url: `${baseUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
    });

    // Retorna a URL da sessão de pagamento
    return NextResponse.json({ url: session.url }, { status: 200 });

  } catch (err) {
    console.error('Erro detalhado ao criar sessão do Stripe:', err);
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ message: `Erro do Stripe: ${err.message}` }, { status: err.statusCode || 500 });
    } else {
      return NextResponse.json({ message: 'Ocorreu um erro inesperado no servidor.' }, { status: 500 });
    }
  }
}

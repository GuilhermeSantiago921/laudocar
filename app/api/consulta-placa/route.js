// Salve este código como app/api/consultar-placa/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { placa } = await request.json();

    if (!placa) {
      return NextResponse.json({ message: 'Placa não fornecida.' }, { status: 400 });
    }

    const api_url = 'https://bases.autocredcar.com.br/ApiAutoCredCar/Bases/VeiculosAgregados';
    
    const params = new URLSearchParams();
    params.append('client', '3visao');
    params.append('key', 'ODU0MTE8rTga30NTc4NzQ1');
    params.append('type', 'placa');
    params.append('placa', placa);

    const apiResponse = await fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!apiResponse.ok) {
      throw new Error(`O serviço de consulta retornou um erro: ${apiResponse.statusText}`);
    }

    const data = await apiResponse.json();

    if (data.codigo !== '00' || !data.veiculo) {
        throw new Error(data.mensagem || 'Placa não encontrada ou dados inválidos.');
    }

    return NextResponse.json({
      marca: data.veiculo.marca,
      modelo: data.veiculo.modelo,
    }, { status: 200 });

  } catch (error) {
    console.error('Erro na API de consulta de placa:', error);
    return NextResponse.json({ message: error.message || 'Falha ao consultar a API externa.' }, { status: 500 });
  }
}

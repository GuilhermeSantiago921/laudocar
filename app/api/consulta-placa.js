// Este arquivo lida com a requisição para a API externa de forma segura no servidor.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { placa } = req.body;

  if (!placa) {
    return res.status(400).json({ message: 'Placa não fornecida.' });
  }

  const api_url = 'https://bases.autocredcar.com.br/ApiAutoCredCar/Bases/VeiculosAgregados';
  
  // Usamos URLSearchParams para formatar o corpo da requisição como x-www-form-urlencoded
  const params = new URLSearchParams();
  params.append('client', '3visao');
  params.append('key', 'ODU0MTE8rTga30NTc4NzQ1');
  params.append('type', 'placa');
  params.append('placa', placa);

  try {
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

    // Retorna apenas os dados necessários para o front-end
    res.status(200).json({
      marca: data.veiculo.marca,
      modelo: data.veiculo.modelo,
    });

  } catch (error) {
    console.error('Erro na API de consulta de placa:', error);
    res.status(500).json({ message: error.message || 'Falha ao consultar a API externa.' });
  }
}

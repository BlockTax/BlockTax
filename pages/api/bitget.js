import crypto from 'crypto';

export default async function handler(req, res) {
  const { BITGET_API_KEY, BITGET_SECRET, BITGET_PASSPHRASE } = process.env;
  const timestamp = Date.now().toString();
  const method = 'GET';
  const path = '/api/spot/v1/trade/fills'; const query = '?limit=100';

  const prehash = timestamp + method + path + query;
  const signature = crypto.createHmac('sha256', BITGET_SECRET).update(prehash).digest('hex');

  const response = await fetch(`https://api.bitget.com${path}${query}`, { headers: {
        'ACCESS-KEY': BITGET_API_KEY,
        'ACCESS-SIGN': signature,
        'ACCESS-TIMESTAMP': timestamp,
        'ACCESS-PASSPHRASE': BITGET_PASSPHRASE
  }});
  const json = await response.json();
  const transactions = json.data.map(tx => ({
    date: tx.timestamp,
    asset: tx.symbol,
    amount: tx.size,
    type: tx.side,
    price: tx.price,
    valueEur: tx.size * tx.price,
    taxFree: false
  }));
  res.status(200).json({ transactions });
}

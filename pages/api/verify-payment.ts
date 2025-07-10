// pages/api/verify-payment.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { reference } = req.query;

  if (!reference) {
    return res.status(400).json({ error: 'Missing reference' });
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (data.status && data.data.status === 'success') {
      return res.status(200).json({ success: true, data: data.data });
    } else {
      return res.status(400).json({ success: false, data: data.data });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Payment verification failed' });
  }
}

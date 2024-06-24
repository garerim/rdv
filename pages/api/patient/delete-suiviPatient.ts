import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await prisma.suivi.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Suivi deleted successfully' });
  } catch (error) {
    console.error('Error deleting suivi:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

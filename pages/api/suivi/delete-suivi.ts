import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Assurez-vous que le chemin est correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      await prisma.suivi.delete({
        where: { id },
      });

      res.status(200).json({ message: 'Suivi deleted successfully' });
    } catch (error) {
      console.error('Error deleting suivi:', error);
      res.status(500).json({ error: 'Error deleting suivi' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

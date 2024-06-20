import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.body;

  try {
    await prisma.antecedent.delete({
      where: { id },
    });
    res.status(200).json({ message: 'Antecedent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting antecedent', error });
  }
}

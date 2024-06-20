import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const patients = await prisma.userProfile.findMany({
        where: {
            role: 'USER',
        }}
    );
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
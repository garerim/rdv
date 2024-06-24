import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return getAvailableTimeSlots(req, res);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

async function getAvailableTimeSlots(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, day } = req.query;

        if (!id || !day) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        // Step 1: Get all booked appointments for the given day
        const bookedAppointments = await getAllRdvByDay(id as string, day as string);

        // Step 2: Generate all possible time slots for the given day
        const allTimeSlots = generateTimeSlotsForDay(day as string);

        // Step 3: Filter out the booked appointments from the list of all time slots
        const availableTimeSlots = allTimeSlots.filter((slot) => {
            return !bookedAppointments.some(
                (appointment) => new Date(appointment.startDate).getTime() === slot.getTime()
            );
        });

        // Return the available time slots
        res.status(200).json(availableTimeSlots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des créneaux disponibles" });
    }
}

async function getAllRdvByDay(id: string, day: string) {
    const startDate = new Date(day);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const docs = await prisma.rendezVous.findMany({
        where: {
            professionelId: id,
            startDate: {
                gte: startDate,
                lt: endDate,
            },
        },
    });

    return docs;
}

  function generateTimeSlotsForDay(day: string): Date[] {
    const slots: Date[] = [];
    const date = new Date(day);

    // Helper function to add time slots
    const addTimeSlots = (startHour: number, endHour: number) => {
        const startDate = new Date(date);
        startDate.setHours(startHour, 0, 0, 0);

        while (startDate.getHours() < endHour) {
            slots.push(new Date(startDate));
            startDate.setMinutes(startDate.getMinutes() + 30);
        }
    };

    // Add slots from 8h to 12h
    addTimeSlots(8, 12);

    // Add slots from 14h to 18h
    addTimeSlots(14, 18);

    return slots;
}
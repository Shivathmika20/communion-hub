'use server'
import {prisma} from "@/lib/prisma";

export async function getEvents() {
    try {
        const events = await prisma.event.findMany({
            select: {
                id: true,
                title: true,
                date: true,
                location: true,
                imageUrl: true,
                category: true,
            },
            orderBy: { date: "asc" },
            take: 20, // Reduce number of results
        });
        return events;
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

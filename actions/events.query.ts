'use server'
import {prisma} from "@/lib/prisma";

export async function getEvents(){
    try{
        const events= await prisma.event.findMany(
            {
                orderBy:{
                    date:'asc'
                },
take: 20,
            }
        )
        return events
    }
    catch(e){
        console.log(e)

    }
}

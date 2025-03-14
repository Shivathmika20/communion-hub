'use server'

import {prisma} from "@/lib/prisma";

type EventTypes={
    title:string;
    date:Date;
    location:string;
    description:string;
    category:string;
    
}

export const createEvent=async ({title,date,location,description,category}:EventTypes)=>{
    try{
      const res= await prisma.event.create({
            data:{
                title,
                date,
                location,
                description,
                category,
               
            }
        })
        return res
        
    }
    catch(e){
        console.log(e)
    }
}
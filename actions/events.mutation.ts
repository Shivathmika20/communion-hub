'use server'

import {prisma} from "@/lib/prisma";

type EventTypes={
    title:string;
    date:Date;
    location:string;
    description:string;
    category:string;
    imageUrl:string;
}

export const createEvent=async ({title,date,location,description,category,imageUrl}:EventTypes)=>{
    try{
      const res= await prisma.event.create({
            data:{
                title,
                date,
                location,
                description,
                category,
                imageUrl,
            }
        })
        return res
        
    }
    catch(e){
        console.log(e)
    }
}
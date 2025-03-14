'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar"
import {useState,useEffect} from 'react'
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createEvent } from "@/actions/events.mutation";
import { getEvents } from "@/actions/events.query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FiSearch } from "react-icons/fi";



const Events=()=>{

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events,setEvents]=useState<any>()
  const [category,setCategory]=useState<string>('')
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSubmit=async (e:any)=>{
    e.preventDefault()
    const res= await createEvent (
      {
        title:e.target.title.value,
        date:date || new Date(),
        location:e.target.location.value,
        description:e.target.description.value,
        category:e.target.category.value,
        
      }
    )
    console.log(res)
    e.target.reset();
    setDate(new Date());
    setIsOpen(false);
    
  
    
    
  }
 
const catoegoryList=[
  
  {
    type:'religious',
    name:'Religious',
  },
  {
    type:'social',
    name:'Social',
  },
  {
    type:'charity',
    name:'Charity',
  }
]

// console.log(category)

const filterEvents= category===''?events : events?.filter((event:any)=>event.category===category)
console.log(filterEvents)
 
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } 
      catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

      // console.log(events)
    return(
        <div>
            <h1 className="h2-bold text-center p-8 text-sm">"Discover, Create & Celebrate "</h1>
            <div className="flex justify-end items-center max-w-5xl mx-auto gap-4 px-4">
              
              <div className="flex gap-4 items-center">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                  <Button size={'lg'}>Create Event</Button>
                </DialogTrigger>
                <DialogContent>
                  <div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 " name="form">
                      <Input type="text"placeholder="Event Name" name="title" required/>
                      <Input type="date" placeholder="Event Date" name="date" required/>
                      <Input type="text" placeholder="Event Location" name="location" required/>
                      <Select name="category" required>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Event Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            catoegoryList.map((item)=>(
                            <SelectItem key={item.type} value={item.type}>{item.name}</SelectItem>

                          ))
                          }
                        </SelectContent>
                      </Select>
                     <Input type="file" placeholder="Event Image" name="url" required/>
                      <Textarea name="description" placeholder="Event Description" required/>
                      <Button type="submit">Submit</Button>
                    </form>
                  </div>
                </DialogContent>
                </Dialog>
              
                <Select name="category" onValueChange={(value:string)=>setCategory(value)}>
                    <SelectTrigger className="w-40 border-black text-yellow-500">
                      <SelectValue placeholder="Filter By Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        catoegoryList.map((item)=>(
                          <SelectItem key={item.type} value={item.type}>{item.name}</SelectItem>
                        ))
                      }
                    </SelectContent>
                </Select>
              </div>
              </div>
            <div className="grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto p-12">
            {
                filterEvents?(
                  filterEvents.map((events:any)=>(
                    <Card >
                      <CardHeader>
                        <p>Card Header</p>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-2 text-black">
                        <CardTitle className=" text-lg md:text-2xl">{events.title}</CardTitle>
                        <CardDescription >{events.location}</CardDescription>
                        <CardDescription>{events.date.toLocaleDateString("en-GB")}</CardDescription>
                      </CardContent>
                      <CardFooter>
                       <div >
                        <Dialog >
                            <DialogTrigger>
                              <Button>Event Details</Button>
                            </DialogTrigger>
                            <DialogContent >
                              <DialogHeader>
                                <DialogTitle className="text-lg">{events.title}</DialogTitle>
                              </DialogHeader>
                              <DialogDescription className="text-black" ><strong>Location:</strong> {events.location}</DialogDescription>
                                <DialogDescription className="text-black"><strong>Date:</strong>
                                {events.date.toLocaleDateString("en-GB")}
                                </DialogDescription>
                                <DialogDescription className="text-black">
                                {events.description}
                                </DialogDescription>
                            </DialogContent>
                          </Dialog>
                        </div>

                      </CardFooter>
                    </Card>

                  ))
                ):(
                  <p>No events Create One</p>
                )
              }
            </div>
            
        
            
        </div>
    )
}

export default Events;
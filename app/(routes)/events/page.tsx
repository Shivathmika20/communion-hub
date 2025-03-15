"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createEvent } from "@/actions/events.mutation";
import { getEvents } from "@/actions/events.query";
import Image from "next/image";
import { pinata } from "@/utils/config";

const Events = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<any>();
  const [category, setCategory] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) {
      alert("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
	  
      const { cid } = await pinata.upload.public.file(file);
      const url = await pinata.gateways.public.convert(cid);
	  

      if (!url) {
        throw new Error("Failed to upload image");
      }

      setImageUrl(url);
	  console.log(formData.get("title") );

      const res = await createEvent({
        title:e.target.title.value ,
        date: new Date(e.target.date.value),
        location: e.target.location.value,
        description: e.target.description.value,
        category: e.target.category.value,
        imageUrl: url,
      });


      console.log("Event created successfully:", res);
    } catch (error) {
      console.error("Error uploading image or creating event:", error);
    }

    e.target.reset();
    setDate(new Date());
    setIsOpen(false);
  };

  const categoryList = [
    { type: "religious", name: "Religious" },
    { type: "social", name: "Social" },
    { type: "charity", name: "Charity" },
  ];

  const filterEvents =
    category === ""
      ? events
      : events?.filter(
          (event: { category: string }) => event.category === category
        );

  useEffect(() => {
			const fetchEvents = async () => {
			try {
				const data = await getEvents();
				setEvents(data);
			} catch (error) {
				console.error("Error fetching events:", error);
			}
			};
			fetchEvents();
	}, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  return (
    <div className="bg-gray-50">
      <div className="w-full py-16">
        <div className="max-w-screen-xl px-6 mx-auto ">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Upcoming Events
              </h2>
              <p className="text-lg text-gray-600">
                Join us at our next community gathering
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <Select
                name="category"
                onValueChange={(value: string) => setCategory(value)}
              >
                <SelectTrigger className="w-40 h-full">
                  <SelectValue placeholder="Filter By Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryList.map((item) => (
                    <SelectItem key={item.type} value={item.type}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                  <Button
                    size={"lg"}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300"
                  >
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <div>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4 p-4 "
                      name="form"
                    >
                      <Input
                        type="text"
                        placeholder="Event Name"
                        name="title"
                        required
                      />
                      <Input
                        type="datetime-local"
                        placeholder="Event Date and Time"
                        name="date"
                        required
                      />
                      <Input
                        type="text"
                        placeholder="Event Location"
                        name="location"
                        required
                      />
                      <Select
                        name="category"
                        onValueChange={setCategory}
                        required
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Event Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryList.map((item) => (
                            <SelectItem key={item.type} value={item.type}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="file"
                        placeholder="Event Image"
                        name="image"
                        accept="image/*"
                        onChange={handleImage}
                        required
                      />
                      <Textarea
                        name="description"
                        placeholder="Event Description"
                        rows={4}
                        required
                      />
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300"
                      >
                        Submit
                      </Button>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
		  {filterEvents && filterEvents.length > 0 ? (
				filterEvents.map((event: any) => (
					<div
					key={event.id}
					className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
					>
					<div className="relative h-48">
						<Image
						src={`${event?.imageUrl}`}
						alt={`Event ${event?.id}`}
						fill
						className="object-cover"
						/>
					</div>
					<div className="px-6 py-4">
						<div className="flex justify-between items-center gap-2 mb-2">
						<div className="text-sm text-blue-600 font-medium capitalize bg-blue-600/20 px-2 rounded-full">
							{event.category}
						</div>
						<div className="flex items-center gap-2 ">
							<p className="text-gray-600 ">{event.location} -</p>
							<p className="text-gray-600 ">
							{new Date(event.date).toLocaleDateString()}
							</p>
						</div>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
						{event.title}
						</h3>
						<p className="line-clamp-3">{event?.description}</p>
					</div>
					</div>
				))
				) : (
				<h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
					No events found for this category
				</h1>
				)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;

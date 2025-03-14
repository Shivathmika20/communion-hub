"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import axios from "axios";

const Events = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [events, setEvents] = useState<any>();
	const [category, setCategory] = useState<string>("");
	const [isOpen, setIsOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (imageUrl) {
			const formData = new FormData();
			formData.append("file", imageUrl);
			setLoading(true);
			try {
				const pinataResponse = await axios.post(
					"https://api.pinata.cloud/pinning/pinFileToIPFS",
					formData,
					{
						headers: {
							pinata_api_key: process.env.PINATA_API_KEY,
							pinata_secret_api_key:
								process.env.PINATA_SECRET_API_KEY,
						},
					}
				);
				const pinataData = pinataResponse.data;
				const uploadedImageUrl = `https://gateway.pinata.cloud/ipfs/${pinataData.IpfsHash}`;
				setImageUrl(uploadedImageUrl);

				await createEvent({
					title: e.currentTarget.title.value,
					date: date || new Date(),
					location: e.currentTarget.location.value,
					description: e.currentTarget.description.value,
					category: e.currentTarget.category.value,
					imageUrl: uploadedImageUrl,
				});
			} catch (error) {
				console.error(
					"Error uploading image or creating event:",
					error
				);
			} finally {
				setLoading(false);
			}
		} else {
			console.error("No image file selected.");
		}

		console.log(res);
		e.target.reset();
		setDate(new Date());
		setIsOpen(false);
	};

	const catoegoryList = [
		{
			type: "religious",
			name: "Religious",
		},
		{
			type: "social",
			name: "Social",
		},
		{
			type: "charity",
			name: "Charity",
		},
	];

	const filterEvents =
		category === ""
			? events
			: events?.filter(
					(event: { category: string }) => event.category === category
			  );
	console.log(filterEvents);

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

	// console.log(events)
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
								onValueChange={(value: string) =>
									setCategory(value)
								}
							>
								<SelectTrigger className="w-40 h-full">
									<SelectValue placeholder="Filter By Category" />
								</SelectTrigger>
								<SelectContent>
									{catoegoryList.map((item) => (
										<SelectItem
											key={item.type}
											value={item.type}
										>
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
											<Select name="category" required>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Event Category" />
												</SelectTrigger>
												<SelectContent>
													{catoegoryList.map(
														(item) => (
															<SelectItem
																key={item.type}
																value={
																	item.type
																}
															>
																{item.name}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
											<Input
												type="file"
												placeholder="Event Image"
												name="image"
												accept="image/*"
												onChange={(e) => {
													const file =
														e.target.files?.[0];
													if (file) {
														setImageUrl(
															URL.createObjectURL(
																file
															)
														);
													}
												}}
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
						{events?.map((event: any) => (
							<div
								key={event.id}
								className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
							>
								<div className="relative h-48">
									<Image
										src={`/placeholder.svg?height=200&width=400`}
										alt={`Event ${event.id}`}
										fill
										className="object-cover"
									/>
								</div>
								<div className="p-6">
									<div className="text-sm text-blue-600 font-medium mb-2">
										{event.category}
									</div>
									<h3 className="text-xl font-semibold text-gray-900 mb-2">
										{event.title}
									</h3>
									<p className="text-gray-600 mb-4">
										{event.description}
									</p>
									<Button
										variant="outline"
										className="w-full"
									>
										Learn More
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Events;

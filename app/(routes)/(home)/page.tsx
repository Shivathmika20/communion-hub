"use client";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getEvents } from "@/actions/events.query";

  

export default function Home() {
	const [events, setEvents] = useState<any>();

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const data = await getEvents();
				console.log("Fetched events:", data);
				if (!data || data.length === 0) {
					console.warn("No events received!");
				}
				console.log(data);
				setEvents(data);
			} catch (error) {
				console.error("Error fetching events:", error);
			}
		};
		fetchEvents();
	}, []);

	console.log(events);

	return (
		<div className=" bg-gray-50">
			<div className="w-full py-12 lg:py-18">
				<GridPattern
					width={30}
					height={30}
					x={-1}
					y={1}
					className={cn(
						"[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] opacity-50 z-0"
					)}
				/>
				<div className="max-w-screen-xl px-6 mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
					<div className="flex flex-col justify-center gap-6">
						<div className="w-fit px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-2">
							<span>Bringing People Together</span>
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
							Building Stronger{" "}
							<span className="text-blue-600">Communities</span>{" "}
							Together
						</h1>
						<p className="text-lg md:text-xl text-gray-600">
							Connecting people of all faiths and backgrounds
							through meaningful events, support networks, and
							shared experiences.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 mt-2">
							<Button
								className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300"
								size="lg"
							>
								<Link href="/events" className="text-lg">
									Explore Events
								</Link>
							</Button>
							<Button
								variant="outline"
								className="border-blue-200 hover:bg-blue-50 text-blue-600 rounded-lg"
								size="lg"
							>
								<Link href="/" className="text-lg">
									Learn More
								</Link>
							</Button>
						</div>
					</div>
					<div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden z-10 border border-blue-100">
						<Image
							src="/assets/hero.png"
							alt="img"
							fill
							className="object-cover"
							priority
						/>
					</div>
				</div>
			</div>

			<div className="w-full py-16">
				<div className="max-w-screen-xl px-6 mx-auto">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
						<div>
							<h2 className="text-3xl font-bold text-gray-900 mb-2">
								Upcoming Events
							</h2>
							<p className="text-lg text-gray-600">
								Join us at our next community gathering
							</p>
						</div>
						<Button
							variant="ghost"
							className="text-blue-600 hover:text-blue-700 mt-4 md:mt-0"
						>
							<Link href="/events" className="flex items-center">
								View all events{" "}
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{events?.map((event: any) => (
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
											{event.date.toLocaleDateString()}
										</p>
										</div>
									  </div>
									  <h3 className="text-xl font-semibold text-gray-900 mb-2">
										{event.title}
									  </h3>
									  
									   <p className="line-clamp-3  ">
										{event?.description}
									   </p>
									  
									</div>
								  </div>
								))}
							  </div>
							</div>
			</div>
		</div>
	);
}

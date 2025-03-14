import Image from "next/image";
import React from "react";
import Logo from "../public/assets/communion logo.png";
import Link from "next/link";
import { RxDragHandleHorizontal } from "react-icons/rx";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
	return (
		<header className="w-full h-fit z-10">
			<div className="w-[98%] mx-auto max-w-screen-xl px-8 py-1 md:py-5 md:mx-auto bg-white flex justify-between items-center border rounded-full">
				<div>
					<Link href={"/"}>
						<Image
							src={Logo}
							alt="logo"
							width={100}
							height={100}
							className="w-44"
						/>
					</Link>
				</div>
				<div className="hidden md:flex space-x-12 items-center justify-evenly text-lg lg:text-xl">
					<Link href="/">Home</Link>
					<Link href="/events">Events</Link>
					<Link href="/">About</Link>
				</div>
				<div className="md:hidden">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<RxDragHandleHorizontal
								width={200}
								size={32}
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-fit h-fit flex flex-col gap-4 p-4 ">
							<DropdownMenuItem>
								<Link href="/">Home</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href="/events">Events</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href="/About">About</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}

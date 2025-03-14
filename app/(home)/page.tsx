import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";



export default function Home() {
  return (
    <div className=" w-full py-10 lg:py-18">
        <div className=" max-w-6xl px-8 md:mx-auto  grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Building Communities!</h1>
            <p className="p-regular-20 md:p-regular-24">"Connecting people of all faiths through events and community support".</p>
            <Button className="bg-blue-500 outline-blue-500 w-full sm:w-fit rounded-lg" size='lg' variant='outline'>
              <Link href='/events' className='text-lg'>Explore Events</Link>
              </Button>
          </div>
          <div>
          <Image src='/assets/hero.png' alt="hero" width={1000} height={1000} className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] priority" />
          </div>
        </div>
    </div>
  );
}

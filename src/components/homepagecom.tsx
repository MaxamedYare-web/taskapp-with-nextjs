"use client"
import { Button } from '@heroui/button'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import "swiper/css"
import Image from 'next/image'
import neverImg from "../../public/nevergivup.png"
import logoImg from "../../public/logo.png"
import intro01 from "../../public/intro01.png"
import intro02 from "../../public/intro02.png"
import intro03 from "../../public/intro03.png"
import { Link, LinkIcon, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'

export default function Homepagecom  () {

  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  

  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
  if (progressCircle.current) {
    progressCircle.current.style.setProperty('--progress', String(1 - progress));
  }
  if (progressContent.current) {
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  }
};

interface IitemPro {
  titleTop:string,
  titleHeader:React.ReactNode,
  description:string,
  image:string | any
  id:number
  width:string,
  textSize:string

}

const itesmsData:IitemPro[] = [
  {
    id:1,
    titleTop:"keep you time Never give up bro or sister",
    titleHeader:<h1 className=' md:text-5xl font-bold text-primary-500 capitalize'> Welcome Taskflow we are <br /> happy to visit us</h1>,
    description:"ku soo dhaoow websitekeena taskflow wanu ku faraxsanahay in nasoo booqato maalin walbo dadaal samey oo waqtigaada ilaalsho"
   ,
   image:intro01 ,
   width:"max-w-139",
   textSize:"text-[20px]"
  },
  {
  id:2,
    titleTop:"The Empowering & Action-Oriented",
    titleHeader:<h1  className=' md:text-5xl font-bold text-primary-500 capitalize'> Conquer Your Day, One Task at <br /> a Time  and every day</h1>,
    description:"Stop feeling overwhelmed by a endless to-do list. TaskFlow is your command center for clarity and action. Break down your biggest goals into manageable steps, track your progress with satisfaction, and build unstoppable momentum. Today isn't about doing everything—it's about accomplishing what truly matters. Let's get started"
   ,
   image:intro02,
   width:"max-w-140",
    textSize:"text-[15px]"
  },
  {
    id:3,
    titleTop:"The Visionary & Goal-Oriented",
    titleHeader:<h1  className=' md:text-5xl font-bold text-primary-500 capitalize'>Don't Just Plan Tasks. Build Your <br /> Future  Find Your Flow</h1>,
    description:"In a world of constant noise  true productivity is about focused calm, not chaotic busyness. TaskFlow helps you quiet the clutter by organizing your priorities in a clean, intuitive space. Visualize your workload, eliminate distractions,and enter a state of flow where you can do your best work, peacefully and purposefully"
   ,
   image:intro03,
   width:"max-w-145",
    textSize:"text-[15px]"
  },
]

  return (
    <div className='flex flex-col justify-center items-center bg-gradient-to-tl from-primary-100 to-danger-100'>
         <Navbar>
      <NavbarBrand>
       <Image src={logoImg} alt='logo img' width={100}/>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
           Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
           About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
           Contact us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/auth/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/auth/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
   
   <div className='w-full'>
    <Swiper 
    autoplay={{
      delay:5000,
        disableOnInteraction: false,
    }}
    spaceBetween={30}
    modules={[Autoplay]}
    onAutoplayTimeLeft={onAutoplayTimeLeft}
   className='mySwiper  mt-5'>
   
    {
      itesmsData.map((item)=>(
          <SwiperSlide key={item.id}>
      <div className='flex justify-center items-center '>
        <div className='ml-3 md:ml-0'>
          <p className='font-medium text-gray-500'>{item.titleTop}</p>
          {item.titleHeader}
          <p className={`mt-2 md:${item.textSize} font-semibold text-gray-500 ${item.width}`}>{item.description}</p>
       <Link href='/auth/register' className='bg-primary-500 p-2 flex justify-center items-center rounded text-secondary-50 mt-3 w-30 text-center
        font-bold'>Join Now</Link>
        </div>

       <div className='relative'>
         <div className='bg-primary-300 w-30 h-30 animate-pulse absolute md:w-100 md:h-100 rounded-full -z-1 right-0'></div>
         <Image className='w-100 h-150 md:h-[612] md:w-[408]'  src={item.image} alt='image header'/> 
       </div>
      </div>
     </SwiperSlide>
      ))
    }

      <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>

   </Swiper>
 
     
   </div>
   
    </div>
  )
}



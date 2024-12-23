import React from 'react';
import { BsBook, BsPeople, BsCalendar, BsMap } from 'react-icons/bs';
import Link from 'next/link';

const Services = () => {
  return (
    <div id="services-section"  className="w-full py-6 sm:py-12 lg:py-16">
        <div>
            <p className='text-center text-[30px] md:text-[36px] lg:text-[42px] xl:text-[50px] font-bold pb-5 md:pb-10'>Our Features</p>
        </div>
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap  justify-center ">
          <ServiceItem 
            icon={<BsBook className="mx-auto w-8 h-8 md:w-12 md:h-12 text-[#f58f29]" />}
            title="Courses"
            description="Access to knowledge. Enroll in a variety of courses to expand your skills."
            link="/courses"
            buttonText="View Courses"
          />
          <ServiceItem
           icon={<BsPeople className="mx-auto w-8 h-8 md:w-12 md:h-12 text-[#f58f29]" />}
           title="Blogs"
           description="Explore insightful articles and share your thoughts through engaging blog posts."
           link="/blogs"
           buttonText="Read Blogs"
         /> 
          <ServiceItem
            icon={<BsCalendar className="mx-auto w-8 h-8 md:w-12 md:h-12 text-[#f58f29]" />}
            title="Events"
            description="Discover experiences. Attend events to make memories and learn."
            link="/events"
            buttonText="View Events"
          />
          <ServiceItem
            icon={<BsMap className="mx-auto  w-8 h-8 md:w-12 md:h-12 text-[#f58f29]" />}
            title="Nearby Places"
            description="Explore the neighborhood. Find nearby places for fun and convenience."
            link="/nearby-places"
            buttonText="Explore Places"
          />
        </div>
      </div>
    </div>
  );
};

const ServiceItem = ({ icon, title, description, link, buttonText }) => {
    return (
      <div className="max-w-[300px]  mx-10 my-3 md:my-5 md:m-3 border border-solid rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 ">
        <div className="relative h-[240px] md:h-[300px] rounded shadow-lg flex flex-col items-center justify-between">
          <picture className="block pt-5">
            {icon}
          </picture>
          <div className="p-4 text-center">
            <h3 className="text-[22px] lg:text-[32px] font-bold pb-2 text-[#094074]">
              {title}
            </h3>
            <p className="text-[12px] md:text-[16px] px-5">{description}</p>
          </div>
          <Link href={link}>
          <button  className="border border-solid p-2  mb-5 px-10 bg-[#41E2BA] overflow-hidden rounded-lg hover:scale-105 transition">
           {buttonText}
          </button>
          </Link>
        </div>
      </div>
    );
  };

export default Services;

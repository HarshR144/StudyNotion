import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/Images/TimelineImage.png"
const Timeline = [
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully commited to the success company",
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority",
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skill",
    },
    {
        Logo:Logo4,
        heading:"Save the problem",
        Description:"Code your way to solution",
    }
]
const TimelineSection = () => {
  return (
    <div className='flex gap-15 items-center'>
        {/* Left section */}
        <div className='w-[45%] flex flex-col gap-5 '>
            {
                Timeline.map((element,index)=>{
                    return (
                        <div className='flex gap-6 ' key={index}>
                            <div className='w-[50px] h-[50px] bg-white flex items-center justify-center'>
                                <img src={element.Logo} alt='logo'/>
                            </div>
                            <div className=''>
                                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                <p className='text-base'>{element.Description}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        {/* right section */}
        <div className='relative'>
            <img src={TimelineImage} alt='TimelineImage'/>
            <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-10
                left-[50%] translate-x-[-50%] translate-y-[-50%] '>
                {/* 10 */}
                <div className='flex gap-5 items-center border-r border-caribbeangreen-300'>
                    <p className='text-3xl font-bold'>10</p>
                    <p className=' text-caribbeangreen-300 text-sm '>Years of Experience</p>
                </div>
                {/* 250 */}
                <div className='flex gap-5 items-center px-7'>
                    <p className='text-3xl font-bold'>250</p>
                    <p className=' text-caribbeangreen-300 text-sm '>Type of courses</p>
                

                </div>

            </div>
        </div>
    </div>
  )
}

export default TimelineSection
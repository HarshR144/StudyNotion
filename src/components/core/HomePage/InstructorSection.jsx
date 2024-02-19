import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div>
        <div  className='flex flex-row gap-20 items-center'>
            {/* Left side -image */}
            <div className='w-[50%]'>
                <img src={Instructor} alt='instructor' className=""/>
            </div>

            {/* right side */}
            <div className='w-[50%] flex flex-col gap-4 '>
                <div className='text-4xl font-semibold w-[50%]'>
                    Become an <HighlightText text={"Instructor"}/>
                </div>
                <p className='font-medium text-[16px] w-[81%] text-richblack-300'>
                    Instructors from around the world teach millions of 
                    students on StudyNotion. We provide the tools and 
                    skills to teach what you love.
                </p>
                <div className='w-fit translate-y-12'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-2  items-center'>
                            Start Teaching Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default InstructorSection
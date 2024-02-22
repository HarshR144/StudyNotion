import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from '../../../assets/Images/Know_your_progress.png'
import Compare_with_others from '../../../assets/Images/Compare_with_others.png'
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './CTAButton'


const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col gap-5 mt-[200px] items-center mb-32'>
        {/* heading */}
        <div className='text-4xl font-semibold text-center '>
            Your Swiss Knife for 
            <HighlightText text={"learning any language"}></HighlightText>
             {/* subheading */}
            <div className='text-center text-richblack-700 font-medium mx-auto leading-6 text-base mt-3 lg:w-[70%] '>
                Using spin making learning multiple languages easy. 
                with 20+ languages realistic voice-over, progress tracking, 
                custom schedule and more.
            </div>
        </div>

        {/* cards */}
        <div className='flex flex-col lg:flex-row items-center justify-center mt-8  '>
            <img src={Know_your_progress} alt='languageImg' className=' object-contain lg:-mr-28  lg:scale-110'/>
            <img src={Compare_with_others} alt='languageImg' className=' object-contain lg:scale-110'/>
            <img src={Plan_your_lessons} alt='languageImg' className=' object-contain lg:mb-12 lg:-ml-28 lg:scale-110'/>
        </div>
        <div className=' w-fit mx-auto lg:mb-20 mb-6 -mt-3'>
            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
        </div>
    </div>
  )
}

export default LearningLanguageSection
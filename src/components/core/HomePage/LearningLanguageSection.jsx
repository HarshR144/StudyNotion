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
        </div>

        {/* subheading */}
        <div className='text-center text-richblack-600 mx-auto text-base mt-3 w-[70%] '>
            Using spin making learning multiple languages easy. 
            with 20+ languages realistic voice-over, progress tracking, 
            custom schedule and more.
        </div>

        <div className='flex items-center justify-center mt-7 '>
            <img src={Know_your_progress} alt='languageImg' className=' object-contain -mr-28  scale-110'/>
            <img src={Compare_with_others} alt='languageImg' className=' object-contain scale-110'/>
            <img src={Plan_your_lessons} alt='languageImg' className=' object-contain mb-12 -ml-28 scale-110'/>
        </div>
        <div className=' w-fit'>
            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
        </div>
    </div>
  )
}

export default LearningLanguageSection
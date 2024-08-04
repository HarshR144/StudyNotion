import React from 'react'
import { Link } from 'react-router-dom'

//imported components
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/CTAButton'
import Banner from "../assets/Images/banner.mp4"
import CodeBlock  from '../components/core/HomePage/CodeBlock'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'

//imported icons
import {FaArrowRight} from "react-icons/fa"
import ReviewSlider from '../components/common/ReviewSlider'

const Home = () => {
  return (
    <div>
        {/* Section1 */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-between text-white gap-8'>
            {/* Instructor Btn */}
            <Link to={"/signup"}>
                <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none'>
                    {/* div for content */}
                    <div className='flex items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/> 
                    </div>                   
                </div>
            </Link>
            
            {/* Headline */}
            <div className=' text-center text-4xl font-semibold '>
                Empower your  Future with <HighlightText text={"Coding Skills"} />
            </div>

            {/* Subheadline */}
            <div className='-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300 '>
                With our online coding courses, you can learn at your own pace, from anywhere in the world,
                and get access to a wealth of resources, including hands-on projects, quizzes, and personalized
                feedback from instructors. 
            </div>

            {/* button headsection */}
            <div className='flex gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>

            </div>

            {/* video */}
            <div className='mx-3 my-12 shadow-blue-200 w-[77%] relative '>
                <div className='grad2 -top-10 w-[800px] rounded-full'></div>
                <video className='video'
                    muted
                    loop
                    autoPlay
                    >
                    <source  src={Banner} type="video/mp4" />
                </video>
            </div>

            {/* Code Section 1 */}
            <div>
                <CodeBlock 
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unblock your <HighlightText text={"coding portential"}/>  with our online courses.
                    </div>
                }
                subheading={
                `    Our courses are designed and taught by industry experts who have years
                    of experience in coding and are passionate about sharing their knowledge with you.
                `}
                ctabtn1={
                    {
                        btnText:"try it yourself",
                        linkto:"/signup",
                        active:true
                    }
                }
                ctabtn2={
                    {
                        btnText:"learn more",
                        linkto:"/login",
                        active:false
                    }
                }
                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                backgroundGradient={<div className="codeblock1 absolute"></div>}
                codeColor={"text-yellow-5"}
                >

                </CodeBlock>
            </div>
            
            {/* Code Section 2 */}
            <div className='w-[100%]'>
                <CodeBlock 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Start <HighlightText text={"coding in seconds"} /> with our online
                courses.
                    </div>
                }
                subheading={
                    `Go ahead, give it a try. Our hands-on learning environment 
                    means you'll be writing real code from your very first lesson.`}
                ctabtn1={
                    {
                        btnText:"Continue Lesson",
                        linkto:"/signup",
                        active:true
                    }
                }
                ctabtn2={
                    {
                        btnText:"learn more",
                        linkto:"/login",
                        active:false
                    }
                }
                codeColor={"text-white"}
                codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                backgroundGradient={<div className="codeblock2 absolute"></div>}
                >

                </CodeBlock>
            </div>
            
            {/* Explore more section */}
            <ExploreMore/>

        </div>


        {/* Section2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
                
                {/* bg-with-grid-image */}
                <div className='homepage_bg h-[333px] '>
                    <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-8 mx-auto justify-between'>
                        <div className='lg:h-[150px]'></div>
                        
                        {/* buttons */}
                        <div className='flex gap-7 text-white lg:mt-8'>
                            <CTAButton active={true} linkto={"/signup"}>
                               <div className="flex items-center gap-3"> 
                               Explore Full Catalog
                                <FaArrowRight/>
                               </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/login"}>
                                <div>Learn more</div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 '>
                    
                    {/* Job in demand section */}
                    <div className='flex flex-col mb-10 lg:mt-20 lg:flex-row  mt-[-100px] justify between  gap-7 '>
                        <div className='text-4xl font-semibold lg:w-[45%] text-start'>
                            Get the skills you need for a<HighlightText text={"job that is in demand"}></HighlightText>
                        </div>
                        <div className='flex flex-col gap-10 lg:w-[40%] items-start'>
                            <div className='text-[16px] font-semibold'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive 
                                specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                        </div>

                    </div>
                    {/* TimelineSection */}
                    <TimelineSection/>

                    {/* LEarning Language Section */}
                    <LearningLanguageSection/>
                </div>
        </div>

        {/* Section3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter bg-richblack-900
        text-white my-20'>
            {/* Become an instructor section */}
            <InstructorSection/>
            
          
                
        </div>
        <div className=' mb-16 mt-3'>
            <h2 className='text-center text-2xl md:text-4xl font-semibold mt-8 text-richblack-5 mb-5'>Reviews from other learners</h2>
            <ReviewSlider />
        </div>

        {/* Footer */}
        <Footer/> 
    </div>
  )
}

export default Home
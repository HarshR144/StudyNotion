import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';


// data
const  tabsName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"];

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses]= useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)
    
    const setMyCards= (value)=>{
        setCurrentTab(value);
        const currentCourses = HomePageExplore.filter((course)=>course.tag ===value);
        setCourses(currentCourses[0].courses);
        setCurrentCard(currentCourses[0].courses[0].heading);
    }
    return (
    <div >
        {/* Heading */}
        <div className='lg:mb-0 mb-4'>
         
            <div className='text-4xl font-semibold text-center my-6'>
                Unlock the <HighlightText text={"Power of Code"}/>
            </div>
            <p className='text-center text-richblack-300 font-semibold mt-1'>Learn to build anything you can imagine</p>    
        </div>
        
        {/* tabs */}
        <div className='lg:flex hidden bg-richblack-800 w-max rounded-full mb-5 mt-5 gap-5 p-1 mx-auto text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
            {
                tabsName.map((tab,index)=>{
                    return(
                        <div className={`text-[16px] flex flex-row items-center justify-center 
                                        ${currentTab===tab ?"bg-richblack-900 text-richblack-5 font-medium "
                                        :"text-richblack-200 "} rounded-full transition-all duration-200 cursor-pointer
                                        hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} 
                            key={index}
                            onClick={()=>{setMyCards(tab)}}>
                            {tab}
                        </div>
                        )
                })
            }
        </div>

        
        <div className='lg:h-[200px] lg:block hidden'></div>
        {/* cards */}
          <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
         {
                courses.map((element,index)=>{
                    return(
                        <CourseCard 
                            key={index}
                            cardData={element} 
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}    
                            />
                    )
                })
            }
        </div>
    </div>
)
}

export default ExploreMore
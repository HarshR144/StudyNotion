import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import frameImage from "../../../assets/Images/frame.png"



const Template = ({title,description1,description2,image,formType}) => {
  return (
    <div className='min-h-[calc(100vh-3.5rem)] items-center py-12 w-11/12 max-w-maxContent  flex-col-reverse flex  mx-auto justify-between gap-y-12  md:flex-row md:gap-y-0 md:gap-x-12'
    >
        {/* Form Section */}
        <div className='max-w-[450px] w-11/12 mx-auto md:mx-0'>
            <h1 className='text-richblack-5 text-[1.875rem] font-semibold leading-[2.375rem] '
                >{title}</h1>
            <div>
                <p className='mt-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>{description1}</p>
                <p className='text-[1.125rem] leading-[1.625rem] font-edu-sa font-bold  italic text-blue-100'>{description2}</p>
            </div>
            {
                formType==="signup" ? <SignupForm/>: <LoginForm/>
            }
        </div>

        {/* Image section */}
        <div className='relative mx-auto w-11/12 max-w-[450px] md:mx-0'>
            <img src={frameImage} alt='' width={558} height={504} loading='lazy'/>
            <img src={image} width={558} height={504} alt='Education' loading='lazy' 
                className="absolute -top-4 right-4 z-10"
            />
            
        </div>
    </div>
  )
}

export default Template
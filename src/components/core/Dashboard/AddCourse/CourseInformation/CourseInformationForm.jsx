import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {fetchCourseCategories} from "../../../../../services/operations/courseDetailsAPI"
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import RequirementsField from './RequirementsField'
import { setStep } from '../../../../../slices/courseSlice'
import IconBtn from "../../../../common/IconBtn"
const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm()
    const dispatch = useDispatch();
    const{course, editCourse} = useSelector((state)=>state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    useEffect(()=>{
        const getCategories= async()=>{
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0){
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        if(editCourse){
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
        getCategories();
    },[])
    
    const isFormUpdated = ()=>{
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName || 
           currentValues.courseShortDesc !== course.courseShortDesc ||
           currentValues.courseShortDesc !== course.courseShortDesc ||
           currentValues.courseShortDesc !== course.courseShortDesc ||
           currentValues.courseShortDesc !== course.courseShortDesc ){
            return true;
        }
        else
            return false;
    }
    const onSubmit = async(data)=>{
        if(editCourse){
            const currentValues = getValues();
            const formData = new FormData();
            formData.append("courseId",course._id);
            // append only what is updated/edited
            if(currentValues.courseTitle !== course.courseName){
                formData.append("courseName", data.courseTitle);
            }
            if(currentValues.courseTitle !== course.courseName){
                formData.append("courseName", data.courseTitle);
            }
            if(currentValues.courseTitle !== course.courseName){
                formData.append("courseName", data.courseTitle);
            }
            if(currentValues.courseTitle !== course.courseName){
                formData.append("courseName", data.courseTitle);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
            <div>
                <label>Course Title <sup className=' text-pink-50'>*</sup></label>
                <input 
                    id='courseTitle'
                    placeholder='Enter course title'
                    {...register("courseTitle",{required:true})}
                    className='w-full'
                />
                {
                    errors.courseTitle && (
                        <span>Course Title is  Required**</span>
                    )
                }
            </div>
            <div>
                <label>Course Short Description <sup>*</sup></label>
                <textarea
                    id='courseShortDesc'
                    placeholder='Enter Description'
                    {...register("courseShortDesc",{required:true})}
                    className='min-h-[130px] w-full'/>
                {
                    errors.courseShortDesc && (<span>Course Description is required</span>)
                }
            </div>
            <div className='relative'>
                <label>Course Price<sup className=' text-pink-50'>*</sup></label>
                <input 
                    id='coursePrice'
                    placeholder='Enter course price'
                    {...register("coursePrice",{required:true, valueAsNumber:true})}
                    className='w-full'
                />
                <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400'/>
                {
                    errors.coursePrice && (
                        <span>Course Price is  Required**</span>
                    )
                }
            </div>
            <div>
                <label htmlFor='courseCategory'>Course Category <sup>*</sup></label>
                <select
                id='courseCategory'
                defaultValue=""
                {...register("courseCategory",{required:true})}
                >
                    <option value={""} disabled>Choose a Category</option>    
                    {
                        !loading && courseCategories.map((category,index)=>(
                            <option
                            key={index}
                            value={category?._id}

                            >{category?.name}</option>
                        ))
                    }
                </select>
            </div>
            {/* create custom component for tags */}
            {/* <ChipInput 
            label="Tags"
            name="courseTags"
            placeholder="Enter Tags"
            register={register}
            errors={errors}/> */}

            <RequirementsField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                setValue={setValue}
                errors={errors}
                getValues={getValues}
            />
            <div>
                {
                    editCourse && (
                        <button onClick={()=>dispatch(setStep(2))}
                        className='flex items-center gap-x-2 bg-richblack-300'>
                            Continue Without Saving
                        </button>

                    )
                }
                <IconBtn
                    text={!editCourse ?"Next":"Save Changes"}
                />
            </div>
        </form>
  )
}

export default CourseInformationForm
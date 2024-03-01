import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {fetchCourseCategories} from "../../../../../services/operations/courseDetailsAPI"
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import RequirementsField from './RequirementsField'
import { setStep } from '../../../../../slices/courseSlice'
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

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
        // if form is in edit mode
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const isFormUpdated = ()=>{
        const currentValues = getValues();
        if( currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !==
            course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail ){
            return true;
        }
        else
            return false;
    }

    //handle next button click
    const onSubmit = async(data)=>{
        if(editCourse){
            if (isFormUpdated()) {
                const currentValues = getValues()
                const formData = new FormData()
                // console.log(data)
                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course.courseName) {
                  formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                  formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                  formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                  formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                  formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                  formData.append("category", data.courseCategory)
                }
                if (
                  currentValues.courseRequirements.toString() !==
                  course.instructions.toString()
                ) {
                  formData.append(
                    "instructions",
                    JSON.stringify(data.courseRequirements)
                  )
                }
                if (currentValues.courseImage !== course.thumbnail) {
                  formData.append("thumbnailImage", data.courseImage)
                }
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 space-y-8'>
            
            {/* Course Title */}
            <div className='flex flex-col space-y-2'>
                <label className="text-sm text-richblack-5" htmlFor="courseTitle">
                    Course Title <sup className="text-pink-200">*</sup>
                </label>
                <input 
                    id='courseTitle'
                    placeholder='Enter course Title'
                    {...register("courseTitle",{required:true})}
                    className='form-style w-full'
                />
                {
                    errors.courseTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course title is required
                        </span>
                    )
                }
            </div>

            {/* Course Short Description */}
            <div className='flex flex-col space-y-2'>
                <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
                    Course Short Description <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    id='courseShortDesc'
                    placeholder='Enter Description'
                    {...register("courseShortDesc",{required:true})}
                    className='form-style resize-x-none min-h-[130px] w-full'/>
                {
                    errors.courseShortDesc && ( 
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Description is required
                        </span>)
                }
            </div>

            {/* Course Price */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="coursePrice">
                    Course Price <sup className="text-pink-200">*</sup>
                </label>
                <div className="relative">
                    <input
                        id="coursePrice"
                        placeholder="Enter Course Price"
                        {...register("coursePrice", {
                        required: true,
                        valueAsNumber: true,
                        pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        },
                        })}
                        className="form-style w-full !pl-12"
                    />
                    <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
                </div>
                {errors.coursePrice && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Price is required
                    </span>
                )}
            </div>

            {/* Course Category */}
            <div className='flex flex-col space-y-2'>
                <label className="text-sm text-richblack-5" htmlFor="courseCategory">
                    Course Category <sup className="text-pink-200">*</sup>
                </label>
                <select
                id='courseCategory'
                defaultValue=""
                className='form-style w-full'
                {...register("courseCategory",{required:true})}
                >
                    <option value={""} disabled>Choose a Category</option>    
                    {
                        !loading && courseCategories?.map((category,index)=>(
                            <option key={index} value={category?._id}>
                                {category?.name}
                            </option>
                        ))
                    }
                </select>
                {errors.courseCategory && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Category is required
                    </span>
                    )}
            </div>
              {/* Course Tags */}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />
 
            {/* Course Thumbnail Image */}
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />
            {/* Benefits of the course */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
                Benefits of the course <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                id="courseBenefits"
                placeholder="Enter benefits of the course"
                {...register("courseBenefits", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full"
                />
                {errors.courseBenefits && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Benefits of the course is required
                </span>
                )}
            </div>


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
  )}
}
export default CourseInformationForm
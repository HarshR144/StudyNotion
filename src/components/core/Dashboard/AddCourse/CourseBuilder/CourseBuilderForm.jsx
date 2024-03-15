import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { IoAddCircleOutline } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import { MdNavigateNext } from "react-icons/md"
import { setStep } from '../../../../slices/courseSlice'
import { setCourse, setEditCourse } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'
import NestedView from './NestedView'


const CourseBuilderForm = () => {
  
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors}
  }= useForm();
  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);
  const [editSectionName,setEditSectionName] = useState(null);
  const [loading,setLoading] = useState(false);
  
  const cancelEdit = ()=>{
    setEditSectionName(null);
    setValue("sectionName","");
  }
  
  const goBack = ()=>{
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }
  const goToNext= ()=>{
    if(course.courseContent.length==0){
      toast.error("Please add atleast one section");
      return;
    }
    if(course.courseContent.some((section)=>section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    //if everything is good
    dispatch(setStep(3));
  }

  const onSubmit = async(data)=>{
    setLoading(true);
    let result;
    if(editSectionName){
      result = await updateSection(
        {
          sectionName:data.sectionName,
          sectionId:editSectionName,
          courseId:course._id,

        },token)
    }
    else{
      result = await createSection({
        sectionName:data.sectionName,
        courseId:course._id,
      },token);
    }

    // update values
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","")
    }

    // loading false
    setLoading(false);
  }


  const handleChangeEditSectionName = (sectionId,sectionName)=>{
    if(editSectionName===sectionId){
      cancelEdit();
      return;
    }  
    
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);

  }
  return (
    <div className='text-white'>
      <p>
        Course Builder
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Section name <sup>*</sup></label>
          <input
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName",{required:true})}
            className='w-full'
          />
          {errors.sectionName && (
            <span>Section name is required</span>
          )}
        </div>
        <div>
          <IconBtn
            type="Submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={""}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
          {editSectionName &&(
            <button
            type='button'
            onClick={cancelEdit}
            className='text-sm text-richblack-300 underline'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.courseContent.length > 0 &&(
        <NestedView 
          handleChangeEditSectionName={handleChangeEditSectionName}
        />
      )}
      <div className='flex justify-end gap-x-3'>
          <button onClick={goBack}
          className='rounded-md cursor-pointer flex items-center'>
            Back
          </button>
          <IconBtn text="Next" onClick={goToNext}>
            <MdNavigateNext />
          </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm
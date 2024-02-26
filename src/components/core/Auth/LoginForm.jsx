import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    })
    const [showPassword, setShowPassword] = useState(false);
    const {email, password} = formData;

    const handleOnChange = (event)=>{
        setFormData((prevData)=>({
            ...prevData,
            [event.target.name]: event.target.value,
        }))
    }
    const handleOnSubmit = (event)=>{
        event.preventDefault();
        dispatch(login(email,password,navigate))
    }
    return (
        <div className=''> 
            <form 
                onSubmit={handleOnSubmit}
                className='flex w-full flex-col gap-y-4 mt-6'
                >  
                    <label className='w-full' >
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                            Email Address <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type='text'
                            name='email'
                            value={email}
                            onChange={handleOnChange}
                            placeholder='Enter email address'
                            style={{boxShadow:"inset 0px -1px 0px rgba(255,255,255,0.18)"}}
                            className='form-style w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                    </label>

                    
                    <label className='w-full relative' >
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                            Password <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            placeholder='Enter Password'
                            style={{boxShadow:"inset 0px -1px 0px rgba(255,255,255,0.18)"}}
                            className='form-style w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                        <span 
                        onClick={()=>setShowPassword((prev)=>!prev)}
                        className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
                            {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>)
                            :(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span>
                        
                        <Link to="/forgot-password">
                            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100 select-none">
                                Forgot Password
                            </p>
                        </Link>
                    </label>

                    <button type='submit'
                         className='mt-6 rounded-[8px] bg-yellow-50  py-[8px] px-[12px] font-medium text-richblack-900 '>
                        Sign In
                    </button>
            </form>
        </div>
  )
}

export default LoginForm
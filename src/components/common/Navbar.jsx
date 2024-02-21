import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { INSTRUCTOR } from '../../constants'
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { MdArrowDropDown } from "react-icons/md";
const subLink = [
    {
        title:"python",
        link:"catalog/python"
    },
    {
        title:"web-dev",
        link:"catalog/webdev"
    },
    
]

const Navbar = () => {

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart);
    const [subLinks,setSubLinks] = useState([]);

    // const fetchSublinks = async()=>{
    //     try{
    //         const result = await apiConnector("GET",categories.CATEGORIES_API);
    //         setSubLinks(result.data.data);
    //         console.log(result);
    //     }catch(error){
    //         console.log(error.message);
    //     }
    // }
    // useEffect(()=>{
    //     fetchSublinks();    
    // },[])

    const location = useLocation();
    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname)
    }
        
    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between mx-auto'>
                
                {/* Logo */}
                <Link to="/">
                    <img src={Logo} width={160} height={42} loading='lazy'/>
                </Link>
                
                {/* navlinks */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((element,index)=>{
                                return(
                                    <li key={index} >
                                        {
                                            element.title==="Catalog"? (
                                                <div className='flex items-center group relative'>
                                                    <p className=''> {element.title}</p>
                                                    <MdArrowDropDown style={{color:"white", fontSize:"1.2rem"}}/>
                                                    {/* dropdown */}
                                                    <div className='invisible absolute left-[50%] top-[50%] flex flex-col
                                                    rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-0 group-hover:visible group-hover:opacity-100 lg:w-[300px]
                                                    translate-x-[-50%] translate-y-[80%]
                                                    '>
                                                        <div className='absolute left-[55%] top-[-30%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                                        </div>

                                                        {
                                                            subLinks.length ? (
                                                                
                                                                    subLinks.map((sublink,index)=>(
                                                                        <Link to={`${sublink.link}`} key={index}>
                                                                            <p>{sublink.title}</p>
                                                                        </Link>
                                                                    ))
                                                                
                                                            )
                                                            :
                                                            (<div></div>)
                                                        }
                                                    </div>
                                                
                                                </div>
                                            )
                                            :(
                                                <Link to={element?.path}>
                                                    <p className={`${matchRoute(element?.path)? ("text-yellow-25"):("text-richblack-25")}`}  >
                                                        {element.title}
                                                    </p>
                                                </Link>
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                {/* login/signup/dashboard */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.role !==INSTRUCTOR && (
                            <Link to={"/dashboard/cart"} className="relative">
                                <AiOutlineShoppingCart/>
                                {
                                    totalItems > 0 && (
                                        <span>{totalItems}</span>
                                    )
                                }
                               
                            </Link>
                        )
                    }
                    {
                        token===null && (
                            <Link to={"/login"}>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                    text-richblack-100 rounded-md
                                '>
                                    Log In
                                </button>
                            </Link>
                        ) 
                    }
                    {
                        token === null &&(
                            <Link to={"/signup"}>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                    text-richblack-100 rounded-md
                                ' >
                                    Signup
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !==null && <ProfileDropDown/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
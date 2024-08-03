import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart ,AiOutlineMenu} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { MdArrowDropDown } from "react-icons/md";
import { ACCOUNT_TYPE } from '../../utils/constants'
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
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
    console.log(user);
})
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
    //     // setLoading(true);
    //     // fetchSublinks(); 
    //     // setLoading(false);   
    //     // console.log(subLinks);
    // },[subLinks])

    const location = useLocation();
    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname)
    }
        
    return (
        <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700
        ${location.pathname !== "/" ? "bg-richblack-800" : ""} transition-all duration-200`}>
            
            <div className='flex w-11/12 max-w-maxContent items-center justify-between mx-auto'>   
                {/* Logo */}
                <Link to="/">
                    <img src={Logo} width={160} height={42} loading='lazy' alt='logo'/>
                </Link>
                
                {/* navlinks */}
                <nav className='hidden md:block'>
                    <ul className='flex gap-x-6 text-richblack-25 '>
                        {
                            NavbarLinks.map((element,index)=>{
                                return(
                                    <li key={index} >
                                        {
                                            element.title==="Catalog"? (
                                                <div 
                                                className={`flex gap-1 cursor-pointer items-center group relative
                                                ${matchRoute("/catalog/:catalogName")?"text-yellow-25":"text-richblack-25"}
                                                `}>
                                                    <p className=''> {element.title}</p>
                                                    <MdArrowDropDown style={{color:"white", fontSize:"1.2rem"}}/>

                                                    {/* dropdown */}
                                                    <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3rem] 
                                                    flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150
                                                     group-hover:visible group-hover:translate-y-[1.65rem] group-hover:opacity-100 lg:w-[300px]
                                                    
                                                    '>
                                                        <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 rotate-45 translate-x-[80%] translate-y-[-40%] select-none rounded bg-richblack-5'>
                                                        </div>
                                                        {
                                                            loading?(
                                                                <p className='text-center'>Loading...</p>
                                                            )
                                                            :(subLinks && subLinks.length)?(
                                                                <div>
                                                                    {
                                                                        subLinks?.map((sublink,index)=>(
                                                                            <Link to={`/catalog/${sublink.name.split(" ").join("-").toLowerCase()}`}
                                                                            className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' key={index}
                                                                            >
                                                                                <p>{sublink.name}</p>
                                                                            </Link>
                                                                        ))}
                                                                </div>
                                                            )
                                                        

                                                        :(
                                                            <p className='text-center'>No Courses Found</p>
                                                        )}
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
                <div className='md:flex hidden gap-x-4 items-center'>
                        
                    {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to="/dashboard/cart" className="relative">
                        <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                        {totalItems > 0 && (
                            <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                            {totalItems}
                            </span>
                        )}
                        </Link>
                    )}
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
                {/* TODO mobile navbar */}
                <div className='mr-4 md:hidden'>
                    <AiOutlineMenu fontSize={24} fill="#AFB2BF"/>
                </div>
            </div>
        </div>
    )
}

export default Navbar
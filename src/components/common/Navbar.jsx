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
// const subLink = [
//     {
//         title:"python",
//         link:"catalog/python"
//     },
//     {
//         title:"web-dev",
//         link:"catalog/webdev"
//     },
    
// ]

const Navbar = () => {

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart);
    const [subLinks,setSubLinks] = useState([]);
    const [loading,setLoading] = useState(false);
    const location = useLocation();
    
    // const fetchSublinks = async()=>{
    //     try{
    //         const result = await apiConnector("GET",categories.CATEGORIES_API);
    //         setSubLinks(result.data.data);
    //         console.log(result);
    //     }catch(error){
    //         console.log(error.message);
    //     }
    // }
    
  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

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
                                            element.title==="Catalog"? 

                                            (<div className=' flex items-center group relative cursor-pointer'>
                                            <p>{element.title}</p>
                                            <svg width="25px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)" stroke="#000000" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.384"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#ffffff"></path> </g></svg>

                                            <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                                                <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5'></div>
                                                {
                                                    subLinks?.length < 0 ? (<div></div>) : (
                                                        subLinks?.map((element, index) => (
                                                            <Link  to={`/catalog/${element.name.split(" ").join("-").toLowerCase()}`} key={index} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50" >
                                                                <p className=''>
                                                                    {element?.name}
                                                                </p>
                                                            </Link>
                                                        ))
                                                    )

                                                }






                                            </div>



                                        </div>)



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
                            <span className=' shadow-sm shadow-black text-[10px] font-bold bg-yellow-100 text-richblack-900 rounded-full px-1 absolute -top-[5px] -right-[6px]'>
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
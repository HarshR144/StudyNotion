import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import {navbarLinks} from "../../data/navbar-links"


const Navbar = () => {
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
                            navbarLinks.map((element,index)=>{
                                return(
                                    <li key={index} >
                                        {
                                            element.title==="Catalog"? (
                                                <div></div>
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

                </div>
            </div>
        </div>
    )
}

export default Navbar
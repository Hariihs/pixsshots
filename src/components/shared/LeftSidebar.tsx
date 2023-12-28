import { Link, NavLink, useNavigate, useLocation } from "react-router-dom" 
import { FaPowerOff } from "react-icons/fa6";
import { RiCameraLensFill } from "react-icons/ri";
import { Button } from "../ui/button" 
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";


const LeftSidebar = () => { 

  const { pathname } = useLocation()
  const { mutate: signOut, isSuccess } = useSignOutAccount() 
  const navigate = useNavigate() 
  const { user } = useUserContext()  

  useEffect(() => {
    if(isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <div className="leftsidebar">
      <div className="flex flex-col gap-11"> 

      <div className="flex items-center justify-between">
        <Link to='/' className="flex gap-3 items-center">  
          <div className="flex items-center gap-1"> 
            <RiCameraLensFill fontSize="40px" color="silver" /> 
            <span className="text-amber-800 text-2xl font-black">P</span>
            <span className="text-yellow-700 text-2xl font-black">i</span>
            <span className="text-lime-700 text-2xl font-black">x</span>
            <span className="text-green-900 text-2xl font-black">S</span>
            <span className="text-teal-400 text-2xl font-black">h</span>
            <span className="text-cyan-700 text-2xl font-black">o</span>
            <span className="text-purple-700 text-2xl font-black">t</span>
            <span className="text-pink-700 text-2xl font-black">s</span>
          </div> 
        </Link>   
      </div>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img 
              src = {user.imageUrl || '/assets/icons/profile-placeholder.svg'}  
              alt = 'profilepicture' className="h-11 w-11 rounded-full"
            /> 
            <div className="flex flex-col">
              <p className="font-black">{ user.name }</p>   
              <p className="small-regular text-light-3">
                @{user?.username}  
              </p>             
            </div>
        </Link> 

        <ul className="flex flex-col gap-2">
          {
            sidebarLinks.map((link: INavLink) => { 
              const isActive = pathname === link.route
              return ( 
                <li key={link.label} 
                  className={`group leftsidebar-link ${isActive && 'bg-primary-500'}`}
                >
                  <NavLink to={link.route} 
                    className="flex gap-4 items-center p-3"
                  > 
                    <img 
                      src={link.imgURL} alt={link.label} 
                      className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                    />
                    { link.label }
                  </NavLink>
                </li>
              )
            })
          }
        </ul>
      </div> 
        
      <Button variant='ghost' className="shad-button_ghost"
        onClick={() => signOut()}
      > 
        <div className="flex items-center gap-1">
          <FaPowerOff color="silver" fontSize="20px" /> 
          <p className="text-lg lg:base-medium">Sign out</p>
        </div>
      </Button> 
     
      
    </div>
  )
}

export default LeftSidebar

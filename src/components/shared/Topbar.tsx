import { Link, useNavigate } from "react-router-dom"
import { RiCameraLensFill } from "react-icons/ri"; 
import { FaPowerOff } from "react-icons/fa6";
import { Button } from "../ui/button" 
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => { 

  const { mutate: signOut, isSuccess } = useSignOutAccount() 
  const navigate = useNavigate() 
  const { user } = useUserContext()  

  useEffect(() => {
    if(isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
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

        <div className="flex items-center gap-2.5"> 

          <Link to={`/profile/${user.id}`} className="flex-center gap-3" > 
            <img 
              src = {user.imageUrl || '/assets/icons/profile-placeholder.svg'}  
              alt = 'profilepicture' className="h-8 w-8 rounded-full"
            />
          </Link>  

          <Button variant='ghost' className="shad-button_ghost" onClick={() => signOut()}>
            <FaPowerOff color="silver" fontSize="25px" />
          </Button> 
        </div>

      </div>
    </section>
  )
}

export default Topbar

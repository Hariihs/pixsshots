import * as z from "zod" 
import { zodResolver } from "@hookform/resolvers/zod"  
import { useToast } from "@/components/ui/use-toast"


import { Form, FormControl, FormField, FormItem, FormLabel,
  FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"; 
import { useForm } from "react-hook-form";
import { SignUpValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext" 
import { RiCameraLensFill } from "react-icons/ri";

const SignUpForm = () => {  

  const navigate = useNavigate()
  const { toast } = useToast() 
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount(); 

  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: { 
      name: '',
      username: '', 
      email: '',
      password: ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    const newUser = await createUserAccount(values)  
    
    if(!newUser){
      return toast({ title: "Sign up failed. Please try again." })
    } 

    const session = await signInAccount({
      email: values.email,
      password: values.password
    }) 

    if(!session){
      return toast({ title: "Sign in failed. Please try again." })
    } 

    const isLoggedIn = await checkAuthUser(); 

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      return toast({ title: "Sign in failed. Please try again.", });
    }

  }

  return (
    <Form {...form}> 
      
      <div className="sm:w-420 flex-center flex-col"> 

        <div className="flex items-center gap-1 text-2xl mb-4"> 
          <RiCameraLensFill fontSize="30px" color="beige" /> 
          <span className="text-amber-800 font-black">P</span>
          <span className="text-yellow-700 font-black">i</span>
          <span className="text-lime-700 font-black">x</span>
          <span className="text-green-900 font-black">S</span>
          <span className="text-teal-400 font-black">h</span>
          <span className="text-cyan-700 font-black">o</span>
          <span className="text-purple-700 font-black">t</span>
          <span className="text-pink-700 font-black">s</span>
        </div>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use  
            <span>
              <span className="text-amber-800 font-medium"> P</span>
              <span className="text-yellow-700 font-medium">i</span>
              <span className="text-lime-700 font-medium">x</span>
              <span className="text-green-900 font-medium">S</span>
              <span className="text-teal-400 font-medium">h</span>
              <span className="text-cyan-700 font-medium">o</span>
              <span className="text-purple-700 font-medium">t</span>
              <span className="text-pink-700 font-medium">s</span>
            </span>
          , Please create an account
        </p>

        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "SIGN UP"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignUpForm

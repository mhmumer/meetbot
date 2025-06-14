'use client'

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Logo from "@/assets/logo.png"
import {z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { OctagonAlertIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { se } from "date-fns/locale"
import { FaGoogle } from "react-icons/fa6";
import { Github } from 'lucide-react';

const formSchema = z.object({
    name:z.string().min(1, {message: "Name is required"}),
    email: z.string().email(),
    password:z.string().min(1,{message: "Password is required"}),
    confirmPassword:z.string().min(1,{message: "Password is required"}),

})
.refine((data)=> data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export const SignUpView = () => {
    const router=useRouter()
    const [pending, setPending] = useState(false)   
    const [error, setError] = useState<string | null>(null)

    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    })
    const onSubmit =  (data:z.infer<typeof formSchema>)=>{
        setError(null)
        setPending(true)

       authClient.signUp.email(
            {name:data.name, email:data.email, password:data.password},
            {
                onSuccess: () => {
                    setPending(false)
                    router.push("/")
                },
                onError: ({error}) => {
                     setPending(false)
                    setError(error.message)
                },

            }
        )

        

    
    }
    return(
        <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0 bg-[#FBE4D8]">
            <CardContent className="grid p-0 md:grid-cols-2">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} action="" className="p-6 md:p-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-2xl font-bold">Let&apos;s Get Started</h1>
                            <p className="text-muted-foreground text-balance">Create your account</p>
                        </div>
                        <div className="grid gap-3">
                            <FormField control={form.control} name="name" render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Muhammad Umer" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                        <div className="grid gap-3">
                            <FormField control={form.control} name="email" render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="m@example.com" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                        <div className="grid gap-3">
                            <FormField control={form.control} name="password" render={({field})=>(
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="**********" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                        <div className="grid gap-3">
                            <FormField control={form.control} name="confirmPassword" render={({field})=>(
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="**********" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                        {!!error &&(
                            <Alert className="bg-destructive/10 border-none">
                                <OctagonAlertIcon className="h-4 w-4 !text-destructive"/>
                                <AlertTitle>{error}</AlertTitle>
                            </Alert>
                        )}
<Button
  type="submit"
  disabled={pending}
  className={`w-full flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold transition-all duration-300 ${
    pending
      ? "bg-[#06141B] text-[#FBE4D8]/70 cursor-not-allowed"
      : "bg-[#06141B] text-[#FBE4D8] hover:bg-[#0a1e29] hover:shadow-md"
  }`}
>
  {pending ? (
    <>
      <span className="relative flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBE4D8]/40 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FBE4D8]"></span>
      </span>
      Creating Account...
    </>
  ) : (
    "Sign Up"
  )}
</Button>
                        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t ">
                                <span className="bg-[#FBE4D8] text-muted-foreground relative z-10 px-4 font-mono">Or continue with</span>
                        </div>
                       <div className="flex justify-center">
                         <div className="flex gap-3">
                           <Button
                             variant="outline"
                             type="button"
                             disabled={pending}
                             className="group relative w-24 h-12 rounded-xl border border-gray-300 bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary"
                           >
                             <FaGoogle className="w-5 h-5 text-gray-700 transition-colors duration-300 group-hover:text-primary" />
                             <span className="sr-only">Sign in with Google</span>
                           </Button>
                       
                           <Button
                             variant="outline"
                             type="button"
                             disabled={pending}
                             className="group relative w-24 h-12 rounded-xl border border-gray-300 bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-gray-800"
                           >
                             <Github className="w-5 h-5 text-gray-700 transition-colors duration-300 group-hover:text-black" />
                             <span className="sr-only">Sign in with GitHub</span>
                           </Button>
                         </div>
                       </div>
                        <div className="text-center text-sm">Already have an account{" "} <Link href="/sign-in" className="underline underline-offset-2">
                                Sign In
                        </Link></div>
                    </div>
                </form>
                </Form>
                <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                    <Image src={Logo} alt={"Logo"} className="h-[110px] w-[112px] -mb-4" />
                    <p className="text-3xl font-semibold text-green-200/50">
                        SYNTRA

                      
                    </p>
                    
                </div>
            </CardContent>
        </Card>
         <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-2">
            By clicking continue, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.

         </div>
         <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-2 -mt-2">
            Powered By <a href="https://xpandli.vercel.app/" target="_blank" rel="noopener" className="underline">Xpandli</a> 
            
         </div>
        </div>
    )
}
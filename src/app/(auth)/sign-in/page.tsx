import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { redirect } from "next/navigation";

const Page =async ()=>{
    const session = await auth.api.getSession({
        headers:await headers(),
    })
    if (!!session){
        redirect("/dashboard");
    }
    return(
     
<SignInView/>
    )
}

export default Page;
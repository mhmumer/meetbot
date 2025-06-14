import { Merriweather } from "next/font/google";

const merri = Merriweather({
    weight: ["400", "700"],
    style: ["normal", "italic"],
  subsets: ["latin"],
});


interface Props{
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {
    return(
       <div className={`bg-muted flex items-center justify-center min-h-svh flex-col p-6 md:p-10 ${merri.className} bg-[#eddfcd] text-[#06141B]`}>
            <div className="w-full max-w-sm md:max-w-3xl ">
            {children}
        </div>
        </div>
    )
}
export default Layout;
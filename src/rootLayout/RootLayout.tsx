import { Outlet, useLocation } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
import { Tables } from "../utils/database";
import { useEffect, useState } from "react";

const RootLayout = () => {
    const [heroProps, setHeroProps] = useState<Tables<'recipes'> | null>(null);
    const location = useLocation();

    useEffect(() => { 
        if (location.pathname === "/") { 
            setHeroProps(null);
         }
      }, [location]); /* reset to matching banner img */

    return ( 
        <>
        <HeaderNav heroProps={heroProps}/>
        <main>
            <Outlet context={{setHeroProps}}/>
        </main>
        <Footer/>
        </>
     );
}
 
export default RootLayout;
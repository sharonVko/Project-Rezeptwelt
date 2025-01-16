import { Outlet } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";

const RootLayout = () => {
    return ( 
        <>
        <HeaderNav/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
        </>
     );
}
 
export default RootLayout;
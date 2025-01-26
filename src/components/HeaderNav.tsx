import { Link } from "react-router-dom";
import Hero from "./Hero";
import { Tables } from "../utils/database";
import { useUserContext } from "../UserContext";
import { supabase } from "../utils/setupSupabase";

interface HeaderNavProps { heroProps?: Tables<'recipes'> | null; }

const HeaderNav:React.FC<HeaderNavProps> = ({heroProps}) => {
    const {user, setUser} = useUserContext();

    const handleLogout = async() => {
        await supabase.auth.signOut();
        setUser(null);
        console.log('Logout successful');
        
    }

    return ( 
        <>
        <header className="bg-yellow-300 pt-4">
            <div className="bg-white flex items-end justify-between py-3 pl-28 pr-10">
            <img src="/RezeptweltLogo.svg" alt="Logo" />
            <nav className="flex gap-4 font-bold">
                <Link to={'/'}>Home</Link>
                <Link to={'/recipes'}>Rezepte</Link>
                <Link to={'/aboutUs'}>Über uns</Link>
                {user? (
                    <button onClick={handleLogout}>Logout</button> ) :(
                <Link className="pl-16" to={'/login'}>Login</Link>
                )}
            </nav>
            </div>
        </header>
        <Hero heroProps={heroProps}/>
        </>
     );
}
 
export default HeaderNav;
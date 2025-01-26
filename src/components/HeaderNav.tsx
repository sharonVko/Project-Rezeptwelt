import { Link, useNavigate, useLocation } from 'react-router-dom';
import Hero from "./Hero";
import { Tables } from "../utils/database";
import { useUserContext } from "../UserContext";
import { supabase } from "../utils/setupSupabase";

interface HeaderNavProps { heroProps?: Tables<'recipes'> | null; }

const HeaderNav:React.FC<HeaderNavProps> = ({heroProps}) => {
    const {user, setUser} = useUserContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async() => {
        await supabase.auth.signOut();
        setUser(null);
        console.log('Logout successful');
        navigate('/');
    }

    const isActive = (path: string) => location.pathname === path;
    return ( 
        <>
        <header className="bg-yellow-300 pt-4">
            <div className="bg-white flex items-end justify-between py-3 pl-28 pr-10">
            <img src="/RezeptweltLogo.svg" alt="Logo" />
            <nav className="flex gap-4 font-bold">
                <Link to={'/'} className={isActive('/') ? 'text-gray-500' : ''}>Home</Link>
                <Link to={'/recipes'} className={isActive('/recipes') ? 'text-gray-500' : ''}>Rezepte</Link>
                <Link to={'/aboutUs'} className={isActive('/aboutUs')? 'text-gray-500' : ''}>Über uns</Link>
                {user? (
                    <>
                    <Link to={'/dashboard'} className={isActive('/dashboard')? 'text-gray-500' : ''}>Dashboard</Link>
                    <button onClick={handleLogout} className="pl-16">Logout</button>
                    </> ) :(
                <Link to={'/login'} className={isActive('/login') ? 'text-gray-500' : ''} >Login</Link>
                )}
            </nav>
            </div>
        </header>
        <Hero heroProps={heroProps}/>
        </>
     );
}
 
export default HeaderNav;
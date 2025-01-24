import React, { useRef, useState } from "react";
import { supabase } from "../utils/setupSupabase";
import { useUserContext } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";


const Loginpage = () => {
    const usernameRef = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);

    const [userFeedback, setUserFeedback] = useState<string | null>(null)
    const [isError, setIsError] = useState<boolean>(false);

    const navigate = useNavigate();

    const {setUser} = useUserContext()

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Hier lesen wir die aktuellen Werte aus den Inputs aus, und übermitteln sie an signInWithPassword
        const result = await supabase.auth.signInWithPassword({
            email:usernameRef.current.value,
            password: passwordRef.current.value,
        });
        //falls es einen user gibt, übermitteln wir ihn an den context
        if(result.data.user) {
            setUser(result.data.user);
            setUserFeedback("Willkommen zurück! Dein Login war erfolgreich.");
            setIsError(false);
            setTimeout(() => {
                navigate('dashboard');
            }, 4000);
             // wenn erfolgreich -> Wechsel zu userprofiledashboard
        } else {
            console.error('Login failed',result.error);
            setUserFeedback("Sorry! Der Login ist fehlgeschlagen.Bitte überprüfe dein Passwort und deine e-mail Adresse.");
            setIsError(true);
        }
        // was auch immer wir zurückbekommen, wir loggen es
        console.dir(result)
    };
    /* const handleRegister = async () => {
        const result = await supabase.auth.signUp({
            email: usernameRef.current.value,
            password: passwordRef.current.value,
        });
        if (result.error) {
            console.error('Registration failed',result.error);
            setUserFeedback("Sorry, die Registrierung ist fehlgeschlagen!");
            setIsError(true);
        } else {
            console.log(result);
            setUserFeedback("Glückwunsch!Die Registrierung war erfolgreich!");
            setIsError(false)
        }
        
    } */


    return ( 
        <div className="p-8 border-2 border-yellow-300 bg-stone-100 rounded-md m-6 text-center">
            {userFeedback && <p className={`text-xl font-semibold mb-4 ${isError? "text-red-700" : "text-black"}`}>{userFeedback}</p>}
            <form className="flex flex-col gap-8" onSubmit={handleSubmit} >
                <div>
                <input className="border-2 border-yellow-300 rounded-md p-2 mr-4"
                type="text" 
                placeholder="username" 
                name="username" 
                ref={usernameRef} />
                <input className="border-2 border-yellow-300 rounded-md p-2 mr-4"
                type="password" 
                placeholder="password" 
                name="password" 
                ref={passwordRef}  />
                </div>
                <div>
                <button className="bg-green-400 text-white py-2 px-5 rounded-2xl border -4 border-yellow-300" >Log In</button>
                <div className="flex gap-2 justify-center py-3">
                <p>Noch kein User?</p>
                <Link className="text-blue-600" to={'/signup'}>Registriere dich hier </Link>
                </div>
                </div>
            </form>

        </div>
     );
}
 
export default Loginpage;
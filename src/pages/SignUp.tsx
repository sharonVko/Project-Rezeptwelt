import { FormEvent, useState } from "react";
import { supabase } from "../utils/setupSupabase";
import { useNavigate } from "react-router-dom";
//wir schreiben den type hier bevor wir die datasupabase aktualisieren
type TUser = {
    email: string,
    password: string,
    options?:{
        data:{
        first_name:string,
        last_name: string,
        user_name: string,
    }
    }
}

const SignUp = () => {

    const [userFeedback, setUserFeedback] = useState<string | null>(null)
    const [isError, setIsError] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
/* wir erzeugen hier alternativ das objekt vorher und übergeben es unten zum fetch */
        const user: TUser = {
            
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
            options:{
                data:{
                    first_name: event.currentTarget.first_name.value,
                    last_name: event.currentTarget.last_name.value,
                    user_name: event.currentTarget.user_name.value,
                }
            }
        }
        const result = await supabase.auth.signUp(user)
        console.log(user);
        console.log(result);
        
        if (result.data.user) {
            setUserFeedback("Glückwunsch!Die Registrierung war erfolgreich!");
            setIsError(false)
            navigate('/dashboard')
        } else {
            console.error('Registration failed',result.error);
            setUserFeedback("Sorry, die Registrierung ist fehlgeschlagen!");
            setIsError(true);
        }
    }

    return ( 
        <div>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="user_name">Username</label>
                    <input type="text" name="user_name"  />
                </div>
                <div>
                    <label htmlFor="first_name">Vorname</label>
                    <input type="text" name="first_name"  />
                </div>
                <div>
                    <label htmlFor="last_name">Nachname</label>
                    <input type="text" name="last_name"  />

                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"  />
                </div>
                <div>
                    <label htmlFor="password">Passwort</label>
                    <input type="password" name="password" />
                </div>
                {/* register button for new users */}
                
                <button type="submit" className="bg-blue-400 text-white py-2 px-5 rounded-2xl ml-4 border -4 border-yellow-300">Register</button>
            </form>
        </div>
     );
}
 
export default SignUp;
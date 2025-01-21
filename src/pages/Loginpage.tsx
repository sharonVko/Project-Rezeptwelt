import React, { useRef } from "react";
import { supabase } from "../utils/setupSupabase";
import { useUserContext } from "../UserContext";

const Loginpage = () => {
    const usernameRef = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);

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
        } else {
            console.error(result.error);
        }
        // was auch immer wir zurückbekommen, wir loggen es
       /*  console.dir(result) */
    };


    return ( 
        <div className="p-8 border-2 border-gray-400 rounded-md m-6">
            <form onSubmit={handleSubmit} >
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

                <button className="bg-green-400 py-2 px-5 rounded-2xl" >Log In</button>

            </form>

        </div>
     );
}
 
export default Loginpage;
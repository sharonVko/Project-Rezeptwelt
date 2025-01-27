import { useEffect, useState } from "react";
import CreateRecipeForm from "../components/CreateRecipeForm";
import { supabase } from "../utils/setupSupabase";


interface IUserDashboard{
    email: string,
    first_name: string,
    last_name: string,
    created_at: string,
    updated_at:string,
    last_sign_in_at: string,
    /* [key:string]:string |number|boolean|null; */ // Flexibilität für das Interface, für zusätzliche Eigenschaften, die nicht festgelegt wurden, aber hinzu kommen könnten
}
const UserDashboard = () => {

const [member, setMember] = useState<IUserDashboard |null>(null);
const [isLoading, setIsLoading] = useState<boolean>(true)


useEffect(() => {
    const getUserInfo = async ()=> {
        setIsLoading(true);
        
        const { data:{session}, error } = await supabase.auth.getSession()// 1. fetch für Daten aus auth users table
        
        console.log(session, error);
        if (session) {
        const {data:memberData, error: memberError} = await supabase // 2. fetch für Daten aus profiles table
        .from('profiles')
        .select('*') 
        .eq('id', session.user.id) 
        .single();
        
        
        console.log(memberData, memberError);

        setMember({
            email: session.user.email ?? "",
            first_name: memberData?.first_name ?? "", // aus profiles table
            last_name: memberData?.last_name ?? "",
            created_at: session?.user.created_at ?? "",
            updated_at: session?.user.updated_at ?? "", 
            last_sign_in_at: session?.user.last_sign_in_at ??  "", // aus auth table
            
        });
        setIsLoading(false);
    }
    };
    getUserInfo();
}, []);


    return (
        <div className="text-center max-w-md mx-auto">
            <h2 className="headline">Dein Dashboard</h2>         
            <section className="loginfo bg-yellow-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="input-base bg-white flex flex-col gap-3">
                <h2 className="text-xl font-bold text-gray-900">User-Profil</h2>
                {isLoading ? ( <p>Loading...</p> ) : ( <>
                    <p className="mt-2 text-gray-800"><strong>E-Mail:</strong> {member?.email}</p>
                    <p className="mt-1 text-gray-800"><strong>Vorname:</strong> {member?.first_name}</p>
                    <p className="mt-1 text-gray-800"><strong>Nachname:</strong>{member?.last_name}</p>
                        <div className="mt-4 text-gray-700 text-left">
                            <p><strong>Angelegt am:</strong>{member?.created_at}</p>
                            <p><strong>Zuletzt geändert am:</strong>{member?.updated_at}</p>
                            <p><strong>Zuletzt eingeloggt am:</strong>{member?.last_sign_in_at}</p>
                        </div> </>
                        )}
                </div>
            </section>
      
        <CreateRecipeForm/>
        </div>
    );
}
 
export default UserDashboard;
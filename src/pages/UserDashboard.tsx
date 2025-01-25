import CreateRecipeForm from "../components/CreateRecipeForm";

const UserDashboard = () => {
    return (
        <div className="text-center max-w-md mx-auto">
            <h2 className="font-semibold">Dein Dashboard</h2>
            <section className="loginfo bg-yellow-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="input-base bg-white flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-gray-900">User-Profil</h2>
                    <p className="mt-2 text-gray-800"><strong>E-Mail:</strong> user@example.com</p>
                    <p className="mt-1 text-gray-800"><strong>Vorname:</strong> Max</p>
                    <p className="mt-1 text-gray-800"><strong>Nachname:</strong> Mustermann</p>
                        <div className="mt-4 text-gray-700 text-left">
                            <p><strong>Angelegt am:</strong> 24. Januar 2025, 15:00 Uhr</p>
                            <p><strong>Zuletzt geändert am:</strong> 25. Januar 2025, 12:00 Uhr</p>
                            <p><strong>Zuletzt eingeloggt am:</strong> 25. Januar 2025, 15:20 Uhr</p>
                        </div>
                </div>
            </section>
       
        
       
        
        <CreateRecipeForm/>
        </div>
    );
}
 
export default UserDashboard;
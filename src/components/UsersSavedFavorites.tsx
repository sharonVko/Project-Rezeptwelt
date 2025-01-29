import { useEffect, useState } from "react";
import { supabase } from "../utils/setupSupabase";
import { Link } from "react-router-dom";

interface IUsersRecipeProps{
    id: string;
    name: string;
    description: string;
    image_url: string;
}

const UsersSavedFavorites: React.FC = () => {
    const [userFavorites, setUserFavorites]= useState<IUsersRecipeProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getFavorites = async () => {
            const {data: user} = await supabase.auth.getUser();
            console.log('user: ',user);
            
            if(!user) {
                console.error('User not logged in!');
                return;
            }

            const userId: string | undefined = user.user?.id;
            console.log('user id: ', userId);
            
            if(!userId){
                console.error('User ID is undefined!');
                return;    
            }

            
            const {data, error} = await supabase
            .from('recipe_favorites')
            .select('recipe_id, recipes(id, name, description, image_url)' )
            .eq('user_id', userId);
            
            console.log('fetched data: ', data);
            console.log('error: ', error);
            
            if(error) {
                console.error('Error fetching users favorites: ', error);
                
            } else{
                const recipes: IUsersRecipeProps[] = data.map((favorite: any) => ({
                    id:favorite.recipes.id,
                    name: favorite.recipes.name,
                    description: favorite.recipes.description,
                    image_url: favorite.recipes.image_url 
                })
            );
                setUserFavorites(recipes);
            }
            setLoading(false);
        };
        getFavorites();
    }, []);

    return ( 
        <section className="favorites bg-yellow-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold text-gray-900 text-center">Deine Favoriten</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="favorite-list">
          {userFavorites.map((recipe) => (
            <li key={recipe.id} className="favorite-item flex gap-4 p-2 bg-white border border-yellow-400 rounded-2xl">
              <img
                src={recipe.image_url}
                alt={recipe.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{recipe.name}</h3>
                <p className="text-gray-700">{recipe.description}</p>
                <Link to={`/details/${recipe.id}`} className="btn-yellow">Zum Rezept</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
     );
}
 
export default UsersSavedFavorites;
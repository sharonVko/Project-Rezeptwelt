import { useEffect, useState } from "react";
import FavoriteRecipeCard from "./FavoriteRecipeCard";
import { supabase } from "../utils/setupSupabase";
import { Tables } from "../utils/database";

/* type Recipe = Tables<'recipes'> */
const FavoriteRecipesSection = () => {

    const [favRecipes, setFavRecipes] = useState<Tables<'recipes'>[] | null> ([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFavRecipes = async () => {
            setLoading(true);
            try {
                const {data, error} = await supabase.from('recipes')
                .select('*')
                .order('created_at')
                .limit(3);
                console.log(data);
                
                if(error) {
                    console.error('fetching favorite recipes failed', error)
                } else {
                    setFavRecipes(data || []);
                }
                
            } catch (error) {
                console.error(error);
            } finally{
                setLoading(false)
            }
        };
        fetchFavRecipes()
    }, []);

    return ( 
        <section className="text-center mb-14">
            <h2 className="headline font-bold text-[1.5rem] pb-6">Die beliebtesten Rezepte</h2>
            {loading ? (
                <p>Your favorite Recipes are loading  ☕️ ...</p>
            ) : (
                <div className="favcard-sect flex justify-center gap-8">
                {favRecipes?.map((favRecipe) => (
                    <div key={favRecipe.id}>
                        <FavoriteRecipeCard favRecipe={favRecipe}/>
                    </div>
            ))}
            </div>
            )}
        </section>
     );
}
 
export default FavoriteRecipesSection;
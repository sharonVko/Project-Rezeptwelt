import { useEffect, useState } from "react";
import FavoriteRecipesSection from "../components/FavoriteRecipesSection";
import LatestRecipecard from "../components/LatestRecipecard";
import { Tables } from "../utils/database";
import { supabase } from "../utils/setupSupabase";

/* interface IRecipePageProps{
    latestRecipe: Tables<'recipes'>
} */

const Recipepage = () => {

    const [latestRecipes, setLatestRecipes]= useState<Tables<'recipes'> [] | null>([]);
    const [loading, setLoading]= useState<boolean>(true);

    useEffect(() => {
        const fetchLatestRecipes = async () => {
            setLoading(true);
            try {
                const {data, error} = await supabase.from('recipes')
                .select('*')
                .order('created_at')
                .limit(3);
                console.log(data);
                
                if(error) {
                    console.error('fetching latest recipes failed', error)
                }  else {
                    setLatestRecipes(data || [])
                }   
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        };
        fetchLatestRecipes()
    }, []);

    return ( 
        <div className="recipepage p-4 text-center">
            <FavoriteRecipesSection/>
                <h2 className="headline font-bold text-[1.5rem] pb-6" >Neueste Rezepte</h2>
            <section className="latestsection pl-6">
                {loading ? (
                    <p>Our latest Recipes are loading ☕️ ... </p>
                ) : (
                        latestRecipes?.map((latestRecipe)=> (
                            <LatestRecipecard key={latestRecipe.id} latestRecipe={latestRecipe}/>
                        ))
                    )}
            </section>
        </div>
     );
}
 
export default Recipepage;
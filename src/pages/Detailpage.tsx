/* const Detailpage = () => {
    return ( 
        <section className="pl-10">
            <h2>detailpage</h2>
            <h6 className="text-lg font-semibold pb-2">Zutaten</h6>
            <ul>
                <li>quantity unit ingredient - from ingedient table </li>
            </ul>
            <h6 className="text-lg font-semibold pb-2">Zubereitung</h6>
            
            <p>recipe instructions of recipes table</p>
            <h6 className="text-lg font-semibold pb-2">Zusätzliche Informationen of additinal info -ingredients table</h6>
        </section>
     );
}
 
export default Detailpage; */

import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { supabase } from "../utils/setupSupabase";
import { Tables } from "../utils/database";

interface OutletContext { 
    setHeroProps: React.Dispatch<React.SetStateAction<Tables<'recipes'> | null>>; }

const Detailpage = () => {
  const { recipe_id } = useParams<{ recipe_id: string }>();
  const [recipe, setRecipe] = useState<Tables<'recipes'> | null>(null);
  const [ingredients, setIngredients] = useState<Tables<'ingredients'>[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { setHeroProps } = useOutletContext<OutletContext>();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipe_id) {
         console.error("Recipe ID is undefined");
          setLoading(false);
           return;
         };

      setLoading(true);
      try {
        const { data: recipeData, error: recipeError } = await supabase
          .from("recipes")
          .select("*")
          .eq("id", recipe_id)
          .single();
        if (recipeError) {
          console.error("Fetching recipe failed", recipeError);
        } else {
          console.log("Fetched Recipe:", recipeData);
          setRecipe(recipeData);
          setHeroProps(recipeData); //  Hero-Props for dynamic img!
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const { data: ingredientsData, error: ingredientsError } = await supabase
          .from("ingredients")
          .select("*")
          .eq("recipe_id", recipe_id);
        if (ingredientsError) {
          console.error("Fetching ingredients failed", ingredientsError);
        } else {
          console.log("Fetched Ingredients:", ingredientsData);
          setIngredients(ingredientsData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipe_id, setHeroProps]);

  return (
    <div>
        
      {loading ? (
        <p>Loading ☕️ ...</p>
      ) : (
        <>
         
          <section className="pl-10">
            <h2>Detailpage</h2>
            <h6 className="text-lg font-semibold pb-2">Zutaten</h6>
            <ul>
              {ingredients?.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
            <h6 className="text-lg font-semibold pb-2">Zubereitung</h6>
            <p>{recipe?.instructions}</p>
            <h6 className="text-lg font-semibold pb-2">
              Zusätzliche Informationen
            </h6>
            <p>Servings: {recipe?.servings}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default Detailpage;

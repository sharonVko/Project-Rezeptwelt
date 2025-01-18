import { Link } from "react-router-dom";
import { Tables } from "../utils/database";

interface FavoriteRecipeCardProps {
    favRecipe: Tables<'recipes'>
}
 
const FavoriteRecipeCard:React.FC<FavoriteRecipeCardProps> = ({favRecipe}) => {
    return ( 
        <article className="favcard border-2 border-slate-100 rounded-xl w-80">
            <img src="{favRecipe.image_url}" alt={`${favRecipe.name} image`} />
            <div className="p-8 text-start bg-slate-100">
                <p className="text-xl font-bold pb-2">{favRecipe.name}</p>
                <p className="pb-4 text-xs text-wrap pr-8">{favRecipe.description}</p>
                <Link className="btn-yell bg-yellow-300 py-2 px-5 rounded-2xl" to={'/details'}>Zum Rezept</Link>
            </div>
        </article>
     );
}
 
export default FavoriteRecipeCard;
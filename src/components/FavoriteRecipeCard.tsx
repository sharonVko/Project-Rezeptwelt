import { Link } from "react-router-dom";
import { Tables } from "../utils/database";

interface IFavoriteRecipeCardProps {
    favRecipe: Tables<'recipes'>
}
 
const FavoriteRecipeCard:React.FC<IFavoriteRecipeCardProps> = ({favRecipe}) => {
    return ( 
        <article className="favcard border-2 border-slate-100 rounded-3xl w-72 h-96 mb-6">
            <img className="h-[220px] w-full rounded-t-3xl" src={`${favRecipe?.image_url}`} alt={favRecipe.name} />
            <div className=" p-8 text-start bg-slate-100 rounded-3xl">
                <p className="text-xl font-bold pb-2">{favRecipe.name}</p>
                <p className="pb-4 text-xs text-wrap pr-8">{favRecipe.description}</p>
                <Link className="btn-yell bg-yellow-300 py-2 px-5 rounded-2xl" to={`/details/${favRecipe.id}`}>Zum Rezept</Link>
            </div>
        </article>
     );
}
 
export default FavoriteRecipeCard;
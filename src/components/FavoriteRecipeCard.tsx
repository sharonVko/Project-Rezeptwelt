import { Link } from "react-router-dom";

interface FavoriteRecipeCardProps {
    
}
 
const FavoriteRecipeCard:React.FC<FavoriteRecipeCardProps> = () => {
    return ( 
        <article className="favcard border-2 border-gray-500 rounded-xl ">
            <img src="" alt="recipe name" />
            <div className="p-8 text-start bg-slate-100">
                <p className="text-xl font-bold">recipe</p>
                <p className="pb-3 text-xs">description</p>
                <Link className="btn-yell bg-yellow-300 py-2 px-5 rounded-2xl" to={'/details'}>Zum Rezept</Link>
            </div>
        </article>
     );
}
 
export default FavoriteRecipeCard;
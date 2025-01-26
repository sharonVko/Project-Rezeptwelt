import { Link } from "react-router-dom";
import { Tables } from "../utils/database";

interface ILatestRecipecardProps{
    latestRecipe: Tables<'recipes'>
}
 
     const LatestRecipecard: React.FC<ILatestRecipecardProps> = ({ latestRecipe }) => {
        return (
            <article className="flex items-center mb-6 mx-auto rounded-3xl shadow-lg overflow-hidden h-48 w-3/4 max-w-4xl">
                <div className="h-full w-48 flex-shrink-0">
                    <img className="h-full w-full object-cover" src={`${latestRecipe.image_url}`} alt="Food image" />
                </div>
                <div className="bg-slate-100 text-start pl-6 pt-12 pr-14 rounded-r-3xl h-full w-full max-w-4xl">
                    <p className="text-lg font-semibold pb-4">{latestRecipe.name}</p>
                    <p className="text-xs pb-8">{latestRecipe.description}</p>
                    <Link className="btn-yellow" to={`/details/${latestRecipe.id}`}>Zum Rezept</Link>
                </div>
            </article>
        );
    }
     
export default LatestRecipecard;
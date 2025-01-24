import { Link } from "react-router-dom";
import { Tables } from "../utils/database";

interface ILatestRecipecardProps{
    latestRecipe: Tables<'recipes'>
}

const LatestRecipecard:React.FC<ILatestRecipecardProps> = ({latestRecipe}) => {
    return ( 
        <article className="flex mb-6   ">
            <img className="h-[220px] w-[260px] rounded-l-3xl" src={`${latestRecipe.image_url}`} alt="Food image" />
                <div className="bg-slate-100 text-start pl-6 pt-12 pr-14 rounded-r-3xl">
                    <p className="text-lg font-semibold pb-4">{latestRecipe.name}</p>
                    <p className="text-xs pb-8">{latestRecipe.description}</p>
                    <Link className="btn-yellow" to={`/details/${latestRecipe.id}`}>Zum Rezept</Link>
                </div>
        </article>
     );
}
 
export default LatestRecipecard;
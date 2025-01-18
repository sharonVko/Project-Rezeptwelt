import { Link } from "react-router-dom";
import { Tables } from "../utils/database";

interface ILatestRecipecardProps{
    latestRecipe: Tables<'recipes'>
}

const LatestRecipecard:React.FC<ILatestRecipecardProps> = ({latestRecipe}) => {
    return ( 
        <article className="flex py-4">
            <img src="/cupIcon.png" alt="Food image" />
                <div className="bg-slate-100 text-start px-4 py-6">
                    <p className="text-lg pb-4">{latestRecipe.name}</p>
                    <p className="text-xs pb-4">description  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, corporis! </p>
                    <Link to={'/recipes'}>Zum Rezept</Link>
                </div>
        </article>
     );
}
 
export default LatestRecipecard;
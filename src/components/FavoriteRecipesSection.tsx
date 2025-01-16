import FavoriteRecipeCard from "./FavoriteRecipeCard";

interface FavoriteRecipesSectionProps {
    
}
 
const FavoriteRecipesSection:React.FC<FavoriteRecipesSectionProps> = () => {
    return ( 
        <section className="text-center mb-14">
            <h2 className="headline font-bold text-[1.5rem] pb-6">Die beliebtesten Rezepte</h2>
            <div className="favcard-sect flex justify-center gap-8">
                <FavoriteRecipeCard/>
                <FavoriteRecipeCard/>
                <FavoriteRecipeCard/>
            </div>
        </section>
     );
}
 
export default FavoriteRecipesSection;
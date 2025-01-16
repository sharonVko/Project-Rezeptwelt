import FavoriteRecipesSection from "../components/FavoriteRecipesSection";
import LatestRecipecard from "../components/LatestRecipecard";

const Recipepage = () => {
    return ( 
        <div className="recipepage p-4 text-center">
            <h2 className="headline">recipepage</h2>
            <FavoriteRecipesSection/>
            <section className="latestsection">
                <h3>Neueste Rezepte</h3>
                <LatestRecipecard/>
                <LatestRecipecard/>
                <LatestRecipecard/>
            </section>
        </div>
     );
}
 
export default Recipepage;
import React, { FormEvent, useRef, useState } from "react";
import { supabase } from "../utils/setupSupabase";

const CreateRecipeForm = () => {
  const [addIngredients, setAddIngredients] = useState([
    { name: "", quantity: 0, unit: "", additional_info: "" },
  ]);
  const [isUploaded, setIsUploaded] = useState<string | null>(null);

  const categoryRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const instructionsRef = useRef<HTMLInputElement>(null);
  const servingsRef = useRef<HTMLInputElement>(null);
  const imgFileRef = useRef<HTMLInputElement>(null);

  const handleAddedIngredients = () => {
    setAddIngredients((prev) => [
      ...prev,
      { name: "", quantity: 0, unit: "", additional_info: "" },
    ]);
  };

  const handleChangedIngredients = (index: number, field: string, value: string | number) => {
    const updatedIngredients = addIngredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    setAddIngredients(updatedIngredients);
  };

  const handleImgUpload = async (): Promise<string | null> => {
    const file = imgFileRef.current?.files?.[0];
    if (!file) {
      setIsUploaded("No file selected");
      return null;
    }

    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("upload-recipe-images")
      .upload(fileName, file);

    if (error) {
      setIsUploaded(`IMG upload failed: ${error.message}`);
      return null;
    } else {
      setIsUploaded("IMG upload successful!");
      return supabase.storage.from("upload-recipe-images").getPublicUrl(data.path).data.publicUrl;
    }
  };

  const submitNewRecipe = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const imgUrl = await handleImgUpload();
    if (!imgUrl) {
      alert("IMG upload failed! Sorry for the inconvenience. Please try again.");
      return;
    }

    const category_id = categoryRef.current?.value || "";
    const name = nameRef.current?.value || "";
    const description = descRef.current?.value || "";
    const instructions = instructionsRef.current?.value || "";
    const servings = servingsRef.current?.value ? parseInt(servingsRef.current.value) : 0;

    const recipe = {
      category_id,
      name,
      description,
      instructions,
      servings,
      image_url: imgUrl,
    };

    const { data: newRecipeData, error: newRecipeError } = await supabase
      .from("recipes")
      .insert([recipe])
      .select("id");

    if (newRecipeError) {
      alert(`Error saving new recipe: ${newRecipeError.message}`);
      return;
    }

    const recipeId = newRecipeData[0].id;

    const ingredientsTiedToRecipeId = addIngredients.map((ingredient) => ({
      ...ingredient,
      recipe_id: recipeId,
    }));
    const { data: ingredientsData, error: ingredientsError } = await supabase
      .from("ingredients")
      .insert(ingredientsTiedToRecipeId);

    if (ingredientsError) {
      alert(`Error saving ingredients: ${ingredientsError.message}`);
      return;
    }

    console.log("New recipe and ingredients saved successfully!", newRecipeData, ingredientsData);
    alert("New recipe saved successfully!");
  };

  return (
    <div className="max-w-md mx-auto mt-8 h-[1200px]">
      <h3 className="headline">Erstelle ein neues Rezept</h3>
      <form className="bg-yellow-50 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitNewRecipe}>
        <div className="mb-4">
          <label className="lbl-base" htmlFor="category">
            Kategorie
          </label>
          <select className="input-base" name="category" id="category" ref={categoryRef}>
            <option value="">Bitte wähle eine Kategorie aus</option>
            <option value="9b47b4ce-39f7-4bce-a6ae-e066b980f0d4">Frühstück</option>
            <option value="42c32c66-6a7b-4e08-b105-9f82307c6303">Brunch</option>
            <option value="3b9a1fd2-4bf4-489d-a427-9d6854c25d0a">Dinner</option>
            <option value="76feb8ab-30b0-4c41-b7bb-acebee7b5126">Salate</option>
            <option value="f61a17a0-b8ce-496a-8594-53307241b204">Desserts</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="lbl-base" htmlFor="name">
            Rezept Name
          </label>
          <input
            className="input-base"
            id="name"
            type="text"
            name="name"
            placeholder="Bitte füge einen Titel hinzu"
            ref={nameRef}
          />
        </div>
        <div className="mb-4">
          <label className="lbl-base" htmlFor="description">
            Beschreibung
          </label>
          <input
            className="input-base"
            id="description"
            type="text"
            name="description"
            placeholder="Bitte füge eine Beschreibung hinzu"
            ref={descRef}
          />
        </div>
        {addIngredients.map((ingredient, index) => (
          <div key={index} className="mb-4">
            <label className="lbl-base" htmlFor={`ingredient-${index}`}>
              Zutat
            </label>
            <input
              className="input-base"
              id={`ingredient-${index}`}
              type="text"
              name="ingredient"
              placeholder="Bitte füge eine Zutat hinzu"
              value={ingredient.name}
              onChange={(e) => handleChangedIngredients(index, "name", e.target.value)}
            />
            <label className="lbl-base" htmlFor={`quantity-${index}`}>
              Menge
            </label>
            <input
              className="input-base"
              id={`quantity-${index}`}
              type="text"
              name="quantity"
              placeholder="Bitte füge eine Menge hinzu"
              value={ingredient.quantity}
              onChange={(e) => handleChangedIngredients(index, "quantity", parseInt(e.target.value))}
            />
            <label className="lbl-base" htmlFor={`unit-${index}`}>
              Einheit
            </label>
            <select
              className="input-base"
              id={`unit-${index}`}
              name="unit"
              value={ingredient.unit}
              onChange={(e) => handleChangedIngredients(index, "unit", e.target.value)}
            >
              <option value="">Bitte wähle eine Einheit aus</option>
              <option value="liter">Liter</option>
              <option value="gram">Gramm</option>
              <option value="cup">Tasse(n)</option>
              <option value="tspoon">Teelöffel</option>
              <option value="spoon">Eßlöffel</option>
              <option value="dash">Prise</option>
            </select>
            
          </div>
        ))}
        <button className="btn-yellow" type="button" onClick={handleAddedIngredients}>
          Weitere Zutat hinzufügen
        </button>
        <div className="mb-4">
          <label className="lbl-base" htmlFor="instructions">
            Zubereitung
          </label>
          <input
            className="input-base"
            id="instructions"
            type="text"
            name="instructions"
            placeholder="Bitte füge Schritte hinzu"
            ref={instructionsRef}
          />
        </div>
        <div className="mb-4">
          <label className="lbl-base" htmlFor="servings">
            Portionen
          </label>
          <input
            className="input-base"
            id="servings"
            type="text"
            name="servings"
            placeholder="Bitte füge die Portionenanzahl hinzu"
            ref={servingsRef}
          />
        </div>
        <div className="mb-4">
          <label className="lbl-base" htmlFor="additional_info">
            Zusätzliche Informationen
          </label>
          <input
            className="input-base"
            id="additional_info"
            type="text"
            name="additional_info"
            placeholder="Hier kannst du Infos hinzufügen (optional)"
          />
        </div>
        <div className="mb-4">
          <label className="lbl-base" htmlFor="image">
            Foto
          </label>
          <input
                 className="input-base lbl-base"
                 id="image"
                 type="file"
                 name="image"
                 accept="image/*"
             />
        </div>
                    <div>
                        <button type="submit" className="btn-yellow">Rezept hochladen</button>
                    </div>
        </form>
        </div> 
     );
}
 
export default CreateRecipeForm;

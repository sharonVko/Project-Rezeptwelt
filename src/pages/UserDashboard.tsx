
const UserDashboard = () => {
    return (
        
        <div className="max-w-md mx-auto mt-8">
        <h3 className="font-semibold text-center pb-4">Erstelle ein neues Rezept</h3>
        <form className="bg-yellow-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
						/>
					</div>
                    <div className="mb-4">
						<label className="lbl-base" htmlFor="quantity">
							Menge
						</label>
						<input
							className="input-base"
							id="quantity"
							type="text"
							name="quantity"
							placeholder="Bitte füge eine Menge hinzu"
						/>
					</div>
                    <div className="mb-4">
						<label className="lbl-base" htmlFor="unit">
							Einheit
						</label>
						<select className="input-base" name="unit" id="unit">
                            <option value="">Bitte wähle eine Einheit aus</option>
                            <option value="liter">Liter</option>
                            <option value="gram">Gramm</option>
                            <option value="cup">Tasse(n)</option>
                            <option value="tspoon">Teelöffel</option>
                            <option value="spoon">Eßlöffel</option>
                            <option value="dash">Prise</option>
                            
                        </select>
					</div>
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
						/>
					</div>

        </form>
        </div> 
        
     );
}
 
export default UserDashboard;
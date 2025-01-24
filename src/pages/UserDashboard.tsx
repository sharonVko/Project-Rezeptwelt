
const UserDashboard = () => {
    return (
        
        <div className="max-w-md mx-auto mt-8">
        <h3 className="font-semibold text-center pb-4">Erstelle ein neues Rezept</h3>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
							Recipe Name
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							name="name"
							placeholder="Please enter recipe title"
						/>
					</div>
                    <div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
							Description
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							name="name"
							placeholder="Please enter a description"
						/>
					</div>

        </form>
        </div> 
        
     );
}
 
export default UserDashboard;
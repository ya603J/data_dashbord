function RecipeList({ recipes, onSelectRecipe }) {
  if (recipes.length === 0) {
    return null;
  }

  return (
    <div className="recipe-dashboard">
      <h2>Recipe Dashboard ({recipes.length})</h2>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Recipes</h3>
          <p>{recipes.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average Missing Ingredients</h3>
          <p>{(recipes.reduce((acc, recipe) => acc + recipe.missedIngredientCount, 0) / recipes.length).toFixed(1)}</p>
        </div>
        <div className="stat-card">
          <h3>Average Used Ingredients</h3>
          <p>{(recipes.reduce((acc, recipe) => acc + recipe.usedIngredientCount, 0) / recipes.length).toFixed(1)}</p>
        </div>
      </div>
      
      <div className="dashboard-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Recipe Name</th>
              <th>Used Ingredients</th>
              <th>Missing Ingredients</th>
              <th>Likes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id} className="recipe-row">
                <td><img src={recipe.image} alt={recipe.title} className="recipe-thumbnail" /></td>
                <td>{recipe.title}</td>
                <td>{recipe.usedIngredientCount}</td>
                <td>{recipe.missedIngredientCount}</td>
                <td>{recipe.likes || 0}</td>
                <td>
                  <button 
                    onClick={() => onSelectRecipe(recipe.id)}
                    className="view-details-btn"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecipeList; 
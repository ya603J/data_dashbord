function RecipeList({ recipes, onSelectRecipe }) {
  if (recipes.length === 0) {
    return null;
  }

  return (
    <div className="recipe-results">
      <h2>Recipes Found ({recipes.length})</h2>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="recipe-card" 
            onClick={() => onSelectRecipe(recipe.id)}
          >
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <div className="recipe-info">
              <p>{recipe.usedIngredientCount} ingredients used</p>
              <p>{recipe.missedIngredientCount} ingredients missing</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList; 
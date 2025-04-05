function RecipeDetail({ recipe, onBack }) {
  if (!recipe) {
    return null;
  }

  return (
    <div className="recipe-details">
      <button className="back-button" onClick={onBack}>
        ← Back to results
      </button>
      <h2>{recipe.title}</h2>
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="recipe-detail-image" 
      />
      
      <div className="recipe-info-box">
        <div className="recipe-stats">
          <div className="stat">
            <span className="stat-value">{recipe.readyInMinutes}</span>
            <span className="stat-label">Minutes</span>
          </div>
          <div className="stat">
            <span className="stat-value">{recipe.servings}</span>
            <span className="stat-label">Servings</span>
          </div>
          <div className="stat">
            <span className="stat-value">{recipe.healthScore}</span>
            <span className="stat-label">Health Score</span>
          </div>
        </div>
      </div>

      <div className="recipe-section">
        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h3>Instructions</h3>
        <div 
          dangerouslySetInnerHTML={{ __html: recipe.instructions }} 
          className="recipe-instructions"
        />
      </div>

      {recipe.diets && recipe.diets.length > 0 && (
        <div className="recipe-section">
          <h3>Diets</h3>
          <div className="diet-tags">
            {recipe.diets.map((diet, index) => (
              <span key={index} className="diet-tag">
                {diet}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail; 
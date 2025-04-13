import { useState, useEffect } from 'react';
import { isFavorite, addToFavorites, removeFromFavorites } from '../services/api';
import DashboardCharts from './DashboardCharts';

function RecipeList({ recipes, onSelectRecipe, onFavoriteToggle }) {
  const [favorites, setFavorites] = useState({});
  const [showCharts, setShowCharts] = useState(false);

  // Load favorite status for all recipes
  useEffect(() => {
    const favoritesMap = {};
    recipes.forEach(recipe => {
      favoritesMap[recipe.id] = isFavorite(recipe.id);
    });
    setFavorites(favoritesMap);
  }, [recipes]);

  const handleFavoriteToggle = (recipe, e) => {
    e.stopPropagation(); // Prevent triggering row selection
    
    const isFav = favorites[recipe.id];
    if (isFav) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
    
    // Update state
    setFavorites(prev => ({
      ...prev,
      [recipe.id]: !isFav
    }));

    // Notify parent component
    if (onFavoriteToggle) {
      onFavoriteToggle();
    }
  };

  const toggleCharts = () => {
    setShowCharts(!showCharts);
  };

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
        <div className="stat-card">
          <h3>Favorited Recipes</h3>
          <p>{Object.values(favorites).filter(Boolean).length}</p>
        </div>
      </div>
      
      <div className="charts-toggle">
        <button 
          className={`toggle-charts-button ${showCharts ? 'active' : ''}`}
          onClick={toggleCharts}
        >
          {showCharts ? 'Hide Charts' : 'Show Charts'}
        </button>
      </div>
      
      {showCharts && <DashboardCharts recipes={recipes} />}
      
      <div className="dashboard-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Recipe Name</th>
              <th>Used Ingredients</th>
              <th>Missing Ingredients</th>
              <th>Likes</th>
              <th>Favorite</th>
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
                    onClick={(e) => handleFavoriteToggle(recipe, e)}
                    className={`favorite-btn ${favorites[recipe.id] ? 'favorited' : ''}`}
                    aria-label={favorites[recipe.id] ? "Remove from favorites" : "Add to favorites"}
                  >
                    {favorites[recipe.id] ? '❤️' : '🤍'}
                  </button>
                </td>
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
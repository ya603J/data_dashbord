import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';
const FAVORITES_KEY = 'recipe_search_favorites';

export const searchRecipesByIngredients = async (ingredients) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/recipes/findByIngredients`,
      {
        params: {
          apiKey: API_KEY,
          ingredients,
          number: 12,
          ranking: 1,
          ignorePantry: true
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/recipes/${id}/information`,
      {
        params: {
          apiKey: API_KEY,
          includeNutrition: true
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Favorites management functions
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addToFavorites = (recipe) => {
  try {
    const favorites = getFavorites();
    // Only add if not already in favorites
    if (!favorites.some(fav => fav.id === recipe.id)) {
      // Store essential recipe info to save space
      const recipeToSave = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        missedIngredientCount: recipe.missedIngredientCount,
        usedIngredientCount: recipe.usedIngredientCount,
        likes: recipe.likes || 0,
        addedAt: new Date().toISOString()
      };
      
      const updatedFavorites = [...favorites, recipeToSave];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
};

export const removeFromFavorites = (recipeId) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
};

export const isFavorite = (recipeId) => {
  try {
    const favorites = getFavorites();
    return favorites.some(recipe => recipe.id === recipeId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
}; 
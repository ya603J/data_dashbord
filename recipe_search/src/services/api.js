import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

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
          apiKey: API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}; 
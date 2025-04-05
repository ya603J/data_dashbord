import { useState } from 'react'
import './App.css'
import RecipeSearch from './components/RecipeSearch'
import RecipeList from './components/RecipeList'
import RecipeDetail from './components/RecipeDetail'
import { searchRecipesByIngredients, getRecipeDetails } from './services/api'

function App() {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [error, setError] = useState(null)

  const handleSearch = async (ingredients, callback) => {
    setError(null)
    
    try {
      const data = await searchRecipesByIngredients(ingredients)
      setRecipes(data)
      setSelectedRecipe(null)
    } catch (error) {
      setError('Failed to fetch recipes. Please try again later.')
      console.error('API Error:', error)
    } finally {
      if (callback) callback()
    }
  }

  const handleSelectRecipe = async (id) => {
    setError(null)
    
    try {
      const data = await getRecipeDetails(id)
      setSelectedRecipe(data)
    } catch (error) {
      setError('Failed to fetch recipe details. Please try again later.')
      console.error('API Error:', error)
    }
  }

  const handleBackToResults = () => {
    setSelectedRecipe(null)
  }

  return (
    <div className="app">
      <header>
        <h1>Recipe Finder</h1>
        <p>Find recipes based on ingredients you have at home</p>
      </header>

      <RecipeSearch onSearch={handleSearch} />
      
      {error && <div className="error">{error}</div>}
      
      {!selectedRecipe && (
        <RecipeList 
          recipes={recipes} 
          onSelectRecipe={handleSelectRecipe} 
        />
      )}
      
      {selectedRecipe && (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onBack={handleBackToResults} 
        />
      )}

      <footer>
        <p>Data provided by <a href="https://spoonacular.com/food-api" target="_blank" rel="noopener noreferrer">Spoonacular Food API</a></p>
      </footer>
    </div>
  )
}

export default App

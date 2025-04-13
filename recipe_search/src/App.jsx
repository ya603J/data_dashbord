import { useState, useEffect } from 'react'
import './App.css'
import RecipeSearch from './components/RecipeSearch'
import RecipeList from './components/RecipeList'
import RecipeDetail from './components/RecipeDetail'
import { searchRecipesByIngredients, getRecipeDetails, getFavorites } from './services/api'

function App() {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [missedIngredientsFilter, setMissedIngredientsFilter] = useState('all')
  const [customMissedIngredients, setCustomMissedIngredients] = useState('')
  const [likesFilter, setLikesFilter] = useState(0)
  const [sortBy, setSortBy] = useState('default')
  const [sortOrder, setSortOrder] = useState('asc')
  const [viewMode, setViewMode] = useState('search') // 'search' or 'favorites'
  const [favorites, setFavorites] = useState([])

  // Load favorites on mount and when viewMode changes to favorites
  useEffect(() => {
    if (viewMode === 'favorites') {
      setFavorites(getFavorites());
    }
  }, [viewMode]);

  useEffect(() => {
    if (recipes.length > 0) {
      let filtered = recipes;
      
      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(recipe => 
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Filter by missed ingredients
      if (missedIngredientsFilter !== 'all') {
        if (missedIngredientsFilter === 'custom' && customMissedIngredients) {
          const maxMissed = parseInt(customMissedIngredients);
          if (!isNaN(maxMissed)) {
            filtered = filtered.filter(recipe => recipe.missedIngredientCount <= maxMissed);
          }
        } else {
          const maxMissed = parseInt(missedIngredientsFilter);
          filtered = filtered.filter(recipe => recipe.missedIngredientCount <= maxMissed);
        }
      }
      
      // Filter by minimum likes
      if (likesFilter > 0) {
        filtered = filtered.filter(recipe => (recipe.likes || 0) >= likesFilter);
      }
      
      // Sort recipes if sorting is enabled
      if (sortBy !== 'default') {
        filtered = [...filtered].sort((a, b) => {
          let compareResult = 0;
          
          switch (sortBy) {
            case 'name':
              compareResult = a.title.localeCompare(b.title);
              break;
            case 'likes':
              compareResult = (a.likes || 0) - (b.likes || 0);
              break;
            case 'missing':
              compareResult = a.missedIngredientCount - b.missedIngredientCount;
              break;
            case 'used':
              compareResult = a.usedIngredientCount - b.usedIngredientCount;
              break;
            default:
              break;
          }
          
          return sortOrder === 'asc' ? compareResult : -compareResult;
        });
      }
      
      setFilteredRecipes(filtered);
    }
  }, [recipes, searchQuery, missedIngredientsFilter, customMissedIngredients, likesFilter, sortBy, sortOrder])

  const handleSearch = async (ingredients, callback) => {
    setError(null)
    setLoading(true)
    setViewMode('search')
    
    try {
      const data = await searchRecipesByIngredients(ingredients)
      setRecipes(data)
      setFilteredRecipes(data)
      setSelectedRecipe(null)
    } catch (error) {
      setError('Failed to fetch recipes. Please try again later.')
      console.error('API Error:', error)
    } finally {
      setLoading(false)
      if (callback) callback()
    }
  }

  const handleSelectRecipe = async (id) => {
    setError(null)
    setLoading(true)
    
    try {
      const data = await getRecipeDetails(id)
      setSelectedRecipe(data)
    } catch (error) {
      setError('Failed to fetch recipe details. Please try again later.')
      console.error('API Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBackToResults = () => {
    setSelectedRecipe(null)
  }

  const handleSearchFilter = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleMissedIngredientsFilter = (e) => {
    setMissedIngredientsFilter(e.target.value)
  }

  const handleCustomMissedIngredients = (e) => {
    setCustomMissedIngredients(e.target.value)
  }

  const handleLikesFilterChange = (e) => {
    setLikesFilter(parseInt(e.target.value))
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value)
  }

  const toggleViewMode = (mode) => {
    setViewMode(mode);
    if (mode === 'favorites') {
      // Refresh favorites when switching to favorites view
      const currentFavorites = getFavorites();
      setFavorites(currentFavorites);
      setSelectedRecipe(null);
    }
  };

  // Handle favorite deletion in favorites view
  const refreshFavorites = () => {
    setFavorites(getFavorites());
  };

  return (
    <div className="app">
      <header>
        <h1>Recipe Finder Dashboard</h1>
        <p>Find recipes based on ingredients you have at home</p>
      </header>

      {!selectedRecipe && (
        <div className="view-mode-toggle">
          <button 
            className={`mode-button ${viewMode === 'search' ? 'active' : ''}`}
            onClick={() => toggleViewMode('search')}
          >
            Search Results
          </button>
          <button 
            className={`mode-button ${viewMode === 'favorites' ? 'active' : ''}`}
            onClick={() => toggleViewMode('favorites')}
          >
            Favorites
          </button>
        </div>
      )}

      {viewMode === 'search' && !selectedRecipe && <RecipeSearch onSearch={handleSearch} />}
      
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
      
      {viewMode === 'search' && !selectedRecipe && recipes.length > 0 && (
        <div className="dashboard-filters">
          <div className="filter-row">
            <div className="filter-item">
              <input
                type="text"
                placeholder="Search recipes by name..."
                value={searchQuery}
                onChange={handleSearchFilter}
                className="dashboard-search-input"
              />
            </div>
            
            <div className="filter-item">
              <label htmlFor="missed-ingredients">Missing Ingredients:</label>
              <select 
                id="missed-ingredients" 
                value={missedIngredientsFilter}
                onChange={handleMissedIngredientsFilter}
                className="filter-select"
              >
                <option value="all">All Recipes</option>
                <option value="1">1 or less</option>
                <option value="2">2 or less</option>
                <option value="3">3 or less</option>
                <option value="5">5 or less</option>
                <option value="custom">Custom value</option>
              </select>
            </div>

            {missedIngredientsFilter === 'custom' && (
              <div className="filter-item">
                <label htmlFor="custom-missed">Max Missing Ingredients:</label>
                <input
                  type="number"
                  id="custom-missed"
                  min="0"
                  value={customMissedIngredients}
                  onChange={handleCustomMissedIngredients}
                  className="filter-number-input"
                  placeholder="Enter number"
                />
              </div>
            )}
          </div>
          
          <div className="filter-row">
            <div className="filter-item">
              <label htmlFor="likes-filter">Minimum likes recieved:</label>
              <div className="range-with-value">
                <input
                  type="range"
                  id="likes-filter"
                  min="0"
                  max="100"
                  value={likesFilter}
                  onChange={handleLikesFilterChange}
                  className="filter-range"
                />
                <span className="range-value">{likesFilter}</span>
              </div>
            </div>

            <div className="filter-item">
              <label htmlFor="sort-by">Sort by:</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={handleSortChange}
                className="filter-select"
              >
                <option value="default">Default</option>
                <option value="name">Recipe Name</option>
                <option value="likes">Likes</option>
                <option value="missing">Missing Ingredients</option>
                <option value="used">Used Ingredients</option>
              </select>
            </div>

            <div className="filter-item">
              <label htmlFor="sort-order">Order:</label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={handleSortOrderChange}
                className="filter-select"
                disabled={sortBy === 'default'}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
          
          <div className="filter-summary">
            Showing {filteredRecipes.length} of {recipes.length} recipes
          </div>
        </div>
      )}
      
      {viewMode === 'search' && !selectedRecipe && (
        <RecipeList 
          recipes={filteredRecipes} 
          onSelectRecipe={handleSelectRecipe}
          onFavoriteToggle={refreshFavorites}
        />
      )}

      {viewMode === 'favorites' && !selectedRecipe && (
        <>
          <h2>Your Favorite Recipes</h2>
          {favorites.length === 0 ? (
            <div className="empty-favorites">
              <p>You haven't saved any recipes yet.</p>
              <p>Click the heart icon on a recipe to add it to your favorites.</p>
            </div>
          ) : (
            <RecipeList 
              recipes={favorites} 
              onSelectRecipe={handleSelectRecipe}
              onFavoriteToggle={refreshFavorites}
            />
          )}
        </>
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

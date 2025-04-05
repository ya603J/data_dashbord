import { useState } from 'react';

function RecipeSearch({ onSearch }) {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!ingredients.trim()) {
      setError('Please enter at least one ingredient');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    onSearch(ingredients, () => setLoading(false));
  };

  return (
    <div className="recipe-search">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (separate with commas)</label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. apples, flour, sugar"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Find Recipes'}
        </button>
      </form>
      
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default RecipeSearch; 
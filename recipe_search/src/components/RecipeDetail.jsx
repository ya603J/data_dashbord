import { useState, useEffect } from 'react';
import { isFavorite, addToFavorites, removeFromFavorites } from '../services/api';

function RecipeDetail({ recipe, onBack }) {
  const [isFav, setIsFav] = useState(false);
  
  useEffect(() => {
    if (recipe) {
      setIsFav(isFavorite(recipe.id));
    }
  }, [recipe]);

  const handleFavoriteToggle = () => {
    if (isFav) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
    setIsFav(!isFav);
  };

  if (!recipe) {
    return null;
  }

  // Extract key nutrients for display
  const keyNutrients = [];
  const nutritionMetrics = {};
  
  if (recipe.nutrition && recipe.nutrition.nutrients) {
    // For bar chart
    const nutrientsToShow = ['Calories', 'Protein', 'Fat', 'Carbohydrates', 'Fiber', 'Sugar'];
    nutrientsToShow.forEach(name => {
      const nutrient = recipe.nutrition.nutrients.find(n => n.name === name);
      if (nutrient) {
        keyNutrients.push(nutrient);
      }
    });
    
    // For radar chart
    const metricsToShow = [
      { name: 'Protein', maxValue: 50, dailyValue: 50 },
      { name: 'Fiber', maxValue: 30, dailyValue: 25 },
      { name: 'Vitamin C', maxValue: 90, dailyValue: 90 },
      { name: 'Vitamin A', maxValue: 900, dailyValue: 900 },
      { name: 'Iron', maxValue: 18, dailyValue: 18 },
      { name: 'Calcium', maxValue: 1300, dailyValue: 1000 }
    ];
    
    metricsToShow.forEach(metric => {
      const nutrient = recipe.nutrition.nutrients.find(n => n.name === metric.name);
      if (nutrient) {
        // Calculate percentage of daily value (maximum 100%)
        const percentage = Math.min(100, (nutrient.amount / metric.dailyValue) * 100);
        nutritionMetrics[metric.name] = {
          value: nutrient.amount,
          unit: nutrient.unit,
          percentage
        };
      } else {
        nutritionMetrics[metric.name] = {
          value: 0,
          unit: 'mg',
          percentage: 0
        };
      }
    });
  }
  
  // Generate radar chart coordinates
  const metrics = Object.keys(nutritionMetrics);
  const metricsCount = metrics.length;
  const hasMetrics = metricsCount > 0;
  
  // Calculate points for radar chart
  const calculateRadarPoints = (percentages, size = 100) => {
    if (metricsCount === 0) return '';
    
    const center = size / 2;
    const radius = size * 0.4; // 40% of container size
    
    return metrics.map((metric, i) => {
      const angle = (Math.PI * 2 * i) / metricsCount - Math.PI / 2;
      const value = percentages[metric] / 100;
      const x = center + radius * value * Math.cos(angle);
      const y = center + radius * value * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="recipe-details">
      <button className="back-button" onClick={onBack}>
        ← Back to results
      </button>
      
      <div className="recipe-header">
        <h2>{recipe.title}</h2>
        <button 
          onClick={handleFavoriteToggle}
          className={`favorite-btn detail-favorite ${isFav ? 'favorited' : ''}`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
      
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

      <div className="nutrition-charts-container">
        {keyNutrients.length > 0 && (
          <div className="recipe-section nutrition-section">
            <h3>Nutrition Information</h3>
            <div className="nutrition-chart">
              {keyNutrients.map((nutrient, index) => (
                <div key={index} className="nutrition-bar-container">
                  <div className="nutrition-label">
                    {nutrient.name} ({nutrient.unit})
                  </div>
                  <div className="nutrition-bar-wrapper">
                    <div 
                      className="nutrition-bar"
                      style={{ 
                        width: `${Math.min(100, (nutrient.amount / (nutrient.name === 'Calories' ? 2000 : 100)) * 100)}%`,
                        backgroundColor: getNutrientColor(nutrient.name)
                      }}
                    >
                      <span className="nutrition-value">{nutrient.amount.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasMetrics && (
          <div className="recipe-section radar-section">
            <h3>Nutritional Balance</h3>
            <div className="radar-chart-container">
              <div className="radar-chart">
                {/* Background circles */}
                <svg viewBox="0 0 100 100" className="radar-background">
                  <circle cx="50" cy="50" r="40" className="radar-circle" />
                  <circle cx="50" cy="50" r="30" className="radar-circle" />
                  <circle cx="50" cy="50" r="20" className="radar-circle" />
                  <circle cx="50" cy="50" r="10" className="radar-circle" />
                  
                  {/* Axis lines */}
                  {metrics.map((metric, i) => {
                    const angle = (Math.PI * 2 * i) / metricsCount - Math.PI / 2;
                    const x = 50 + 40 * Math.cos(angle);
                    const y = 50 + 40 * Math.sin(angle);
                    return (
                      <line 
                        key={metric} 
                        x1="50" 
                        y1="50" 
                        x2={x} 
                        y2={y} 
                        className="radar-axis" 
                      />
                    );
                  })}
                  
                  {/* Axis labels */}
                  {metrics.map((metric, i) => {
                    const angle = (Math.PI * 2 * i) / metricsCount - Math.PI / 2;
                    const x = 50 + 48 * Math.cos(angle);
                    const y = 50 + 48 * Math.sin(angle);
                    return (
                      <text 
                        key={metric} 
                        x={x} 
                        y={y} 
                        dominantBaseline="middle" 
                        textAnchor="middle" 
                        className="radar-label"
                      >
                        {metric}
                      </text>
                    );
                  })}
                </svg>
                
                {/* Data polygon */}
                <svg viewBox="0 0 100 100" className="radar-data">
                  <polygon 
                    points={calculateRadarPoints(
                      Object.fromEntries(
                        metrics.map(metric => [metric, nutritionMetrics[metric].percentage])
                      )
                    )} 
                    className="radar-polygon" 
                  />
                  
                  {/* Data points */}
                  {metrics.map((metric, i) => {
                    const angle = (Math.PI * 2 * i) / metricsCount - Math.PI / 2;
                    const value = nutritionMetrics[metric].percentage / 100;
                    const x = 50 + 40 * value * Math.cos(angle);
                    const y = 50 + 40 * value * Math.sin(angle);
                    return (
                      <circle 
                        key={metric} 
                        cx={x} 
                        cy={y} 
                        r="2" 
                        className="radar-point" 
                      />
                    );
                  })}
                </svg>
              </div>
              
              <div className="radar-legend">
                <h4>Nutrition Profile</h4>
                <div className="radar-metrics">
                  {metrics.map(metric => (
                    <div key={metric} className="radar-metric">
                      <span className="radar-metric-name">{metric}:</span>
                      <span className="radar-metric-value">
                        {nutritionMetrics[metric].value.toFixed(1)} {nutritionMetrics[metric].unit} 
                        ({nutritionMetrics[metric].percentage.toFixed(0)}% DV)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
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

// Helper function to get different colors for nutrient bars
function getNutrientColor(nutrientName) {
  switch (nutrientName) {
    case 'Calories':
      return '#FF9500';
    case 'Protein':
      return '#34C759';
    case 'Fat':
      return '#FF3B30';
    case 'Carbohydrates':
      return '#007AFF';
    case 'Fiber':
      return '#5856D6';
    case 'Sugar':
      return '#FF2D55';
    default:
      return '#8E8E93';
  }
}

export default RecipeDetail; 
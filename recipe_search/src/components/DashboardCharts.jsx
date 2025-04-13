import { useState } from 'react';

function DashboardCharts({ recipes }) {
  const [activeChart, setActiveChart] = useState('missingIngredients');
  
  if (!recipes || recipes.length === 0) {
    return null;
  }
  
  // Data for Missing Ingredients Distribution
  const missingIngredientsCounts = recipes.reduce((acc, recipe) => {
    const count = recipe.missedIngredientCount;
    acc[count] = (acc[count] || 0) + 1;
    return acc;
  }, {});
  
  const missingIngredientsData = Object.keys(missingIngredientsCounts)
    .sort((a, b) => Number(a) - Number(b))
    .map(count => ({
      count: Number(count),
      recipes: missingIngredientsCounts[count]
    }));
  
  // Data for Likes Distribution
  const likeRanges = {
    '0-10': 0,
    '11-25': 0,
    '26-50': 0,
    '51-100': 0,
    '100+': 0
  };
  
  recipes.forEach(recipe => {
    const likes = recipe.likes || 0;
    if (likes <= 10) likeRanges['0-10']++;
    else if (likes <= 25) likeRanges['11-25']++;
    else if (likes <= 50) likeRanges['26-50']++;
    else if (likes <= 100) likeRanges['51-100']++;
    else likeRanges['100+']++;
  });
  
  const likesData = Object.entries(likeRanges).map(([range, count]) => ({
    range,
    count
  }));
  
  // Calculate max value for scaling
  const getMaxValue = (data, valueKey) => {
    return Math.max(...data.map(item => item[valueKey]));
  };
  
  const missingIngredientsMaxValue = getMaxValue(missingIngredientsData, 'recipes');
  const likesMaxValue = getMaxValue(likesData, 'count');
  
  return (
    <div className="dashboard-charts">
      <div className="chart-tabs">
        <button 
          className={`chart-tab ${activeChart === 'missingIngredients' ? 'active' : ''}`}
          onClick={() => setActiveChart('missingIngredients')}
        >
          Missing Ingredients Distribution
        </button>
        <button 
          className={`chart-tab ${activeChart === 'likes' ? 'active' : ''}`}
          onClick={() => setActiveChart('likes')}
        >
          Likes Distribution
        </button>
      </div>
      
      <div className="chart-container">
        {activeChart === 'missingIngredients' && (
          <div className="chart missing-ingredients-chart">
            <h3>Recipe Count by Missing Ingredients</h3>
            <div className="chart-bars">
              {missingIngredientsData.map(item => (
                <div key={item.count} className="chart-bar-group">
                  <div 
                    className="chart-bar"
                    style={{
                      height: `${(item.recipes / missingIngredientsMaxValue) * 200}px`
                    }}
                  >
                    <span className="bar-value">{item.recipes}</span>
                  </div>
                  <div className="bar-label">{item.count}</div>
                </div>
              ))}
            </div>
            <div className="chart-axis-label">Number of Missing Ingredients</div>
          </div>
        )}
        
        {activeChart === 'likes' && (
          <div className="chart likes-chart">
            <h3>Recipe Count by Like Range</h3>
            <div className="chart-bars">
              {likesData.map(item => (
                <div key={item.range} className="chart-bar-group">
                  <div 
                    className="chart-bar"
                    style={{
                      height: `${(item.count / likesMaxValue) * 200}px`
                    }}
                  >
                    <span className="bar-value">{item.count}</span>
                  </div>
                  <div className="bar-label">{item.range}</div>
                </div>
              ))}
            </div>
            <div className="chart-axis-label">Like Count Range</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardCharts; 
# Recipe Finder App

This is a Recipe Finder application built with React and Vite that uses the Spoonacular API to search for recipes based on ingredients.

## Features

- Search for recipes by entering ingredients
- View search results with images and ingredient information
- View detailed recipe information including:
  - Ingredients list
  - Cooking instructions
  - Preparation time
  - Serving size
  - Health score
  - Diet information

## Prerequisites

- Node.js and npm installed on your machine
- A Spoonacular API key (get one for free at [spoonacular.com/food-api](https://spoonacular.com/food-api))

## Setup Instructions

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with your API key:
   ```
   VITE_API_KEY=YOUR_SPOONACULAR_API_KEY
   ```
   Replace `YOUR_SPOONACULAR_API_KEY` with your actual API key from Spoonacular

## Running the Application

1. Start the development server:
   ```
   npm run dev
   ```
2. Open your browser and navigate to the URL displayed in the terminal (typically http://localhost:5173)

## Building for Production

To create a production build:
```
npm run build
```

## Technologies Used

- React
- Vite
- JavaScript
- Axios
- Spoonacular API

## API Attribution

This application uses the [Spoonacular Food API](https://spoonacular.com/food-api) to fetch recipe data.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const RecipeContext = createContext(null);
const RECIPES_KEY = "recipe-book-recipes";
const FAVORITES_KEY = "recipe-book-favorites";

const starterRecipes = [
  {
    id: "lemon-herb-pasta",
    title: "Lemon Herb Pasta",
    category: "Dinner",
    time: 25,
    servings: 2,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=80",
    description: "A bright, creamy pasta with fresh herbs and lemon.",
    ingredients: ["200g pasta", "1 lemon", "2 tbsp olive oil", "Fresh herbs"],
    instructions: [
      "Cook the pasta until al dente.",
      "Toss with olive oil, lemon juice, and herbs.",
      "Season to taste and serve warm.",
    ],
  },
  {
    id: "berry-yogurt-bowl",
    title: "Berry Yogurt Bowl",
    category: "Breakfast",
    time: 10,
    servings: 1,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=80",
    description: "A fresh, colorful breakfast layered with berries and crunch.",
    ingredients: ["1 cup Greek yogurt", "1/2 cup berries", "2 tbsp granola"],
    instructions: [
      "Spoon yogurt into a bowl.",
      "Top with berries and granola.",
      "Serve immediately.",
    ],
  },
];

function readStorage(key, fallback) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch {
    return fallback;
  }
}

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(() =>
    readStorage(RECIPES_KEY, starterRecipes),
  );
  const [favorites, setFavorites] = useState(() =>
    readStorage(FAVORITES_KEY, []),
  );

  useEffect(() => {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };
    setRecipes((currentRecipes) => [newRecipe, ...currentRecipes]);
    return newRecipe;
  };

  const getRecipe = useCallback(
    (id) => recipes.find((recipe) => recipe.id === id),
    [recipes],
  );

  const toggleFavorite = (id) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(id)
        ? currentFavorites.filter((favoriteId) => favoriteId !== id)
        : [...currentFavorites, id],
    );
  };

  const deleteRecipe = (id) => {
    setRecipes((currentRecipes) =>
      currentRecipes.filter((recipe) => recipe.id !== id),
    );
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favoriteId) => favoriteId !== id),
    );
  };

  const value = useMemo(
    () => ({
      recipes,
      favorites,
      addRecipe,
      getRecipe,
      toggleFavorite,
      deleteRecipe,
    }),
    [recipes, favorites, getRecipe],
  );

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used inside a RecipeProvider");
  }
  return context;
}

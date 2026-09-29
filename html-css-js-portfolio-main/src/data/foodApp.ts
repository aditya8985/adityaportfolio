export type FoodDish = {
  id: string;
  name: string;
  desc: string;
  price: string;
  image: string;
  tags: string[];
  calories: string;
  spicy?: boolean;
};

export type FoodRestaurant = {
  id: string;
  name: string;
  type: string;
  cuisine: string;
  time: string;
  fee: string;
  rating: number;
  image: string;
  eta: string;
  dishes: FoodDish[];
};

export const foodLocations = ["Brooklyn", "Manhattan", "Queens", "Williamsburg"] as const;

export const foodCategories = [
  { id: "all", label: "All" },
  { id: "japanese", label: "Japanese" },
  { id: "pizza", label: "Pizza" },
  { id: "express", label: "Express" },
  { id: "trivia", label: "Trivia" },
] as const;

export const foodTrivia = [
  "Sushi means “vinegar rice” — the fish is optional.",
  "NY pizza folds because the crust is thin & crisp.",
  "Wasabi on most menus is horseradish dyed green.",
  "The first delivery app launched in 1995 — for pizza.",
  "Katsuei’s omakase literally means “I leave it to you.”",
];

export const foodRestaurants: FoodRestaurant[] = [
  {
    id: "katsuei",
    name: "Katsuei",
    type: "Japanese • Sushi",
    cuisine: "japanese",
    time: "20–30 min",
    fee: "$2.99",
    rating: 4.8,
    eta: "Express",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop",
    dishes: [
      {
        id: "salmon-nigiri",
        name: "Salmon Nigiri",
        desc: "Fresh Atlantic salmon over seasoned sushi rice. Served with wasabi & pickled ginger.",
        price: "$8.50",
        calories: "180 kcal",
        tags: ["Chef pick", "Gluten-free"],
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop",
      },
      {
        id: "spicy-tuna",
        name: "Spicy Tuna Roll",
        desc: "Chopped tuna, spicy mayo, cucumber, and sesame. Eight pieces.",
        price: "$12.00",
        calories: "320 kcal",
        tags: ["Popular"],
        spicy: true,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      },
      {
        id: "miso-soup",
        name: "Miso Soup",
        desc: "Classic white miso broth with tofu, wakame, and scallions.",
        price: "$3.50",
        calories: "70 kcal",
        tags: ["Light"],
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
      },
    ],
  },
  {
    id: "sugarfish",
    name: "SUGARFISH",
    type: "Japanese • Sushi",
    cuisine: "japanese",
    time: "25–30 min",
    fee: "$2.99",
    rating: 4.9,
    eta: "Standard",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop",
    dishes: [
      {
        id: "trust-me",
        name: "Trust Me — Small",
        desc: "Chef’s curated omakase set: tuna, salmon, yellowtail, and hand rolls.",
        price: "$28.00",
        calories: "540 kcal",
        tags: ["Best seller"],
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop",
      },
      {
        id: "albacore",
        name: "Albacore Sushi",
        desc: "Seared albacore with ponzu and crispy onion. Two pieces.",
        price: "$9.00",
        calories: "160 kcal",
        tags: ["Signature"],
        image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=300&fit=crop",
      },
      {
        id: "edamame",
        name: "Salted Edamame",
        desc: "Warm soybeans tossed in sea salt.",
        price: "$5.00",
        calories: "120 kcal",
        tags: ["Vegan"],
        image: "https://images.unsplash.com/photo-1587334206470-98e132809e86?w=400&h=300&fit=crop",
      },
    ],
  },
  {
    id: "joes",
    name: "Joe's Pizza",
    type: "Italian • Pizza",
    cuisine: "pizza",
    time: "10–15 min",
    fee: "$1.99",
    rating: 4.9,
    eta: "Express",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    dishes: [
      {
        id: "cheese-slice",
        name: "Classic Cheese Slice",
        desc: "Thin crust, San Marzano tomato, fresh mozzarella. NYC classic.",
        price: "$3.75",
        calories: "285 kcal",
        tags: ["Iconic", "Express"],
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
      },
      {
        id: "pepperoni-slice",
        name: "Pepperoni Slice",
        desc: "Same thin crust with crisp cup-and-char pepperoni.",
        price: "$4.50",
        calories: "340 kcal",
        tags: ["Popular"],
        spicy: true,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
      },
      {
        id: "garlic-knots",
        name: "Garlic Knots",
        desc: "Four knots brushed with garlic butter and parsley.",
        price: "$4.00",
        calories: "260 kcal",
        tags: ["Side"],
        image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d0?w=400&h=300&fit=crop",
      },
    ],
  },
  {
    id: "julianas",
    name: "Juliana's Pizza",
    type: "Italian • Pizza",
    cuisine: "pizza",
    time: "12–15 min",
    fee: "$1.99",
    rating: 4.7,
    eta: "Express",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    dishes: [
      {
        id: "margherita",
        name: "Margherita Pie",
        desc: "Coal-oven pie with tomato, mozzarella, basil, and olive oil.",
        price: "$22.00",
        calories: "220 kcal / slice",
        tags: ["Coal oven"],
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
      },
      {
        id: "no-name",
        name: "No Name Pie",
        desc: "Tomato, mozzarella, fresh garlic, oregano — house favorite.",
        price: "$24.00",
        calories: "240 kcal / slice",
        tags: ["House favorite"],
        image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop",
      },
      {
        id: "broccoli-rabe",
        name: "Broccoli Rabe Slice",
        desc: "Sautéed greens, sausage optional, sharp provolone.",
        price: "$5.50",
        calories: "310 kcal",
        tags: ["Seasonal"],
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
      },
    ],
  },
];

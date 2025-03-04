const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
// Sample fruit data
const fruits = [
  { "name": "Persimmon", "id": 52, "family": "Ebenaceae", "order": "Rosales", "genus": "Diospyros", "nutritions": { "calories": 81, "fat": 0.0, "sugar": 18.0, "carbohydrates": 18.0, "protein": 0.0 }, "image": "🥭", "price": 0.99 },
  { "name": "Strawberry", "id": 3, "family": "Rosaceae", "order": "Rosales", "genus": "Fragaria", "nutritions": { "calories": 29, "fat": 0.4, "sugar": 5.4, "carbohydrates": 5.5, "protein": 0.8 }, "image": "🍓", "price": 1.99 },
  { "name": "Banana", "id": 1, "family": "Musaceae", "order": "Zingiberales", "genus": "Musa", "nutritions": { "calories": 96, "fat": 0.2, "sugar": 17.2, "carbohydrates": 22.0, "protein": 1.0 }, "image": "🍌", "price": 0.80 },
  { "name": "Tomato", "id": 5, "family": "Solanaceae", "order": "Solanales", "genus": "Solanum", "nutritions": { "calories": 74, "fat": 0.2, "sugar": 2.6, "carbohydrates": 3.9, "protein": 0.9 }, "image": "🍅", "price": 0.29 },
  { "name": "Pear", "id": 4, "family": "Rosaceae", "order": "Rosales", "genus": "Pyrus", "nutritions": { "calories": 57, "fat": 0.1, "sugar": 10.0, "carbohydrates": 15.0, "protein": 0.4 }, "image": "🍐", "price": 0.56 }
];

// Define route to get all fruits
app.get('/api/fruits', (req, res) => {
  res.json(fruits);
});

// Define route to get a single fruit by ID
app.get('/api/fruits/:id', (req, res) => {
  const fruitId = parseInt(req.params.id);
  const fruit = fruits.find(f => f.id === fruitId);

  if (fruit) {
    res.json(fruit);
  } else {
    res.status(404).json({ message: "Fruit not found" });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

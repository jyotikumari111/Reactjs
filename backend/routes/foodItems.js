const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// Get all food items
router.get('/', async (req, res) => {
   try {
      const foodItems = await FoodItem.find();
      res.json(foodItems);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

// Create a food item
router.post('/', async (req, res) => {
   const foodItem = new FoodItem({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
   });

   try {
      const newFoodItem = await foodItem.save();
      res.status(201).json(newFoodItem);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

module.exports = router;

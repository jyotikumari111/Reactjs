import axios from 'axios';

const API_URL = 'http://localhost:5000/foodItems';

export const fetchFoodItems = async () => {
   try {
      const response = await axios.get(API_URL);
      return response.data;
   } catch (error) {
      console.error('Error fetching food items:', error);
      throw error;
   }
};

export const createFoodItem = async (foodItem) => {
   try {
      const response = await axios.post(API_URL, foodItem);
      return response.data;
   } catch (error) {
      console.error('Error creating food item:', error);
      throw error;
   }
};

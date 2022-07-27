import React, { useEffect, useState } from "react";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  // State for meals
  const [meals, setMeals] = useState([]);

  // State for loading
  const [isLoading, setIsLoading] = useState(true);

  // State for errors
  const [httpError, setHttpError] = useState();

  // HTTP request to Firebase & useEffect
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-4b011-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      // Check if the http request was unsuccessful
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      // To transform the object we get in responseData to an array
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      // Sets the state to the array filled with the data
      setMeals(loadedMeals);

      setIsLoading(false);
    };

    // In case there's an error, catches it and sets the loading and error state
    fetchMeals()
      .then()
      .catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, []);

  // Check if isLoading is true to show a paragraph notification
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  // Check if httpError has error to show a paragraph notification
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  // Maps every dummy meal into the MealItem component
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

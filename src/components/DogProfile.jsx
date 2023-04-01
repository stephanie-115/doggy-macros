import React, { useState, useEffect } from "react";

export default function DogProfile({ match }) {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      const response = await fetch(`/api/profile/${match.params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        console.error("Error retrieving profile data");
      }
      console.log("profileData:", profileData)
    };
    getProfileData();
  }, [match.params.id]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const { dogName, idealWeight, neutered, activityLevel, calories, protein, fat, carbs } = profileData;

  return (
    <div>
      <h2>{dogName}'s Profile</h2>
      <p>Ideal Weight: {idealWeight} lbs</p>
      <p>Neutered: {neutered}</p>
      <p>Activity Level: {activityLevel}</p>
      <p>Calculations:</p>
      <ul>
        <li>Total Daily Calories: {calories} kcal/day</li>
        <li>Protein: {protein} g/day</li>
        <li>Fat: {fat} g/day</li>
        <li>Carbohydrates: {carbs} g/day</li>
      </ul>
    </div>
  );
}

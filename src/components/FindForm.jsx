import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FindForm() {
  const [dogName, setDogName] = useState("");
  const [data, setData] = useState(null);
  const [deleted, setDeleted] = useState(false);
  
  const handleNameChange = (e) => {
    setDogName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('I am in the try of handleSubmit')
      const response = await fetch(`/api/profile/find?dogName=${dogName}`);
      console.log('Response:', response)
      const data = await response.json();
      if (response.ok && data.dogName === dogName) {
        setData(data);
        setDeleted(false);
      } else {
        alert(`${dogName}? Who dat?`);
        setData(null);
      }
    } catch (error) {
      alert("Error: could not fetch data");
      console.error(error);
    }
  };

  const handleEditClick = async (e) => {
    e.preventDefault();
    if (data) {
      const response = await fetch(`/api/profile/edit/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dogName: data.dogName,
          activityLevel: data.activityLevel,
          idealWeight: data.idealWeight,
          neutered: data.neutered
        })
      });
      const updatedData = await response.json(); // get the updated data from the server
      setData(updatedData); // update the state with the new data
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (data) {
      try { // wrap in try-catch block to handle errors
        console.log("DOG ID:", data._id)
        const response = await fetch(`/api/profile/delete/${data._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          setDeleted(true);
          alert("Deletion successful");
          setData(null); // set data to null after successfully deleting the profile
        } else {
          alert("Error");
        }
      } catch (error) {
        alert("Error: could not delete data");
        console.error(error);
      }
    }
  };
  

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={dogName} onChange={handleNameChange} />
        <button type="submit">Submit</button>
      </form>
      {data && !deleted ? (
        <div>
          <h2>{data.dogName}</h2>
          <p>Ideal Weight: {data.idealWeight} lbs</p>
          <p>Neutered: {data.neutered ? "Yes" : "No"}</p>
          <p>Activity Level: {data.activityLevel}</p>
          <p>Calories Per Day: {data.calories}</p>
          <p>Protein: {data.protein}g</p>
          <p>Fat: {data.fat}g</p>
          <p>Carbs: {data.carbs}g</p>
          <button onClick={handleEditClick}>Edit Profile</button>
          <button onClick={handleDelete}>Delete Profile</button>
        </div>
      ) : (
        <p>Type your 🐶's name here.</p>
      )}
    </div>
  );
}

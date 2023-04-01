import React, { useCallback, useState } from "react";
import Input from "./Input";

export default function Form() {
  const [name, setName] = useState("");
  const [idealWeight, setIdealWeight] = useState(0);
  const [neutered, setNeutered] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [profileData, setProfileData] = useState(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const body = {
      dogName: name,
      idealWeight,
      neutered,
      activityLevel,
    };
    const response = await fetch("/api/profile/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const data = await response.json();
      alert("Woof Woof! " + data.dogName + " now has a profile!");
      setProfileData(data);
      window.location.href = `/`;
    } else {
      alert("Womp Womp. Your profile was not saved. Please try again!");
    }
  }, [activityLevel, idealWeight, name, neutered]);

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Input label="Dog's Name" value={name} onChange={setName} />
      <Input
        label="Ideal Weight"
        value={idealWeight}
        onChange={setIdealWeight}
        type="number"
      />
      <Input
        label="Neutered/Spayed"
        value={neutered}
        onChange={setNeutered}
        type="select"
        choices={["yes", "no"]}
      />
      <Input
        label="Activity Level"
        value={activityLevel}
        onChange={setActivityLevel}
        type="select"
        choices={["inactive", "somewhat active", "active", "very active"]}
      />
      <button style={{ margin: "0 auto" }}>Create Profile</button>
    </form>
  );
}

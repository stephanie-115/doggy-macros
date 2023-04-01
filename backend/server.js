const path = require("path");
const express = require("express");
const Profile = require("./Profile");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();

mongoose
  .connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api', router);

app.use(express.static(path.join(__dirname, "../dist")));


// app.get('/api/profile/:id', async (req, res) => {
//   try {
//     const profile = await Profile.findById(req.params.id);
//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }
//     res.json(profile);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.get(`/api/profile/find`, async (req, res) => {
  try {
    //check if dog with this name already exists in the DB
    const dogName = req.query.dogName;
    console.log("dogName:", dogName)
    const existingDog = await Profile.findOne({ dogName: dogName });
    console.log("existingDog:", existingDog)
    if (existingDog) {
      return res.send(existingDog);
    } else {
      res.send({ message: "WOOF WOOF! Dog profile does not exist!" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
    console.error(err);
    res.send({ error: "An error occurred on the server." });
  }
});

app.post("/api/profile/new", async (req, res) => {
  try {
    const newProfile = new Profile({
      dogName: req.body.dogName,
      idealWeight: req.body.idealWeight,
      activityLevel: req.body.activityLevel,
      neutered: req.body.neutered,
    });
    console.log("New Profile:", newProfile)
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/profile/edit/:id", async (req, res) => {
  try {
    const updatedProfile = await Profile.updateMany(
      { _id: req.params.id },
      {
        idealWeight: req.body.idealWeight,
        dogName: req.body.dogName,
        neutered: req.body.neutered,
        activityLevel: req.body.activityLevel,
      },
      { new: true }
    );
    console.log(updatedProfile);
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/profile/delete/:id", async (req, res) => {
  try {
    const result = await Profile.findOneAndDelete({_id: req.params.id});
    if (!result) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use("*", (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const error = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occured" },
  };
  console.error(err);
  const errorObj = Object.assign({}, error, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3001, () => console.log("Server started on port 3001"));

module.exports = router;

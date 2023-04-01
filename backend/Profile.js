const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  dogName: {
    type: String,
    required: true,
  },
  idealWeight: {
    type: Number,
    required: true,
  },
  activityLevel: {
    type: String,
    required: true,
  },
  neutered: {
    type: String,
    required: true
  }
}, {
    toJSON: { 
      virtuals: true,
    }
});

ProfileSchema.virtual('calories').get(function() {
  const currentEntry = this;
  const toKG = () => {
    return currentEntry.idealWeight * 2.2;
  };
  const energyReq = () => {
    return (70 * toKG()) ** 0.75;
  };
  const reproductiveStatus = () => {
    if (currentEntry.neutered === "yes") return 1.6;
    else return 1.8;
  };
  const activity = () => {
    if (currentEntry.activityLevel === "inactive") return 1;
    if (currentEntry.activityLevel === "somewhat active") return 1.2;
    if (currentEntry.activityLevel === "active") return 1.4;
    if (currentEntry.activityLevel === "very active") return 1.6;
  };
  return  Math.round(energyReq() * reproductiveStatus() * activity());
  
});

ProfileSchema.virtual('protein').get(function() {
  const currentEntry = this;
  return Math.round(currentEntry.calories * 0.6 / 4);
});

ProfileSchema.virtual('fat').get(function() {
  const currentEntry = this;
  return Math.round(currentEntry.calories * 0.3 / 9);
});

ProfileSchema.virtual('carbs').get(function() {
  const currentEntry = this;
  return Math.round(currentEntry.calories * 0.1 / 4);
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;

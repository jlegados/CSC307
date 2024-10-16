import mongoose from "mongoose";
import User from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users") 
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Connection error:", error));

  function getUsers(name, job) {
    let query = {};
    // Check if name and job are provided
    if (name && job) {
      query = { name, job }; // Search by both name and job
    } else if (name) {
      query = { name }; // Search by name
    } else if (job) {
      query = { job }; // Search by job
    }
    return User.find(query);  // Return the result of the query
  }

  function findUserById(id) {
    return User.findById(id); // Find a user by ID
  }
  
  function addUser(user) {
    const userToAdd = new User(user); // Create a new instance of the User model
    return userToAdd.save(); // Save the user to the database
  }
  
  function findUserByName(name) {
    return User.find({ name: name }); // Find users by name
  }
  
  function findUserByJob(job) {
    return User.find({ job: job }); // Find users by job
  }
  
  function findUsersByNameAndJob(name, job) {
    return User.find({ name: name, job: job }); // Find users by name and job
}
  
  function deleteUserById(id) {
    return User.findByIdAndDelete(id); // Properly define deleteUserById
  }
  
  export default {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
    findUsersByNameAndJob,
    deleteUserById,
  };
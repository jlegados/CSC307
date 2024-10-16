import cors from "cors";
import express from "express";
import userService from "./user-services.js"; // Ensure the path is correct

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// GET: Get all users
app.get("/users", async (req, res) => {
  try {
    const { name, job } = req.query;
    console.log("Querying for:", name, job);  // Log the incoming query parameters
    const users = await userService.getUsers(name, job);
    console.log("Found users:", users);  // Log the results of the query
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);  // Log any errors
    res.status(500).json({ error: error.message });
  }
});


// Home route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// POST: Add a new user
app.post("/users", async (req, res) => {
  try {
    const userToAdd = req.body;
    const createdUser = await userService.addUser(userToAdd);
    res.status(201).json({ user: createdUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// GET: Get user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.findUserById(id); // Call the Mongoose function
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Remove user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUserById(userId); // Call the Mongoose function
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


import cors from "cors";
import express from "express";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

// Helper functions
const findUserById = (id) => {
  return users["users_list"].find((user) => user["id"] === id);
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const addUser = (user) => {
  const userWithId = { ...user, id: Math.random().toString(36).substr(2, 9) };
  users["users_list"].push(userWithId);
  return userWithId;
};

const deleteUserById = (id) => {
  const originalLength = users["users_list"].length;
  users["users_list"] = users["users_list"].filter(user => user["id"] !== id);
  return users["users_list"].length !== originalLength;
};

// GET: Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// POST: Add a new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  if (!userToAdd.name || !userToAdd.job) {
    return res.status(400).send("Missing 'name' or 'job' in request body");
  }
  const createdUser = addUser(userToAdd);
  res.status(201).json({ message: "User created", user: createdUser });
});

// GET: Get user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);
  if (!result) {
    return res.status(404).send("User not found.");
  }
  res.json(result);
});

// DELETE: Remove user by ID
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const wasDeleted = deleteUserById(userId);
  if (wasDeleted) {
    return res.status(204).send(); // 204 No Content
  }
  res.status(404).json({ error: "User not found" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


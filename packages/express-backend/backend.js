import express from "express";

const app = express();
const port = 8000;

// Define the list of users
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

// "/" route (Hello World)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// "/users" route to return the list of users
app.get("/users", (req, res) => {
  res.send(users);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

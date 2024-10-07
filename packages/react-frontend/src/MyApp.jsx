import React, { useState, useEffect } from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, []);

  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("Failed to add user");
        }
      })
      .then(data => {
        setCharacters([...characters, data.user]); // Add new user to state
      })
      .catch(error => console.log("Error adding user:", error));
  }

  function removeOneCharacter(id) {
    deleteUser(id)
      .then(response => {
        if (response.status === 204) {
          setCharacters(characters.filter((character) => character.id !== id));
        }
      })
      .catch(error => console.log("Error deleting user:", error));
  }

  return (
    <div>
      <h1>Character List</h1>
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <h2>Add a New Character</h2>
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table"
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function fetchUsers(name) {
        const url = name ? `http://localhost:8001/users?name=${encodeURIComponent(name)}` : "http://localhost:8001/users";
        return fetch(url);
    }

    function postUserToServer(person) {
        return fetch("http://localhost:8001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
    }

    // call this when user submits the form
    async function handleAddUser(person) {
        try {
            const res = await postUserToServer(person);

            if (res.status !== 201) {
                console.error("Failed to create user on server. Status:", res.status);
                return;
            }

            // parse returned JSON
            const createdUser = await res.json();

            // update local state with the server's representation (includes id)
            setCharacters((prev) => [...prev, createdUser]);

        } catch (err) {
            console.error("Network error while adding user:", err);
        }
    }

    async function deleteUser(_id) {
        try {
            const res = await fetch(`http://localhost:8001/users/${encodeURIComponent(_id)}`, {
            method: "DELETE",
            });

            if (res.status === 204 || res.status === 200) {
                // success, update UI
                setCharacters((prev) => prev.filter((u) => u._id !== _id));
            } else if (res.status === 404) {
                console.warn("User not found on server; removing locally.");
                setCharacters((prev) => prev.filter((u) => u._id !== _id));
            } else {
                console.error("Failed to delete on server; status:", res.status);
            }
        } catch (err) {
            console.error("Network error deleting user:", err);
        }
    }

    useEffect(() => {
        // initial load
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const [searchName, setSearchName] = useState("");

    function handleSearch(e) {
        e.preventDefault();
        fetchUsers(searchName)
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => console.log(error));
    }

    function handleClearSearch() {
        setSearchName("");
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => console.log(error));
    }

    return (
        <div className="container">
            <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Filter by name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button type="submit">Search</button>
                <button type="button" onClick={handleClearSearch}>Clear</button>
            </form>

            <Table
                characterData={characters}
                removeCharacter={deleteUser}
                //deleteUser={deleteUser}
            />
            <Form handleSubmit={handleAddUser} />
        </div>
    );
}

export default MyApp;
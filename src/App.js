import React from "react";

import "./styles.css";
import { useEffect } from "react";
import api from "./services/api";
import { useState } from "react";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(
      response => {
        setRepositories(response.data);
      }
    )
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Typescript ${Date.now()}`,
      "url": "https://github.com/IgoMedeiros/typescript",
      "techs": ["js", "typescript"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status === 204) {
      const updatedRepositoriesList = repositories.filter(repository => repository.id !== id);
      setRepositories(updatedRepositoriesList);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(
            repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
            )
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

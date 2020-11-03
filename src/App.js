import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(({data}) => setRepositories(data));
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `new Repo ${Date.now()}`,
      url: "https://github.com/josepholiveira",
      techs: ["React", "Node.js"],
    });
    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex((r) => r.id === id);

    repositories.splice(repositoryIndex, 1);
    console.log(repositories)
    setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

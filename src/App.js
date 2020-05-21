import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState( [] );

  useEffect( () => {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `Novo Repositorie ${Date.now()}`,
      url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],

    });

    const repositorie = response.data;
    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    // TODO (esta comentando como eu tinha feito antes!)
    // const repositorieId = {id}
    // const response = await api.delete(`/repositories/${id}`);
    // const listRepositories = await api.get('repositories').then( response => {
    //   setRepositories(response.data);
    // });

    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repositorie => repositorie.id !== id));
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repositorie => [
          <li key={repositorie.id} >
            {repositorie.title}

            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ])}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { CHARACTERS } from "../graphql/queries";
import { ADD_CHARACTER, DELETE_CHARACTER } from "../graphql/mutations";

import Character from "../components/Character";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [newName, setNewName] = useState('');
  const [newGame, setNewGame] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'newName') {
      setNewName(value);
    } else {
      setNewGame(value);
    }
  }

  const removeCharacter = (name) => {
    deleteCharacter({ variables: { name } });
    const filteredCharacters = characters.filter(character => character.name !== name);
    setCharacters(filteredCharacters);
  }

  const submitCharacter = () => {
    const newCharacter = { name: newName, game: newGame };
    addCharacter({ variables: newCharacter });
    setNewName('');
    setNewGame('');
    setCharacters([...characters, newCharacter]);
  }

  const [addCharacter] = useMutation(ADD_CHARACTER);
  const [deleteCharacter] = useMutation(DELETE_CHARACTER);

  const { loading, error } = useQuery(CHARACTERS, {
    onCompleted: (data) => setCharacters(data.getCharacters)
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container">
      <h1 className="text-center">Nintendo Characters</h1>
      <div id="characters">
        {characters.map(character => <Character
          key={character.name}
          removeCharacter={removeCharacter}
          {...character} />)}
      </div>
      <h2>Add new character</h2>
      <input
        className="form-control"
        placeholder="Name of character"
        type="text"
        name="newName"
        value={newName}
        onChange={handleChange} />
      <input
        className="form-control"
        placeholder="Game character is from"
        type="text"
        name="newGame"
        value={newGame}
        onChange={handleChange} />
      <button type="button" className="btn btn-primary" onClick={submitCharacter}>Add new character</button>
    </div>
  );
};

export default Home;

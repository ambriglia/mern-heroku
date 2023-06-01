import { gql } from "apollo-server-core";

const ADD_CHARACTER = gql`
  mutation addCharacter($name: String!, $game: String!) {
    addCharacter(name: $name, game: $game){
      name
      game
    }
  }
`;

const DELETE_CHARACTER = gql`
  mutation deleteCharacter($name: String!) {
    deleteCharacter(name: $name){
      name
    }
  }
`;

export {
  ADD_CHARACTER,
  DELETE_CHARACTER,
};

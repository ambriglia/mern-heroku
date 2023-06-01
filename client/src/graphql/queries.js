import { gql } from "apollo-server-core";

const CHARACTERS = gql`
  query getCharacters {
    getCharacters {
      name
      game
    }
  }
`;

export {
  CHARACTERS,
};

import { gql } from "apollo-server-core";

export default gql`
  type Character {
    _id: String
    name: String
    game: String
  }
  type User {
    _id: String
    username: String
    password: String
  }
  type Query {
    getCharacters: [Character]
  }
  type Mutation {
    addCharacter(name: String!, game: String!): Character
    deleteCharacter(name: String!): Character
    addUser(username: String!, password: String!): User
  }
`;

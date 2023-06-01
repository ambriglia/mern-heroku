import Character from "../models/Character.js";
import User from "../models/User.js";

export default {
  Query: {
    getCharacters: async () => await Character.find(),
  },
  Mutation: {
    addCharacter: async (parent, args) => await Character.create(args),
    deleteCharacter: async (parent, args) => await Character.deleteOne({ name: args.name }),
    addUser: async (parent, args) => await User.create(args),
  }
};

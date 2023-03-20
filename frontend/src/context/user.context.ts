import { createContext } from "react";

export const UserContext = createContext({
  user: {
    userId: "",
    username: "",
    discriminator: "",
    avatar: "",
    email: "",
  },
  setUser: () => {},
  signout: () => {},
  loading: true,
});

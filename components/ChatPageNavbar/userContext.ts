import React from 'react';

interface UserContextType {
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
}

const defaultValue: UserContextType = {
  email: null,
  setEmail: () => {},
};

const UserContext = React.createContext<UserContextType>(defaultValue);

export default UserContext;

import { useState, createContext } from 'react';

const OpenMenuContext = createContext();

function OpenMenuProvider({ children }) {
  const [openMenu, setOpenMenu] = useState(true);

  const toggleOpenMenu = () => setOpenMenu(!openMenu);

  const value = {
    openMenu,
    toggleOpenMenu,
  };

  return (
    <OpenMenuContext.Provider value={value}>
      {children}
    </OpenMenuContext.Provider>
  );
}

export { OpenMenuContext, OpenMenuProvider };

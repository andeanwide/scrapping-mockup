import { createContext, useState, useLayoutEffect } from 'react';

// Exportamos la instancia del objecto Context

// Creamos un componente Provider el cual recibe como props los children
export const SidebarContext = createContext<any>({
  hideSidebar: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useWindowSize: () => {},
});
const Provider = ({ children }: any) => {
  //En este ejercicio vamos a crear una props darkMode y a su vez la vamos a guardar en el Local Storage ;)
  const [size, setSize] = useState(0);
  const [hideSidebar, setHideSidebar] = useState(true);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  //Value es el objeto con los valores y sus respectivas funciones de alteracion de los mismos
  // Piensa que aqui van a estar todas las props que quieres compartir y las funciones para cambiar sus valores
  const value = {
    hideSidebar,
    handleHideSideBar: (value: boolean) => {
      setHideSidebar(value);
    },
    useWindowSize: () => {
      useLayoutEffect(() => {
        function updateSize() {
          setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
      }, []);
      return size;
    },
    showSidebarMobile,
    handleShowSideBarMobile: (value: any) => {
      setShowSidebarMobile(value);
    },
    // updateStateSidebar: (width) => {
    //   if (width > 1023) setHideSidebar((prevState) => prevState === true && false);
    // }
  };
  //Finalmente retornamos el componente Context.Provider y la pasamos como props el value (recuerda, son las props globales que queremos en nuestra app)
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export { Provider };

import { createContext, useState } from "react";

const SettingsContext = createContext();

const defaultSettings = {
   user: null,
   token: null,
   logged: false,
   avatar: null
};

export const SettingsProvider = ({ children, settings }) => {
   const [currentSettings, setCurrentSettings] = useState(
      settings || defaultSettings
   );

   const saveSettings = (values) => {
      console.log("values")

      console.log(values)
     setCurrentSettings(values)
   };

   return (
      <SettingsContext.Provider
         value={{ settings: currentSettings, saveSettings }}
      >
         {children}
      </SettingsContext.Provider>
   );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
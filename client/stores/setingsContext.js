import { createContext, useState } from "react";

const SettingsContext = createContext();

const defaultSettings = {
   user: null,
   logged: false,
   channels: null
};

export const SettingsProvider = ({ children, settings}) => {
   const [currentSettings, setCurrentSettings] = useState(
      settings || defaultSettings
   );

   const saveSettings = (values) => {
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
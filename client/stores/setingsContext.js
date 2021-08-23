import { createContext, useState } from "react";

const defaultSettings = {
   user: undefined,
   logged: false,
   channels: undefined
};

const SettingsContext = createContext();

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
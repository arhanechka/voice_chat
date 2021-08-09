import { useContext } from "react";
import SettingsContext from "./setingsContext";

export default () => {
   const context = useContext(SettingsContext);

   return context;
};
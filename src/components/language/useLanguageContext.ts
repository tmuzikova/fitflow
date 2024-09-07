import { useContext } from "react";
import { LanguageContext, LanguageContextType } from "./LanguageContext";

export const useLanguageContext = (): LanguageContextType => {
  return useContext(LanguageContext);
};

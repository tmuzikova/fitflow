import { createContext, useState, ReactNode } from "react";

export interface LanguageContextType {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}
export const LanguageContext = createContext<LanguageContextType>({
  language: "cs", // Default language is set to Czech
  setLanguage: () => {}, // This is a no-op function to avoid errors if the provider is not used
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("cs");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

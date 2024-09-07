import { useLanguageContext } from "./useLanguageContext";

const LANGUAGES = [
  { code: "cs", name: "Čeština" },
  { code: "en", name: "English" },
];

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguageContext();
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value);
  };
  return (
    <select
      value={language}
      onChange={handleLanguageChange}
      className="rounded px-2"
    >
      {LANGUAGES.map((cbLanguage) => (
        <option key={cbLanguage.code} value={cbLanguage.code}>
          {cbLanguage.name}
        </option>
      ))}
    </select>
  );
};

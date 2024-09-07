import { IntlProvider } from "react-intl";

import { LanguageProvider } from "./components/language/LanguageContext";
import { useLanguageContext } from "./components/language/useLanguageContext";
import messagesCs from "./lang/messages_cs.json";
import messagesEn from "./lang/messages_en.json";
import { NavBar } from "./components/NavBar";
import { LandingPage } from "./components/LandingPage";
import { Footer } from "./components/Footer";

const messages = {
  cs: messagesCs,
  en: messagesEn,
};

function App() {
  const { language } = useLanguageContext();

  return (
    <IntlProvider
      locale={language}
      messages={messages[language as "cs" | "en"]}
    >
      <NavBar />
      <LandingPage />
      <Footer />
    </IntlProvider>
  );
}

export default function RootApp() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}

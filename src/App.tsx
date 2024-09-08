import { IntlProvider } from "react-intl";

import { LanguageProvider } from "./components/language/LanguageContext";
import { useLanguageContext } from "./components/language/useLanguageContext";
import messagesCs from "./lang/messages_cs.json";
import messagesEn from "./lang/messages_en.json";

import { LandingPage } from "./components/LandingPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Workouts from "./components/Workouts";

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} /> {/* Renders at "/" */}
            <Route path="/workouts" element={<Workouts />} />
          </Route>
        </Routes>
      </BrowserRouter>
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

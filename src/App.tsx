import { IntlProvider } from "react-intl";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LanguageProvider } from "./components/language/LanguageContext";
import { useLanguageContext } from "./components/language/useLanguageContext";
import messagesCs from "./lang/messages_cs.json";
import messagesEn from "./lang/messages_en.json";
import { LandingPage } from "./components/LandingPage";
import { Layout } from "./components/Layout";
import Workouts from "./components/Workouts";
import Generator from "./components/Generator";
import { Coach } from "./components/Coach";

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
            <Route path="/generator" element={<Generator />} />
            <Route path="/coach" element={<Coach />} />
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

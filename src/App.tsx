import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { RootState } from "./app/store";
import {
  MainPage,
  Leaderboard,
  FAQ,
  Event,
  NotFound,
  Signup,
  Login,
  AddQuestion,
} from "./pages";
import { Market } from "./pages/Market";
import Footer from "./widgets/footer/ui/Footer";
import Header from "./widgets/header/ui/Header";

export default function App() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const PAGES: { path: string; element: React.ReactNode }[] = [
    { path: "/", element: <MainPage /> },
    { path: "/market", element: <Market /> },
    { path: "/leaderboard", element: <Leaderboard /> },
    { path: "/faq", element: <FAQ /> },
    { path: "/event/:id", element: <Event /> },
    { path: "*", element: <NotFound /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/market/add", element: <AddQuestion /> },
  ];

  return (
    <div className={`min-h-screen bg flex flex-col  ${darkMode && "dark"}`}>
      <BrowserRouter>
        <Header darkMode={darkMode} />

        <main className="flex-1">
          <Routes>
            {PAGES.map((page) => (
              <Route path={page.path} element={page.element} />
            ))}
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

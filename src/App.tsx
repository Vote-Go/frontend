import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router";
import { FAQ, Leaderboard, MainPage, Market } from "./pages";
import Footer from "./widgets/Footer/Footer";
import Header from "./widgets/Header/Header";

export default function App() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const PAGES: { path: string; element: React.ReactNode }[] = [
    { path: "/", element: <MainPage /> },
    { path: "/market", element: <Market /> },
    { path: "/leaderboard", element: <Leaderboard /> },
    { path: "/faq", element: <FAQ /> },
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

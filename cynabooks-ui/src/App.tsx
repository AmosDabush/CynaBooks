import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./context/Providers";
import Header from "./components/Header/Header";
import BookCatalog from "./pages/BookCatalogPage/BookCatalog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import BookPage from "./pages/BookPage/BookPage";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const TostNotification = () => (
    <ToastContainer
      limit={4}
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={darkMode ? "dark" : "light"}
    />
  );

  return (
    <Router>
      <div className="background-image">
        <Providers darkMode={darkMode}>
          <CssBaseline />
          <Header handleThemeChange={handleThemeChange} darkMode={darkMode} />
          <Routes>
            <Route path="/" element={<BookCatalog />} />
            <Route path="/book/:bookId" element={<BookPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <TostNotification />
        </Providers>
      </div>
    </Router>
  );
}

export default App;

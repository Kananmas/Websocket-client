import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/Auth/AuthProvider";
import { SignUp } from "./Pages/SignUp";
import { SignIn } from "./Pages/SignIn";
import { Header } from "./components/Header";
import { Chat } from "./Pages/Chat";
import { ExceptionProvider } from "./Context/Exception/ExceptionProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <ExceptionProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Header />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route index element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </ExceptionProvider>
      </AuthProvider>
    </>
  );
}

export default App;

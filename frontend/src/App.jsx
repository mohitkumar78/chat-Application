import react from "react";
import Auth from "./Auth/auth";
import Chat from "./Chats/chat";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Profile from "./Auth/Profile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />

        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

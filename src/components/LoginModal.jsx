import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function LoginModal({ onClose, onSuccess }) {
  // Zustand für Benutzername, Passwort und Fehler
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // Login-Funktion aus dem Auth context
  const { login } = useAuth();

  //funktioniert wenn das Formular submiten
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password);
    if (success) {
      setError(null);
      onSuccess();
      onClose();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex 
    justify-center items-center z-50"
    >
      <div
        className="bg-gray-800 p-6 rounded shadow-lg w-80
       text-white"
      >
        <h2 className="mb-4 text-xl font-bold">Login Required</h2>

        <p className="mb-4">Login functionality is disabled in this modal.</p>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-red-600 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

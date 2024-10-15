import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { toast, ToastContainer } from "react-toastify";
import Message from "./components/Message";
import "react-toastify/dist/ReactToastify.css";
import { initializeApp } from "firebase/app";

function App() {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  // const [fcmToken, setFcmToken] = useState("");

  const firebaseConfig = {
    apiKey: "AIzaSyDfAOFZcFPLV9Pdj2OCA03VasGRfPUbV2M",
    authDomain: "test-77775.firebaseapp.com",
    projectId: "test-77775",
    storageBucket: "test-77775.appspot.com",
    messagingSenderId: "test-77775.appspot.com",
    appId: "1:464429257779:web:9f09e5d149920f8af2bf46",
    measurementId: "G-ZDFTLNQZ6B",
  };

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  const onClickRequestPermission = () => {
    Notification.requestPermission().then(async (permission) => {
      if (permission === "granted") {
        setMessage("Notification permission granted.");
        await getToken(messaging, {
          vapidKey:
            "BHaqQDV06Y0242a7KNxyDxntJB6muVFtIGwUQXErf_j1MNm1ipwecD0pEer8S0Iplvp1u78BaU3WE7_jywxJCNc",
        }).then((currentToken) => {
          if (currentToken) {
            setMessage("Token generated : " + currentToken);
          } else {
            setMessage(
              "No registration token available. Request permission to generate one."
            );
          }
        });
      } else {
        setMessage("Unable to get permission to notify.");
      }
    });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 onClick={onClickRequestPermission}>Vite + React</h1>
      <h3>{message}</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ToastContainer />
    </>
  );
}

export default App;

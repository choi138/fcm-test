import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

function App() {
  const [token, setToken] = useState("");

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "test-77775.firebaseapp.com",
    projectId: "test-77775",
    storageBucket: "test-77775.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  async function requestPermission() {
    console.log("권한 요청 중...");

    const permission = await Notification.requestPermission();
    if (permission === "denied") {
      console.log("알림 권한 허용 안됨");
      setToken("알림 권한 허용 안됨");
      return;
    }

    console.log("알림 권한이 허용됨");

    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });

    if (token) {
      setToken(token);
      console.log("token: ", token);
    } else console.log("Can not get Token");

    onMessage(messaging, (payload) => {
      console.log("메시지가 도착했습니다.", payload);
      // ...
    });
  }

  useEffect(() => {
    requestPermission();
  }, []);
  return <h1>Test Firebase Cloud Message {token}</h1>;
}

export default App;

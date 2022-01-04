import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
function App() {
    // console.log(auth.authService.currentUser);
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    const [init, setInit] = useState(false);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    });

    return (
        <div>
            {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..."}
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </div>
    );
}

export default App;

import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
function App() {
    // console.log(auth.authService.currentUser);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    });

    return (
        <div>
            {init ? (
                <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
            ) : (
                "initializing..."
            )}
            {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
        </div>
    );
}

export default App;

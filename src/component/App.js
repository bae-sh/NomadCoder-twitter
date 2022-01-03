import { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
function App() {
    // console.log(auth.authService.currentUser);
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    return (
        <div>
            <AppRouter isLoggedIn={isLoggedIn} />
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </div>
    );
}

export default App;

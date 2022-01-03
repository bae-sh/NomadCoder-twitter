import { useState } from "react";

// import React from "react";
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type={"text"}
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type={"password"}
                    placeholder="Password"
                    required
                    password={password}
                    onChange={onChange}
                />
                <input type={"submit"} value={"Log In"} />
            </form>
            <div>
                <button>Continue with google</button>
                <button>Continue with github</button>
            </div>
        </div>
    );
};

export default Auth;

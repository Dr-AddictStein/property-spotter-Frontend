import { message } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

const Login = () => {
    const { signinWithGoogle, facebookSignIn, login, user, setUser } =
        useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await login(email, password);
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    const handleGoogleLogin = () => {
        signinWithGoogle()
            .then((result) => {
                const person = result?.user;

                if (person) {
                    const userData = {
                        name: person?.displayName,
                        email: person?.email,
                        role: "user",
                        password: "",
                        photoURL: person?.photoURL,
                    };

                    axios
                        .post("http://localhost:5000/signup/google", userData, {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        .then((response) => {
                            if (!response) {
                                message.error("Failed to Signup");
                            }
                            const { token, user: userData } = response.data;
                            message.success("Login successful");
                            if (userData) {
                                setUser(userData);
                                localStorage.setItem("access-token", token);
                                if (
                                    userData?.role === "user" ||
                                    userData?.role === "spotter"
                                ) {
                                    navigate("/");
                                } else {
                                    navigate("/dashboard");
                                }
                            }
                        })
                        .catch((error) => {
                            console.error("Error posting user data:", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Google sign-in error:", error.message);
            });
    };
    const handleFB = () => {
        facebookSignIn()
            .then((result) => {
                const user = result.user;

                const saveUser = {
                    name: user?.displayName,
                    email: user.email,
                    password: "",
                    photoURL: user?.photoURL,
                    role: "user",
                };

                axios
                    .post("http://localhost:5000/signup/google", saveUser, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then(() => {
                        message.success("Login successful");
                        if (
                            userData?.role === "user" ||
                            userData?.role === "spotter"
                        ) {
                            navigate("/");
                        } else {
                            navigate("/dashboard");
                        }
                    })
                    .catch((error) => {
                        console.error("Error posting user data:", error);
                    });
            })
            .catch((error) => {
                console.error("Google sign-in error:", error.message);
            });
    };
    if (user) {
        if (user?.role === "user" || user?.role === "spotter") navigate("/");
        if (user?.role !== "user" && user?.role !== "spotter")
            navigate("/dashboard");
    }

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-1">
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            className="bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full"
                            type="email"
                            name="email"
                            id=""
                            required
                        />
                    </div>
                    <div className="pb-2">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input
                            className="bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full"
                            type="password"
                            name="password"
                            id=""
                            required
                        />
                    </div>
                    <div className="flex gap-2 mb-3">
                        <button className="w-full bg-[#1d9cb5] rounded text-white font-semibold p-2 mt-3">
                            Sign In
                        </button>
                    </div>
                </div>
            </form>
            <p className="text-center">--------- or ---------</p>
            <div className="flex flex-col text-center mb-3">
                <button
                    onClick={handleGoogleLogin}
                    className="w-full border-[#1d9cb5] border rounded font-semibold p-2 mt-3 flex justify-center items-center gap-3"
                >
                    <FaGoogle size="1em" />
                    <span>Continue with Google</span>
                </button>
                <button
                    onClick={handleFB}
                    className="w-full border-[#1d9cb5] border rounded font-semibold p-2 mt-3 flex justify-center items-center gap-3"
                >
                    <FaFacebook size="1em" />
                    <span>Continue with Facebook</span>
                </button>
            </div>
            <div className="text-center">
                <Link to="/forgot-password" className="link link-primary">
                    Forgot Password
                </Link>
                <br />
                <small>
                    By continuing I understand and agree with {" "}
                    <Link to="/forgot-password" className="link link-info">
                        Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/forgot-password" className="link link-info">
                        Privacy Policy.
                    </Link>
                </small>
            </div>
            <p className="text-center pt-8 text-red-700 font-semibold">
                {error}
            </p>
        </>
    );
};

export default Login;

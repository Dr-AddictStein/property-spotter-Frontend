import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import bgImage from "../../assets/images/Splash Screen.jpg";
import logo from "../../assets/logo/logo.png";
const { useForm } = Form;

const SplashScreen = () => {
    const [error, setError] = useState("");
    const { signinWithGoogle, user, setUser } = useContext(AuthContext);
    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();
    const [form] = useForm();

    const onFinish = async (values) => {
        try {
            const { name, email, password } = values;

            // Validate password
            if (!/(?=.*[A-Z]).*[a-z]/.test(password)) {
                setError(
                    "Please add at least one uppercase and one lowercase letter"
                );
                return;
            }

            const data = new FormData();
            data.append("name", name);
            data.append("email", email);
            data.append("role", "spotter");
            data.append("password", password);
            data.append("images", fileList[0].originFileObj);
            data.append("termsAndcondition", true);

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            };
            const url = "https://api.propertyspotter.co.za/signup/spotter";
            try {
                const res = await axios.post(url, data, config);
                message.success("Spooter Registration Successfull!");
                form.resetFields();
                navigate("/otp");
            } catch (error) {
                console.error("Signup failed:", error);
                message.error("Failed to signup. Please try again later.");
            }
        } catch (error) {
            console.error("Signup failed:", error);
            message.error("Failed to signup. Please try again later.");
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const normFile = (e) => {
        setFileList(e.fileList);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const props = {
        multiple: false,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: () => {
            return false;
        },
        fileList,
    };

    const handleGoogleLogin = () => {
        signinWithGoogle()
            .then((result) => {
                const person = result?.user;

                if (person) {
                    const userData = {
                        name: person?.displayName,
                        email: person?.email,
                        role: "spotter",
                        password: "",
                        photoURL: person?.photoURL,
                    };

                    axios
                        .post("https://api.propertyspotter.co.za/signup/google", userData, {
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
                    role: "spotter",
                };

                axios
                    .post("https://api.propertyspotter.co.za/signup/google", saveUser, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then(() => {
                        message.success("Login successful"); // Display success message
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

    const handleRegi = async (e) => {
        e.preventDefault();
        const spooterData = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };
        const res = await axios.post(
            "https://api.propertyspotter.co.za/spotter/registration",
            spooterData
        );
        if (res.data._id) {
            toast.success("Form submitted successfully");
        } else {
            toast.error("Email already use");
            console.log("error here");
        }
    };
    return (
        <div
            className="flex justify-center bg-center items-center h-screen"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "100%"
            }}
        >
            <div className="">
                <div className="lg:w-[600px] mx-auto shadow-xl rounded-xl bg-white px-16 py-10">
                    <>
                        <div className=" flex justify-center items-center mb-10 sm:hidden">
                            <img className="w-48" src={logo} alt="logo" />
                        </div>
                        <div className=" text-2xl text-center font-bold mb-2">
                            Fill out this form to become a Property Spotter
                        </div>
                        <Form
                            form={form}
                            name="property_signup"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <label htmlFor="">Name</label>
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your name!",
                                    },
                                ]}
                            >
                                <Input className="bg-[#f5f5f5] rounded px-2 border-slate-300 border w-full" />
                            </Form.Item>
                            <label htmlFor="">Email</label>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your email!",
                                    },
                                ]}
                            >
                                <Input className="bg-[#f5f5f5] rounded px-2 border-slate-300 border w-full" />
                            </Form.Item>
                            <label htmlFor="">Password</label>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}
                            >
                                <Input.Password className="bg-[#f5f5f5] rounded px-2 border-slate-300 border w-full" />
                            </Form.Item>
                            <label htmlFor="">Image</label>
                            <Form.Item
                                name="user_image"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                // rules={[
                                //     {
                                //         required: false,
                                //         message: "Please upload a Image!",
                                //     },
                                // ]}
                            >
                                <Upload
                                    name="logo"
                                    action="/upload.do"
                                    listType="picture"
                                    {...props}
                                    className=""
                                >
                                    <Button
                                        className="w-full"
                                        icon={<UploadOutlined />}
                                    >
                                        Click to upload Image
                                    </Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full bg-[#1d9cb5] rounded text-white font-semibold h-10 mt-3"
                                >
                                    Create New Account
                                </Button>
                            </Form.Item>
                        </Form>
                        <p className="text-center text-red-700 font-semibold">
                            {error}
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-2">
                            <h3>Already Have an Account ?</h3>{" "}
                            <Link
                                className="text-primary font-bold"
                                to="/loginSignup"
                            >
                                Login
                            </Link>
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;

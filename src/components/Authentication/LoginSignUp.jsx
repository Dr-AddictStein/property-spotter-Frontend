import { Tabs } from "antd";
import React from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

const LoginSignUp = () => {
  const items = [
    {
      key: "1",
      label: "Sign in",
      children: <Login />,
    },
    {
      key: "2",
      label: "New account",
      children: <SignUp />,
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div className="lg:w-full w-11/12  lg:my-28 my-12">
      <div className="flex justify-center">
        <div className="w-[600px] bg-[#edf7f4] border-2 shadow-2xl rounded-lg p-8 mb-4">
          <Tabs centered defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;

import React from "react";
import { FaSnapchatSquare } from "react-icons/fa";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../../config/appwriteConfig";
import { AppwriteException } from "appwrite";
import { userStore } from "../../state/userStore";

const Login = () => {
  const [authState, setauthState] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const userState = userStore();
  const navigate = useNavigate();

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const loginFunction = account.createEmailSession(
      authState.email,
      authState.password
    );

    loginFunction
      .then((res) => {
        setLoading(false);
        userState.updateUserSession(res);
        navigate("/");
      })
      .catch((err: AppwriteException) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  return (
    <div className="h-[100vh] flex justify-center items-center ">
      <div className="w-[520px] p-2 rounded-md shadow flex py-10 px-4  flex-col bg-white">
        <div className="flex items-center space-x-2 justify-center">
          <h1 className="text-[28px]">Chit Chat </h1>
          <span className="text-[30px]">
            <FaSnapchatSquare />
          </span>
        </div>
        <div className="ml-3 py-2">
          <h1 className="text-[29px]">Login</h1>
          Welcome back to chit chat
        </div>
        <form onSubmit={handleSumbit}>
          <div className="mt-3">
            <Input
              label="Email"
              type="email"
              onChange={(e) =>
                setauthState({ ...authState, email: e.target.value })
              }
            />
          </div>
          <div className="mt-3">
            <Input
              label="Password"
              type="password"
              onChange={(e) =>
                setauthState({ ...authState, password: e.target.value })
              }
            />
          </div>
          <div className="mt-3">
            <Button
              color="danger"
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "login"}
            </Button>
          </div>
        </form>
        <p className="text-center pt-5">
          Dont have a account.{" "}
          <Link to="/register" className="text-red-500 font-semibold">
            register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

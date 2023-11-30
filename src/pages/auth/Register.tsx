import { Button, Input, Spinner } from "@nextui-org/react";
import { FaSnapchatSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { account } from "../../config/appwriteConfig";
import { AppwriteException, ID } from "appwrite";

const Register = () => {
  const [authState, setAuthState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("im here");
    setLoading(true);
    const geted = account.create(
      ID.unique(),
      authState.email,
      authState.password,
      authState.name
    );
    geted
      .then((res) => {
        console.log("the response is", res);
        setLoading(false);
        navigate("/login");
      })
      .catch((err: AppwriteException) => {
        setLoading(false);
        console.log("The exception is", err.message);
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
          <h1 className="text-[29px]">Register</h1>
          Put your details below
        </div>
        <form onSubmit={handleSumbit}>
          <div className="mt-3">
            <Input
              label="Name"
              type="text"
              onChange={(e) =>
                setAuthState({ ...authState, name: e.target.value })
              }
            />
          </div>
          <div className="mt-3">
            <Input
              label="Email"
              type="email"
              onChange={(e) =>
                setAuthState({ ...authState, email: e.target.value })
              }
            />
          </div>
          <div className="mt-3">
            <Input
              label="Password"
              type="password"
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
            />
          </div>
          <div className="mt-5">
            <Button
              color="danger"
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "register"}
            </Button>
          </div>
        </form>
        <p className="text-center pt-5">
          Have a account.{" "}
          <Link to="/login" className="text-red-500 font-semibold">
            login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosDf from "../../api/axios";
import { useAuthUserQuery } from "../../api/endpoints/auth.endpoint";
import SS from "../util/SpinningCircle";
import Form from "./Form";

interface Props {
  type: "LOGIN" | "REGISTER";
}

const Welcome = (props: Props) => {
  const isLogin = props.type === "LOGIN";
  const {
    register,
    formState: { errors, isSubmitting: loading, isSubmitSuccessful: success },
    handleSubmit,
  } = useForm();
  const isLoading = loading && !success;

  return (
    <div className="flex min-h-screen w-full mx-auto items-center justify-center bg-">
      <div className="mb-12 w-11/12 max-w-[24rem] border rounded-md">
        <div
          className={`h-[40vh] place-items-center ${
            isLoading ? "grid" : "hidden"
          }`}
        >
          <SS />
        </div>
        <div
          className={`w-full rounded-md bg-white py-12 px-6 ${
            isLoading ? "hidden" : "block"
          }`}
        >
          <h2 className="text-center text-3xl font-medium text-gray-800">
            {isLogin ? "Login" : "Register"}
          </h2>

          <Form
            type={isLogin ? "LOGIN" : "SIGNUP"}
            onSubmit={isLogin ? logIn : registerUser}
            {...{ errors, handleSubmit, register, loading }}
          />
          <div className="flex items-center">
            <hr className="grow border-t-[.5px] border-gray-400" />
            <span className="my-3 block w-fit bg-white px-2 text-center">
              OR
            </span>
            <hr className="grow border-t-[.5px] border-gray-400" />
          </div>
          <Link to={isLogin ? "/register" : "/login"}>
            <span className="block text-center text-indigo-600 hover:underline">
              {isLogin ? "Join now" : "Log In"}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

const logIn = async (body: FieldValues) => {
  const result = await axiosDf.post("auth/login", body);
  return result.data;
};

const registerUser = async (body: FieldValues) => {
  const result = await axiosDf.post("auth/register", body);
  return result.data;
};

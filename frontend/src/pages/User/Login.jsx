import { useState } from "react";
import authService from "../../Utils/authService";
import { navigateByRole } from "../../Utils/authGuard";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    if (currentState === "Login") {
      event.preventDefault();
      const email = event.target[0].value;
      const password = event.target[1].value;
      const response = await authService.login({ email, pass: password });
      if (response.token) {
        navigateByRole(response.role, navigate);
      }
    } else {
      event.preventDefault();
      const name = event.target[0].value;
      const email = event.target[1].value;
      const password = event.target[2].value;
      const response = await authService.signup({
        name,
        email,
        pass: password,
        role: "user",
        storeName: "",
      });
      if (response.token) {
        navigateByRole(response.role, navigate);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
      </div>

      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot Your Password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {" "}
        {currentState === "Login" ? "Log In" : " Sign Up"}{" "}
      </button>
    </form>
  );
};

export default Login;

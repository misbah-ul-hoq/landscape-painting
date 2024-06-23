import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../Providers/AuthProvider";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { logInWithEmailAndPassword, signInWithGoogle, signInWithGithub } =
    useContext(AuthContext);

  const location = useLocation();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        // console.log(navigate.state);
        navigate(location.state ? location.state : "/");
      })
      .catch(() => {});
  };

  const handleGithubLogin = () => {
    signInWithGithub()
      .then(() => {
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    logInWithEmailAndPassword(email, password)
      .then(() => {
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setErrorMessage("Wrong email or password");
        }
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="flex justify-center items-center py-8 bg-[url('/blob.svg')] bg-no-repeat bg-cover">
      <div className="w-full max-w-lg px-2 space-y-4 rounded-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-left text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              name="email"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm text-left font-medium text-gray-700">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="input input-bordered w-full"
              placeholder="Enter your password"
              name="password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 text-xl top-5 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errorMessage && <p className="text-error">{errorMessage}</p>}
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <p>
          Not have an account yet?{" "}
          <Link to="/signup" className="text-lg text-info">
            SignUp
          </Link>
        </p>
        <div className="divider">OR</div>
        <button
          className="btn w-full flex items-center justify-center space-x-2 border"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
            alt=""
            className="w-8 h-8 object-cover"
          />
          <span className="">Login with Google</span>
        </button>
        <button
          className="btn btn-neutral w-full flex items-center justify-center"
          onClick={handleGithubLogin}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/1024px-Github-desktop-logo-symbol.svg.png
"
            alt=""
            className="w-8 h-8 object-cover"
          />
          <span>Login with Github</span>
        </button>
      </div>
    </div>
  );
};

export default Login;

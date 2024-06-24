import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Signup = () => {
  const {
    user,
    setLoading,
    signUpWithEmailAndPassword,
    signInWithGoogle,
    signInWithGithub,
  } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [isMinLength, setIsMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [render, setRender] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setIsMinLength(value.length >= 6);
    setHasUppercase(/[A-Z]/.test(value));
    setHasLowercase(/[a-z]/.test(value));
  };

  const handleShowPassword = () => {
    setShowPassword((pre) => !pre);
  };

  const handleGoogleSignUp = () => {
    signInWithGoogle()
      .then(() => {
        navigate(navigate.state ? navigate.state : "/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleGithubSignup = () => {
    signInWithGithub()
      .then(() => {
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const displayName = form.get("fullname");
    const email = form.get("email");
    const password = form.get("password");
    const photoURL = form.get("photoURL");
    const userInfo = { displayName, email, password, photoURL };

    setErrorMessage("");

    if (!isMinLength) {
      setErrorMessage("Please provide 6 characters");
      return;
    }
    if (!hasUppercase) {
      setErrorMessage("Please provide an uppercase letter");
      return;
    }
    if (!hasLowercase) {
      setErrorMessage("Please provide a lowercase letter");
      return;
    }

    console.log("component re renders for the value", render);

    fetch("https://practisetask-backend.vercel.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        setRender(true);
        console.log(data);
      });

    signUpWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.photoURL = photoURL;
        user.displayName = displayName;
        setLoading(false);
        Swal.fire({
          title: "Success!",
          text: "Register Successfull",
          icon: "success",
          confirmButtonText: "Ok",
        });
        // navigate(navigate.state ? navigate.state : "/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="py-8">
      <div className="max-w-lg mx-auto flex-1 flex flex-col items-stretch justify-stretch">
        <div className="rounded text-black w-full relative">
          <h1 className="mb-6 text-3xl text-center">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border w-full p-3 rounded-lg mb-4"
              name="fullname"
              placeholder="Full Name"
              required
            />

            <input
              type="email"
              className="block border w-full p-3 rounded mb-4"
              name="email"
              required
              placeholder="Email"
            />
            <input
              type={!showPassword ? "password" : "text"}
              onChange={handlePasswordChange}
              className="block border w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              required
            />

            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full block mb-4"
              name="photoURL"
              required
            />
            <span
              className="absolute top-[195px] right-2 text-2xl p-2"
              onClick={handleShowPassword}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>

            <div className="flex flex-col space-y-1 text-sm pb-4">
              <div
                className={`flex items-center ${
                  isMinLength ? "text-green-500" : "text-red-500"
                }`}
              >
                <span className="mr-2">{isMinLength ? "✔️" : "❌"}</span>
                <span>At least 6 characters</span>
              </div>
              <div
                className={`flex items-center ${
                  hasUppercase ? "text-green-500" : "text-red-500"
                }`}
              >
                <span className="mr-2">{hasUppercase ? "✔️" : "❌"}</span>
                <span>At least one uppercase letter</span>
              </div>
              <div
                className={`flex items-center ${
                  hasLowercase ? "text-green-500" : "text-red-500"
                }`}
              >
                <span className="mr-2">{hasLowercase ? "✔️" : "❌"}</span>
                <span>At least one lowercase letter</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-center py-3 text-white mb-1"
            >
              Create Account
            </button>

            <p className="text-error">{errorMessage && errorMessage}</p>
          </form>
        </div>

        <div className="pt-1">
          Already have an account? &nbsp;
          <Link className="text-info text-lg " to="/login">
            Log in
          </Link>
        </div>

        <div className="divider">OR</div>

        <button
          className="btn btn-outline w-full flex items-center justify-center space-x-2 bg-white border mb-4"
          onClick={handleGoogleSignUp}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
            alt=""
            className="w-8 h-8 object-cover"
          />
          <span className="">SignUp with Google</span>
        </button>
        <button
          className="btn btn-neutral w-full flex items-center justify-center text-white"
          onClick={handleGithubSignup}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/1024px-Github-desktop-logo-symbol.svg.png

"
            alt=""
            className="w-8 h-8 object-cover"
          />
          <span>SignUp with Github</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Signup = () => {
  const { signUpWithEmailAndPassword, signInWithGoogle, signInWithGithub } =
    useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMinLength, setIsMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("fullname");
    const email = form.get("email");
    const password = form.get("password");
    const photoURL = form.get("photoURL");

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
    signUpWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user.displayName = name;
        userCredential.user.photoURL = photoURL;
        console.log(userCredential.user);
        navigate(navigate.state ? navigate.state : "/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="py-8 flex flex-col bg-no-repeat bg-cover bg-[url(/blob3.svg)]">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="px-6 py-5 rounded text-black w-full relative">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
              required
            />

            {/* <input
              type="file"
              className="file-input mb-4 file-input-bordered file-input-secondary w-full max-w-xs"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
              required
            /> */}
            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              required
              placeholder="Email"
            />
            <input
              type={!showPassword ? "password" : "text"}
              onChange={handlePasswordChange}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              required
            />

            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full max-w-xs mb-4"
              name="photoURL"
            />
            <span
              className="absolute top-[224px] right-8 text-2xl p-2"
              onClick={handleShowPassword}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>

            <div className="flex flex-col space-y-2 pb-4">
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
              className="btn btn-primary w-full text-center py-3 rounded bg-green text-white  my-1"
            >
              Create Account
            </button>

            <p className="text-error">{errorMessage && errorMessage}</p>
          </form>
        </div>

        <div className="">
          Already have an account?
          <Link className="text-info text-lg px-1" to="/login">
            Log in
          </Link>
          .
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
          className="btn btn-primary w-full flex items-center justify-center text-white"
          onClick={handleGithubSignup}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
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

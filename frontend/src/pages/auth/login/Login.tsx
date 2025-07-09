import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useSignIn } from "../../../hooks/useSIgnIn";
import { useEffect, useState } from "react";
import { useNotification } from "../../../context/notification/NotificationContext";

type TUserLogin = {
  email: string;
  password: string;
};

const Login = () => {
  const { showSuccess, showError } = useNotification();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUserLogin>();
 const navigate = useNavigate();
  const {signIn, loading, error, success} = useSignIn();
  const [loginError, setLoginError] = useState<string|"">("");

  const onSubmit: SubmitHandler<TUserLogin> = async (data) => {
    setLoginError("");
    await signIn(data.email as string, data.password as string);
  };

  useEffect(()=>{
    if(success){
       showSuccess("Login successful!" , 1000);
      setTimeout(() => {
         navigate('/');
      }, 1000);
    }
    if(error){
      setLoginError(error);
    }
  },[success,error])

  return (
    <div className="login-container">
      <div className="heading animated-heading">
        <h1 className="animated-item">Welcome Back to Zen Easy BD</h1>
        <h2 className="animated-item">Login to Your Account</h2>
        <p className="animated-item">
          Access your services and connect with ease.
        </p>
      </div>

      <div className="login-form-section animated-form-section">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-grid">
            {/* Email Input */}
            <div className="form-group animated-item">
              <label htmlFor="loginEmail">Email</label>
              <input
                id="loginEmail"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                placeholder="john.doe@example.com"
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            {/* Password Input */}
            <div className="form-group animated-item">
              <label htmlFor="loginPassword">Password</label>
              <input
                id="loginPassword"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                placeholder="********"
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>
          </div>
          <div className="text-red-500 my-2">{loginError && <span className="error-message">{loginError}</span>}</div>

          {/* (Login Button */}
          <div className="form-actions animated-item">
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn btn-primary"
            >
              {isSubmitting ? "Logging In..." : "Login"}
            </button>
          </div>

          {/* Registration Link */}
          <div className="register-link animated-item">
            New here? <Link to="/auth/register">Please Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Register.scss";
import { Link } from "react-router-dom";
import { useRegister } from "../../../hooks/useRegister";
import type { TUserRegistration } from "../../../utils/types/registerUserType";
import { AuthContext } from "../../../context/AuthContext";
import Cookies from "js-cookie";

const Register = () => {
  const authcontext = useContext(AuthContext);

  if (!authcontext) {
    throw new Error("Authentication context is not available.");
  }

  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TUserRegistration>({
    defaultValues: {
      gender: "",
      address: {
        street: "",
        city: "",
        postalCode: "",
      },
      socialMedia: {
        facebook: "",
        instagram: "",
        linkedin: "",
      },
      dateOfBirth: null,
    },
  });

  const selfId = Cookies.get("zenEasySelfId");
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const { error, success, register: registerUser } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch("password");

  //------------------------ handle onsubmit--------------------------
  const onSubmit: SubmitHandler<TUserRegistration> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    await registerUser(data);
  };

  useEffect(() => {
    if (success) {
      // alert ("registration complete");
      console.log("Registration complete");
      window.location.replace(`/auth/otp-validate/${selfId}`);
    }
    if (error) {
      alert(error);
    }
  }, [success, error]);

  // ----------handle profile image change-----------
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImagePreview(URL.createObjectURL(file));
    } else {
      setProfileImagePreview(null);
    }
  };

  // ---------------------------------return body ----------------------------------
  return (
    <div className="register-container">
      <div className="heading animated-heading">
        <h1 className="animated-item">Welcome to Zen Easy BD</h1>
        <h2 className="animated-item">Register Your Account</h2>
        <p className="animated-item">
          Join us to experience seamless services.
        </p>
      </div>

      <div className="register-form-section animated-form-section">
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <div className="form-grid">
            {/* Full Name */}
            <div className="form-group animated-item">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Full name is required" })}
                placeholder="Enter Full Name"
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>

            {/* Profile Image*/}
            <div className="form-group full-width profile-image-upload animated-item">
              <label htmlFor="profileImage">Profile Image</label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                {...register("profileImage")}
                onChange={handleProfileImageChange}
                className={errors.profileImage ? "error" : ""}
              />
              {profileImagePreview && (
                <div className="profile-image-preview">
                  <img src={profileImagePreview} alt="Profile Preview" />
                </div>
              )}
              {errors.profileImage && (
                <span className="error-message">
                  {errors.profileImage.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-group animated-item">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                placeholder="e.g. zen.easy.info@example.com"
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>
            <div className="hidden lg:block">
              <br />
            </div>

            {/* Password */}
            <div className="form-group password-group animated-item">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
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
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group password-group animated-item">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="********"
                className={errors.confirmPassword ? "error" : ""}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
              {errors.confirmPassword && (
                <span className="error-message">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Phone Number */}
            <div className="form-group animated-item">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                placeholder="+880 1XXXXXXXXX"
                className={errors.phoneNumber ? "error" : ""}
              />
              {errors.phoneNumber && (
                <span className="error-message">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            {/* NID */}
            <div className="form-group animated-item">
              <label htmlFor="nid">NID (Optional)</label>
              <input
                id="nid"
                type="text"
                {...register("nid")}
                placeholder="XXXXXXXXXXXXX"
                className={errors.nid ? "error" : ""}
              />
              {errors.nid && (
                <span className="error-message">{errors.nid.message}</span>
              )}
            </div>

            {/* Address - Street */}
            <div className="form-group animated-item">
              <label htmlFor="street">Street Address</label>
              <input
                id="street"
                type="text"
                {...register("address.street", {
                  required: "Street is required",
                })}
                placeholder="123 Main St"
                className={errors.address?.street ? "error" : ""}
              />
              {errors.address?.street && (
                <span className="error-message">
                  {errors.address.street.message}
                </span>
              )}
            </div>

            {/* Address - City */}
            <div className="form-group animated-item">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                {...register("address.city", { required: "City is required" })}
                placeholder="Dhaka"
                className={errors.address?.city ? "error" : ""}
              />
              {errors.address?.city && (
                <span className="error-message">
                  {errors.address.city.message}
                </span>
              )}
            </div>

            {/* Address - Postal Code */}
            <div className="form-group animated-item">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                id="postalCode"
                type="text"
                {...register("address.postalCode", {
                  required: "Postal code is required",
                })}
                placeholder="1000"
                className={errors.address?.postalCode ? "error" : ""}
              />
              {errors.address?.postalCode && (
                <span className="error-message">
                  {errors.address.postalCode.message}
                </span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="form-group animated-item">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <Controller
                control={control}
                name="dateOfBirth"
                rules={{ required: "Date of Birth is required" }}
                render={({ field }) => (
                  <DatePicker
                    id="dateOfBirth"
                    placeholderText="Select your Date of Birth"
                    maxDate={new Date()}
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    dateFormat="dd/MM/yyyy"
                    className={`date-picker-input ${
                      errors.dateOfBirth ? "error" : ""
                    }`}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                )}
              />
              {errors.dateOfBirth && (
                <span className="error-message">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            {/* Gender */}
            <div className="form-group animated-item">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                {...register("gender", { required: "Gender is required" })}
                className={errors.gender ? "error" : ""}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <span className="error-message">{errors.gender.message}</span>
              )}
            </div>

            {/* Nationality */}
            <div className="form-group animated-item">
              <label htmlFor="nationality">Nationality</label>
              <input
                id="nationality"
                type="text"
                {...register("nationality", {
                  required: "Nationality is required",
                })}
                placeholder="Bangladeshi"
                className={errors.nationality ? "error" : ""}
              />
              {errors.nationality && (
                <span className="error-message">
                  {errors.nationality.message}
                </span>
              )}
            </div>

            {/* Occupation */}
            <div className="form-group animated-item">
              <label htmlFor="occupation">Occupation</label>
              <input
                id="occupation"
                type="text"
                {...register("occupation", {
                  required: "Occupation is required",
                })}
                placeholder="e.g., Engineer, Electrician, Maid, Student...."
                className={errors.occupation ? "error" : ""}
              />
              {errors.occupation && (
                <span className="error-message">
                  {errors.occupation.message}
                </span>
              )}
            </div>

            {/* Social Media Links */}
            <div className="form-group full-width social-media-group animated-item">
              <label>Social Media (Optional)</label>
              <input
                type="text"
                {...register("socialMedia.facebook")}
                placeholder="Facebook Profile URL"
              />
              <input
                type="text"
                {...register("socialMedia.instagram")}
                placeholder="Instagram Profile URL"
              />
              <input
                type="text"
                {...register("socialMedia.linkedin")}
                placeholder="LinkedIn Profile URL"
              />
            </div>
          </div>

          <div className="form-actions animated-item">
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn btn-primary"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
          <div className="register-link animated-item">
            Already Registered? <Link to="/auth/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

import type { TNewService } from "../../utils/types/newServiceType";
import { useForm, type SubmitHandler } from "react-hook-form";
import "./OfferService.scss";

const OfferService = () => {
  const user = {
    id: 69,
    professions: ["x", "y"],
  };

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TNewService>();

  const delay = (d: number) => {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve("done");
      }, d * 1000);
    });
  };

  const onSubmit: SubmitHandler<TNewService> = async (data) => {
    await delay(3);
    console.log(data);
  };

  return (
    <div className="offer-service-container">
      <div className="header-section">
        <div className="profile-status">
          {user?.professions?.length == 0 ? (
            <div className="no-profile">
              <div className="status-icon">👤</div>
              <h3>No Professional Profile</h3>
              <p>Create your first professional service profile</p>
            </div>
          ) : (
            <div className="has-profile">
              <div className="status-icon">✅</div>
              <h3>Current Profession</h3>
              <p>You are currently working as: <span className="profession-name">{user.professions[0]}</span></p>
            </div>
          )}
        </div>
      </div>

      <div className="service-form-section">
        {user?.professions?.length > 2 ? (
          <div className="limit-reached">
            <div className="warning-icon">⚠️</div>
            <h3>Service Limit Reached</h3>
            <p>You are not allowed to work more than two jobs simultaneously.</p>
          </div>
        ) : (
          <div className="add-service">
            <div className="form-header">
              <h2>Add New Service</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="service-form">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="serviceTitle">Service Type</label>
                  <select
                    id="serviceTitle"
                    {...register("serviceTitle", { required: "Please select a service type" })}
                    className={errors.serviceTitle ? "error" : ""}
                  >
                    <option value="">Choose your service</option>
                    <option value="Maid">🏠 Home Cleaning</option>
                    <option value="Tutor">📚 Private Tutor</option>
                    <option value="Electrician">⚡ Electrician</option>
                    <option value="IT Consultant">💻 IT Consultant</option>
                    <option value="Painter">🎨 Painter</option>
                    <option value="Plumber">🔧 Plumber</option>
                  </select>
                  {errors.serviceTitle && (
                    <span className="error-message">{errors.serviceTitle.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input
                    id="contactNumber"
                    type="tel"
                    {...register("contactNumber", { 
                      required: "Contact number is required",
                      pattern: {
                        value: /^[0-9+\-\s()]+$/,
                        message: "Please enter a valid phone number"
                      }
                    })}
                    placeholder="+880 1731588825"
                    className={errors.contactNumber ? "error" : ""}
                  />
                  {errors.contactNumber && (
                    <span className="error-message">{errors.contactNumber.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    {...register("workArea.city", { required: "City is required" })}
                    placeholder="Dhaka"
                    className={errors.workArea?.city ? "error" : ""}
                  />
                  {errors.workArea?.city && (
                    <span className="error-message">{errors.workArea.city.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    id="postalCode"
                    type="text"
                    {...register("workArea.postalCode", { required: "Postal code is required" })}
                    placeholder="1000"
                    className={errors.workArea?.postalCode ? "error" : ""}
                  />
                  {errors.workArea?.postalCode && (
                    <span className="error-message">{errors.workArea.postalCode.message}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="description">Service Description</label>
                  <textarea
                    id="description"
                    {...register("description", { 
                      required: "Please describe your service",
                      minLength: {
                        value: 20,
                        message: "Description should be at least 20 characters"
                      }
                    })}
                    placeholder="Describe your service, experience, and what makes you unique..."
                    rows={4}
                    className={errors.description ? "error" : ""}
                  />
                  {errors.description && (
                    <span className="error-message">{errors.description.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="minPrice">Minimum Price (BDT)</label>
                  <input
                    id="minPrice"
                    type="number"
                    {...register("priceRange.min", { 
                      required: "Minimum price is required",
                      min: { value: 1, message: "Price must be greater than 0" }
                    })}
                    placeholder="500"
                    className={errors.priceRange?.min ? "error" : ""}
                  />
                  {errors.priceRange?.min && (
                    <span className="error-message">{errors.priceRange.min.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="maxPrice">Maximum Price (BDT)</label>
                  <input
                    id="maxPrice"
                    type="number"
                    {...register("priceRange.max", { 
                      required: "Maximum price is required",
                      min: { value: 1, message: "Price must be greater than 0" }
                    })}
                    placeholder="2000"
                    className={errors.priceRange?.max ? "error" : ""}
                  />
                  {errors.priceRange?.max && (
                    <span className="error-message">{errors.priceRange.max.message}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Available Days</label>
                  <div className="checkbox-group">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <label key={day} className="checkbox-item">
                        <input
                          type="checkbox"
                          value={day}
                          {...register("dayOfWeek", { required: "Please select at least one day" })}
                        />
                        <span className="checkmark"></span>
                        {day}
                      </label>
                    ))}
                  </div>
                  {errors.dayOfWeek && (
                    <span className="error-message">{errors.dayOfWeek.message}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Available Time</label>
                  <div className="radio-group">
                    {[
                      { value: "day", label: "Day Time", icon: "☀️" },
                      { value: "night", label: "Night Time", icon: "🌙" },
                      { value: "always", label: "24/7 Available", icon: "🕐" }
                    ].map((time) => (
                      <label key={time.value} className="radio-item">
                        <input
                          type="radio"
                          value={time.value}
                          {...register("availableTimes", { required: "Please select your availability" })}
                        />
                        <span className="radio-mark"></span>
                        <div className="radio-content">
                          <span className="radio-icon">{time.icon}</span>
                          <span className="radio-label">{time.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.availableTimes && (
                    <span className="error-message">{errors.availableTimes.message}</span>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="submit-btn btn-primary"
                >
                  {isSubmitting ? "Publishing..." : "Publish Service"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferService;
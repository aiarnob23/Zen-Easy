import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddRent.scss";

const AddRent = () => {
  const userEmail = "airnob23@gmail.com";

  const [imageFields, setImageFields] = useState([1, 2, 3]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    email: userEmail,
    category: "",
    cost: "",
    rentPaymentFrequency: "",
    rentStartDate: "",
    contactInfo: "",
    addressLine: "",
    city: "",
    postalCode: "",
    details: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const delay = (d: number): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("done");
      }, d * 1000);
    });
  };

  // ----------------- image uploading handles-----
  const handleAddMoreImages = () => {
    if (imageFields.length < 5) {
      setImageFields([...imageFields, imageFields.length + 1]);
    }
  };

  const handleImageChange = (index: number, file: File | null) => {
    const newImages = [...selectedImages];
    const newPreviewUrls = [...imagePreviewUrls];

    // same image or not
    if (newPreviewUrls[index]) {
      URL.revokeObjectURL(newPreviewUrls[index]);
    }

    // image preview
    if (file) {
      newImages[index] = file;
      newPreviewUrls[index] = URL.createObjectURL(file);
    } else {
      newImages.splice(index, 1);
      newPreviewUrls.splice(index, 1);
    }

    setSelectedImages(newImages);
    setImagePreviewUrls(newPreviewUrls);
  };

  const handleRemoveImageField = (indexToRemove: number) => {
    if (imageFields.length > 3) {
      setImageFields(imageFields.filter((_, index) => index !== indexToRemove));

      const newImages = selectedImages.filter(
        (_, index) => index !== indexToRemove
      );
      const newPreviewUrls = imagePreviewUrls.filter((_, index) => {
        if (index === indexToRemove && imagePreviewUrls[index]) {
          URL.revokeObjectURL(imagePreviewUrls[index]);
        }
        return index !== indexToRemove;
      });

      setSelectedImages(newImages);
      setImagePreviewUrls(newPreviewUrls);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // -------------validate form -----------------
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.category)
      newErrors.category = "Please select a property category";
    if (!formData.cost) newErrors.cost = "Rent amount is required";
    else if (parseFloat(formData.cost) <= 0)
      newErrors.cost = "Rent must be greater than 0";
    if (!formData.rentPaymentFrequency)
      newErrors.rentPaymentFrequency = "Please select payment frequency";
    if (!formData.rentStartDate)
      newErrors.rentStartDate = "Start date is required";
    if (!formData.contactInfo)
      newErrors.contactInfo = "Contact number is required";
    else if (!/^[0-9+\-\s()]+$/.test(formData.contactInfo))
      newErrors.contactInfo = "Please enter a valid phone number";
    if (!formData.addressLine) newErrors.addressLine = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
    if (!formData.details) newErrors.details = "Please describe your property";
    else if (formData.details.length < 30)
      newErrors.details = "Description should be at least 30 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    await delay(3);

    console.log("Form data:", formData);
    console.log("Selected images:", selectedImages);

    setIsSubmitting(false);
  };

  // "Add More Images" logic
  const isAddMoreImagesDisabled =
    selectedImages.filter(Boolean).length < 3 && imageFields.length === 3;

  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [imagePreviewUrls]);

  return (
    <div className="add-rent-container">
      <div className="rent-form-section">
        <div className="add-rental">
          <div className="form-header">
            <h2>Add New Rental</h2>
          </div>

          <div className="rent-form">
            <div className="form-grid">
              {/* Property Category */}
              <div className="form-group full-width">
                <label htmlFor="category">Property Category</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className={errors.category ? "error" : ""}
                >
                  <option value="">Choose property type</option>
                  <option value="bachelor room">🛏️ Bachelor Room</option>
                  <option value="family room">👨‍👩‍👧‍👦 Family Room</option>
                  <option value="flat">🏢 Flat/Apartment</option>
                  <option value="store">🏪 Store/Shop</option>
                  <option value="office">🏢 Office Space</option>
                  <option value="shopping mall">🛍️ Shopping Mall</option>
                </select>
                {errors.category && (
                  <span className="error-message">{errors.category}</span>
                )}
              </div>

              {/* Rent Amount */}
              <div className="form-group">
                <label htmlFor="cost">Rent Amount (BDT)</label>
                <input
                  type="number"
                  id="cost"
                  value={formData.cost}
                  onChange={(e) => handleInputChange("cost", e.target.value)}
                  placeholder="15000"
                  className={errors.cost ? "error" : ""}
                />
                {errors.cost && (
                  <span className="error-message">{errors.cost}</span>
                )}
              </div>

              {/* Payment Frequency */}
              <div className="form-group">
                <label htmlFor="rentPaymentFrequency">Payment Frequency</label>
                <select
                  id="rentPaymentFrequency"
                  value={formData.rentPaymentFrequency}
                  onChange={(e) =>
                    handleInputChange("rentPaymentFrequency", e.target.value)
                  }
                  className={errors.rentPaymentFrequency ? "error" : ""}
                >
                  <option value="">Select frequency</option>
                  <option value="daily">📅 Daily</option>
                  <option value="monthly">📅 Monthly</option>
                  <option value="quarterly">📅 Quarterly</option>
                  <option value="annually">📅 Annually</option>
                </select>
                {errors.rentPaymentFrequency && (
                  <span className="error-message">
                    {errors.rentPaymentFrequency}
                  </span>
                )}
              </div>

              {/* Available From */}
              <div className="form-group">
                <label htmlFor="rentStartDate">Available From</label>
                <DatePicker
                  id="rentStartDate"
                  selected={
                    formData.rentStartDate
                      ? new Date(formData.rentStartDate)
                      : null
                  }
                  onChange={(date: Date | null) =>
                    handleInputChange(
                      "rentStartDate",
                      date ? date.toISOString().split("T")[0] : ""
                    )
                  }
                  dateFormat="yyyy-MM-dd"
                  className={`custom-datepicker-input ${
                    errors.rentStartDate ? "error" : ""
                  }`}
                  placeholderText="Select a date"
                  minDate={new Date()}
                />
                {errors.rentStartDate && (
                  <span className="error-message">{errors.rentStartDate}</span>
                )}
              </div>

              {/* Contact Number */}
              <div className="form-group">
                <label htmlFor="contactInfo">Contact Number</label>
                <input
                  type="tel"
                  id="contactInfo"
                  value={formData.contactInfo}
                  onChange={(e) =>
                    handleInputChange("contactInfo", e.target.value)
                  }
                  placeholder="+880 1731588825"
                  className={errors.contactInfo ? "error" : ""}
                />
                {errors.contactInfo && (
                  <span className="error-message">{errors.contactInfo}</span>
                )}
              </div>

              {/* Full Address */}
              <div className="form-group full-width">
                <label htmlFor="addressLine">Full Address</label>
                <input
                  type="text"
                  id="addressLine"
                  value={formData.addressLine}
                  onChange={(e) =>
                    handleInputChange("addressLine", e.target.value)
                  }
                  placeholder="House 123, Road 15, Block C"
                  className={errors.addressLine ? "error" : ""}
                />
                {errors.addressLine && (
                  <span className="error-message">{errors.addressLine}</span>
                )}
              </div>

              {/* City */}
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Dhaka"
                  className={errors.city ? "error" : ""}
                />
                {errors.city && (
                  <span className="error-message">{errors.city}</span>
                )}
              </div>

              {/* Postal Code */}
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="number"
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) =>
                    handleInputChange("postalCode", e.target.value)
                  }
                  placeholder="1000"
                  className={errors.postalCode ? "error" : ""}
                />
                {errors.postalCode && (
                  <span className="error-message">{errors.postalCode}</span>
                )}
              </div>

              {/* Property Details */}
              <div className="form-group full-width">
                <label htmlFor="details">Property Details</label>
                <textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => handleInputChange("details", e.target.value)}
                  placeholder="Describe your property features, amenities, nearby facilities, and any special requirements..."
                  rows={5}
                  className={errors.details ? "error" : ""}
                />
                {errors.details && (
                  <span className="error-message">{errors.details}</span>
                )}
              </div>

              {/* Property Images */}
              <div className="form-group full-width">
                <label>Property Images</label>
                <div className="image-upload-section">
                  {imageFields.map((fieldNum, index) => (
                    <div key={fieldNum} className="image-upload-field">
                      <div className="image-upload-wrapper">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const file = e.target.files?.[0] || null;
                            handleImageChange(index, file);
                          }}
                          className="image-input"
                          id={`image-${fieldNum}`}
                        />
                        <label
                          htmlFor={`image-${fieldNum}`}
                          className="image-upload-label"
                        >
                          <div className="upload-icon">📷</div>
                          <span>Upload Image {fieldNum}</span>
                        </label>

                        {/* Image Preview */}
                        {imagePreviewUrls[index] && (
                          <div className="image-preview">
                            <img
                              src={imagePreviewUrls[index]}
                              alt={`Preview ${fieldNum}`}
                              className="preview-thumbnail"
                            />
                            <span className="image-name">
                              {selectedImages[index]?.name ||
                                `Image ${fieldNum}`}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleImageChange(index, null)}
                              className="remove-image-btn"
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>

                      {index >= 3 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImageField(index)}
                          className="remove-field-btn"
                          title="Remove this field"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  ))}

                  {imageFields.length < 5 && (
                    <button
                      type="button"
                      onClick={handleAddMoreImages}
                      disabled={isAddMoreImagesDisabled}
                      className={`add-more-images-btn ${
                        isAddMoreImagesDisabled ? "disabled" : ""
                      }`}
                    >
                      + Add More Images
                    </button>
                  )}
                </div>
                <small className="field-hint">
                  Upload up to 5 images of your property
                </small>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button
                onClick={onSubmit}
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? "Publishing..." : "Post Ad"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRent;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./RentDetails.scss";
import { getRentDetails } from "../../services/rentServices";


const RentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [rentProperty, setRentProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 

  useEffect(() => {
    const fetchRentDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const getRentPostDetails = async()=>{
          const result = await getRentDetails(id as string);
          if(result?.success){
            setRentProperty(result.data);
          }
          else{
            setError("Rent details not found!")
          }
        }

        getRentPostDetails();
      } catch (err: any) {
        console.error("Failed to fetch rent details:", err);
        setError(err.message || "Could not load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRentDetails();
  }, [id]); 

  // Image slider navigation
  const goToNextImage = () => {
    if (rentProperty?.imageUrls) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % rentProperty.imageUrls!.length
      );
    }
  };

  const goToPrevImage = () => {
    if (rentProperty?.imageUrls) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + rentProperty.imageUrls!.length) % rentProperty.imageUrls!.length
      );
    }
  };

  if (loading) {
    return <div className="rent-details-container loading-state">Loading rental details...</div>;
  }

  if (error) {
    return <div className="rent-details-container error-state">Error: {error}</div>;
  }

  if (!rentProperty) {
    return <div className="rent-details-container no-data-state">No rental property found for ID: {id}</div>;
  }

  const handleEdit = () => {
    console.log("Edit button clicked for ID:", rentProperty._id);
  };

  const handleDelete = () => {
    console.log("Delete button clicked for ID:", rentProperty._id);
  };

  return (
    <div className="rent-details-wrapper">
      <div className="rent-details-container">
        {/* Header Section */}
        <div className="rent-header">
          <span className={`rent-status status-${rentProperty.status?.toLowerCase()}`}>{rentProperty.status}</span>
          <h1 className="rent-title">{rentProperty.category.replace(/\b\w/g, ( char : string) => char.toUpperCase())} for Rent</h1>
          <p className="rent-address-line">{rentProperty.addressLine}, {rentProperty.city}, {rentProperty.postalCode}</p>
          <p className="rent-cost">BDT {rentProperty.cost} <span className="frequency">/ {rentProperty.rentPaymentFrequency}</span></p>
        </div>

        {/* Image Carousel */}
        <div className="rent-image-gallery">
          {rentProperty.imageUrls && rentProperty.imageUrls.length > 0 ? (
            <>
              <div className="main-image-container">
                <img
                  src={rentProperty.imageUrls[currentImageIndex]}
                  alt={`Property Image ${currentImageIndex + 1}`}
                  className="main-image"
                />
                {rentProperty.imageUrls.length > 1 && (
                  <>
                    <button className="nav-button prev-button" onClick={goToPrevImage}>&lt;</button>
                    <button className="nav-button next-button" onClick={goToNextImage}>&gt;</button>
                  </>
                )}
              </div>
              {rentProperty.imageUrls.length > 1 && (
                <div className="thumbnail-gallery">
                  {rentProperty.imageUrls.map((url : string, index : number) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="no-images-placeholder">No images available for this property.</div>
          )}
        </div>

        {/* Details Section */}
        <div className="rent-info-sections">
          <div className="info-card details-description">
            <h2>Property Details</h2>
            <p className="description-text">{rentProperty.details}</p>
          </div>

          <div className="info-card">
            <h2>Key Information</h2>
            <ul className="key-info-list">
              <li><strong>Category:</strong> {rentProperty.category.replace(/\b\w/g, (char : string) => char.toUpperCase())}</li>
              <li><strong>Rent:</strong> BDT {rentProperty.cost} / {rentProperty.rentPaymentFrequency}</li>
              <li><strong>Available From:</strong> {new Date(rentProperty.rentStartDate).toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})}</li>
              <li><strong>Posted On:</strong> {new Date(rentProperty.createdAt).toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})}</li>
              <li><strong>Contact:</strong> {rentProperty.contactInfo}</li>
              <li><strong>Posted by:</strong> {rentProperty.user}</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="rent-actions">
          <button onClick={handleEdit} className="edit-btn">Edit Listing</button>
          <button onClick={handleDelete} className="delete-btn">Delete Listing</button>
        </div>
      </div>
    </div>
  );
};

export default RentDetailsPage;
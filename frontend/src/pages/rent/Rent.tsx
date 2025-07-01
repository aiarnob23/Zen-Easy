import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Rent.scss";
import { getRentPosts } from "../../services/rentService";
import OrbitalSpinner from "../../components/ui/LoadingSpinner";

const RentPage = () => {
  const [rentPosts, setRentPosts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllRentPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getRentPosts();
        if (result.success) {
          setRentPosts(result.data);
        } else {
          setRentPosts([]);
        }
      } catch (error) {
        console.log(error);
        setError("An error occurred while fetching posts");
      } finally {
        setLoading(false);
      }
    };

    getAllRentPosts();
  }, []);

  const renderImages = (images: string[]) => {
    const maxVisible = 3;
    const visibleImages = images.slice(0, maxVisible);
    const remainingCount = images.length - maxVisible;

    if (images.length === 1) {
      return (
        <div className="image-container single-image">
          <img src={images[0]} alt="Property" />
        </div>
      );
    }

    if (images.length === 2) {
      return (
        <div className="image-container two-images">
          {visibleImages.map((url, index) => (
            <div key={index} className="image-item">
              <img src={url} alt="Property" />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="image-container multiple-images">
        {visibleImages.map((url, index) => (
          <div
            key={index}
            className={`image-item ${
              index === 2 && remainingCount > 0 ? "has-overlay" : ""
            }`}
          >
            <img src={url} alt="Property" />
            {index === 2 && remainingCount > 0 && (
              <div className="image-overlay">
                <span>+{remainingCount}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };
  console.log(rentPosts);

  return (
    <div className="rent-posts-container">
      {loading ? (
        <div className="rent-loading-spinner">
          <OrbitalSpinner />
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="posts-filtering-container">
          {rentPosts.length > 0 && (
            <div className="filter-container">hello</div>
          )}
          <div className="posts-container">
            <div className="posts-grid">
              {rentPosts.length > 0 ? (
                rentPosts.map((post: any) => (
                  <Link
                    key={post?._id}
                    to={`/rent/${post?._id}`}
                    className="post-card"
                  >
                    <div className="post-images">
                      {renderImages(post.imageUrls || [])}
                    </div>

                    <div className="post-content">
                      <div className="post-header">
                        <h3 className="post-address">{post.addressLine}</h3>
                        <div
                          className={`post-status ${post.status?.toLowerCase()}`}
                        >
                          {post.status}
                        </div>
                      </div>

                      <div className="post-details">
                        <div className="post-price">
                          <span className="amount">
                            {formatCurrency(post.cost)}
                          </span>
                          <span className="frequency">
                            /{post.rentPaymentFrequency}
                          </span>
                        </div>

                        <div className="post-date">
                          Available from {formatDate(post.rentStartDate)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="no-posts">
                  <h3>No rental properties available</h3>
                  <p>Check back later for new listings</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentPage;

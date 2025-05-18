import { useEffect, useState } from "react";
import AxiosApi from "../../Lib/AxiosApi";
import "./Review.css";

function Review() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await AxiosApi.get("/review");
        setReviews(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des avis :", err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="reviews-page">
      <h2>Les avis des utilisateurs</h2>

      {reviews.length === 0 ? (
        <p className="no-reviews">Aucun avis pour le moment.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <img
                src={review.user?.avatar || "/user.png"}
                alt="avatar"
                className="review-avatar"
              />
              <div className="review-content">
                <div className="review-header">
                  <strong className="review-username">
                    {review.user?.username || "Utilisateur inconnu"}
                  </strong>
                  <span className="review-rating">
                    {"★".repeat(review.rating)} {"☆".repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="review-comment">"{review.comment}"</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Review;

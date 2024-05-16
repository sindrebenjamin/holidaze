import { useState } from "react";

import BigStar from "./Layout/icons/BigStar";

const RatingSelector = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (newRating: number) => void;
}) => {
  const [ratingHovered, setRatingHovered] = useState(0);

  const stars = [
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    {
      value: 5,
    },
  ];

  return (
    <div className="flex" onMouseLeave={() => setRatingHovered(0)}>
      {stars.map((star) => {
        const state =
          star.value <= rating
            ? "selected"
            : star.value <= ratingHovered
            ? "hover"
            : "idle";
        return (
          <BigStar
            key={star.value}
            onClick={() => setRating(star.value)}
            onHover={() => setRatingHovered(star.value)}
            state={state}
          />
        );
      })}
    </div>
  );
};

export default RatingSelector;

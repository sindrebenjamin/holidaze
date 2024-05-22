const ArrowRight = ({ color }: { color?: string }) => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.293 14.707C7.10553 14.5195 7.00021 14.2652 7.00021 14C7.00021 13.7348 7.10553 13.4805 7.293 13.293L10.586 10L7.293 6.70701C7.11084 6.51841 7.01005 6.26581 7.01233 6.00361C7.0146 5.74141 7.11977 5.4906 7.30518 5.30519C7.49059 5.11978 7.7414 5.01461 8.0036 5.01234C8.2658 5.01006 8.5184 5.11085 8.707 5.29301L12.707 9.29301C12.8945 9.48054 12.9998 9.73485 12.9998 10C12.9998 10.2652 12.8945 10.5195 12.707 10.707L8.707 14.707C8.51947 14.8945 8.26516 14.9998 8 14.9998C7.73484 14.9998 7.48053 14.8945 7.293 14.707Z"
        fill={color ? color : "#111827"}
      />
    </svg>
  );
};

export default ArrowRight;
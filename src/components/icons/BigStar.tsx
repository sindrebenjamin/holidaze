const BigStar = ({
  state,
  onHover,
  onClick,
}: {
  state: string;
  onHover: () => void;
  onClick: () => void;
}) => {
  if (state === "idle") {
    return (
      <svg
        className="cursor-pointer"
        onClick={onClick}
        onMouseEnter={onHover}
        width={38}
        height={38}
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.3317 4.59006C19.8628 3.14576 17.8195 3.14576 17.349 4.59006L14.967 11.9197C14.8644 12.2344 14.6648 12.5085 14.397 12.7029C14.1291 12.8972 13.8066 13.0019 13.4756 13.0018H5.76958C4.25158 13.0018 3.61803 14.9463 4.84748 15.8402L11.0826 20.3691C11.3504 20.5638 11.5497 20.8383 11.652 21.1532C11.7543 21.4682 11.7542 21.8074 11.6518 22.1223L9.27133 29.452C8.80087 30.8963 10.4553 32.0991 11.6832 31.2052L17.9183 26.6763C18.1863 26.4815 18.5091 26.3766 18.8404 26.3766C19.1717 26.3766 19.4945 26.4815 19.7625 26.6763L25.9976 31.2052C27.2254 32.0991 28.8799 30.8979 28.4094 29.452L26.0289 22.1223C25.9265 21.8074 25.9265 21.4682 26.0287 21.1532C26.131 20.8383 26.3303 20.5638 26.5982 20.3691L32.8333 15.8402C34.0611 14.9463 33.4307 13.0018 31.9112 13.0018H24.2036C23.8729 13.0015 23.5507 12.8968 23.2831 12.7024C23.0156 12.5081 22.8163 12.2341 22.7138 11.9197L20.3317 4.59006Z"
          stroke="#9CA3AF"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (state === "hover") {
    return (
      <svg
        className="cursor-pointer"
        onClick={onClick}
        onMouseEnter={onHover}
        width={38}
        height={38}
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.3093 4.59006C19.8404 3.14576 17.797 3.14576 17.3266 4.59006L14.9445 11.9197C14.8419 12.2344 14.6424 12.5085 14.3745 12.7029C14.1066 12.8972 13.7841 13.0019 13.4532 13.0018H5.74711C4.22911 13.0018 3.59557 14.9463 4.82502 15.8402L11.0601 20.3691C11.3279 20.5638 11.5273 20.8383 11.6295 21.1532C11.7318 21.4682 11.7317 21.8074 11.6294 22.1223L9.24886 29.452C8.77841 30.8963 10.4328 32.0991 11.6607 31.2052L17.8958 26.6763C18.1638 26.4815 18.4866 26.3766 18.8179 26.3766C19.1492 26.3766 19.472 26.4815 19.74 26.6763L25.9751 31.2052C27.203 32.0991 28.8574 30.8979 28.387 29.452L26.0065 22.1223C25.9041 21.8074 25.904 21.4682 26.0063 21.1532C26.1085 20.8383 26.3079 20.5638 26.5757 20.3691L32.8108 15.8402C34.0387 14.9463 33.4083 13.0018 31.8887 13.0018H24.1811C23.8504 13.0015 23.5282 12.8968 23.2607 12.7024C22.9931 12.5081 22.7938 12.2341 22.6913 11.9197L20.3093 4.59006Z"
          fill="#E5E7EB"
          stroke="#9CA3AF"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (state === "selected") {
    return (
      <svg
        className="cursor-pointer"
        onClick={onClick}
        onMouseEnter={onHover}
        width={38}
        height={38}
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.6491 4.59006C20.1802 3.14576 18.1369 3.14576 17.6664 4.59006L15.2843 11.9197C15.1817 12.2344 14.9822 12.5085 14.7143 12.7029C14.4465 12.8972 14.124 13.0019 13.793 13.0018H6.08696C4.56896 13.0018 3.93541 14.9463 5.16487 15.8402L11.4 20.3691C11.6678 20.5638 11.8671 20.8383 11.9694 21.1532C12.0716 21.4682 12.0716 21.8074 11.9692 22.1223L9.58871 29.452C9.11825 30.8963 10.7727 32.0991 12.0006 31.2052L18.2357 26.6763C18.5036 26.4815 18.8264 26.3766 19.1578 26.3766C19.4891 26.3766 19.8119 26.4815 20.0798 26.6763L26.3149 31.2052C27.5428 32.0991 29.1973 30.8979 28.7268 29.452L26.3463 22.1223C26.2439 21.8074 26.2439 21.4682 26.3461 21.1532C26.4484 20.8383 26.6477 20.5638 26.9156 20.3691L33.1506 15.8402C34.3785 14.9463 33.7481 13.0018 32.2285 13.0018H24.5209C24.1902 13.0015 23.8681 12.8968 23.6005 12.7024C23.333 12.5081 23.1337 12.2341 23.0312 11.9197L20.6491 4.59006Z"
          fill="#111827"
          stroke="#111827"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
};

export default BigStar;

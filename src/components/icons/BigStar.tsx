const BigStar = ({
  state,
  onHover,
  onClick,
}: {
  state: string;
  onHover: () => void;
  onClick: () => void;
}) => {
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
        fill={
          state === "hover" ? "#E5E7EB" : state === "selected" ? "#111827" : ""
        }
        stroke={state === "selected" ? "#111827" : "#9CA3AF"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BigStar;

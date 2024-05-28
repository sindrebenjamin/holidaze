const InputClose = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      onClick={onClick}
      className="h-5 w-5 z-30 absolute top-[15px] right-[12px] cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#9CA3AF"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
        fill=""
      />
    </svg>
  );
};

export default InputClose;

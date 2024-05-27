import Close from "./icons/Close";
import { useState, useEffect } from "react";

const SuccessDialogue = ({
  message,
  animationTrigger,
}: {
  message: string;
  animationTrigger: boolean | null;
}) => {
  const [classes, setClasses] = useState("hidden");

  useEffect(() => {
    if (animationTrigger === false || animationTrigger === true) {
      setClasses("translate-y-4 opacity-0");
      setTimeout(() => {
        setClasses("translate-y-0 opacity-1");
      }, 10);
      setTimeout(() => {
        setClasses("translate-y-4 opacity-0");
      }, 5000);
      setTimeout(() => {
        setClasses("hidden");
      }, 5300);
    }
  }, [animationTrigger]);

  function closeDialogue() {
    setTimeout(() => {
      setClasses("translate-y-4 opacity-0");
    }, 10);
    setTimeout(() => {
      setClasses("hidden");
    }, 300);
  }

  return (
    <div
      className={`${classes} text-green-700 bg-green-100 p-4 rounded-md flex items-center justify-between w-[90%] md:max-w-[800px] fixed left-[50%] translate-x-[-50%] bottom-10 transition-all duration-300 ease-out`}
    >
      <div className="flex gap-4 items-center">
        <svg
          className="min-h-[18px] min-w-[18px]"
          width={18}
          height={19}
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.00005 16.7C10.9096 16.7 12.741 15.9414 14.0912 14.5912C15.4415 13.2409 16.2 11.4095 16.2 9.49999C16.2 7.59043 15.4415 5.75908 14.0912 4.40882C12.741 3.05856 10.9096 2.29999 9.00005 2.29999C7.09049 2.29999 5.25914 3.05856 3.90888 4.40882C2.55862 5.75908 1.80005 7.59043 1.80005 9.49999C1.80005 11.4095 2.55862 13.2409 3.90888 14.5912C5.25914 15.9414 7.09049 16.7 9.00005 16.7V16.7ZM12.3363 8.33629C12.5003 8.16655 12.591 7.9392 12.589 7.70323C12.5869 7.46725 12.4923 7.24152 12.3254 7.07465C12.1585 6.90778 11.9328 6.81313 11.6968 6.81108C11.4608 6.80903 11.2335 6.89975 11.0637 7.06369L8.10005 10.0274L6.93635 8.86369C6.76661 8.69975 6.53926 8.60903 6.30329 8.61108C6.06731 8.61313 5.84158 8.70778 5.67471 8.87465C5.50785 9.04152 5.41319 9.26725 5.41114 9.50323C5.40909 9.7392 5.49981 9.96655 5.66375 10.1363L7.46375 11.9363C7.63252 12.105 7.8614 12.1998 8.10005 12.1998C8.3387 12.1998 8.56757 12.105 8.73635 11.9363L12.3363 8.33629V8.33629Z"
            fill="#046C4E"
          />
        </svg>

        <p>{message}</p>
      </div>

      <button onClick={closeDialogue} type="button">
        <Close color="#046C4E" />
      </button>
    </div>
  );
};

export default SuccessDialogue;

const Wifi = ({ color }: { color?: string }) => {
  return (
    <svg
      className="min-w-[20px] min-h-[20px]"
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_150_2421)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.1531 8.22175C13.8571 3.92575 6.89306 3.92575 2.59706 8.22175C2.40845 8.40391 2.15585 8.5047 1.89365 8.50242C1.63146 8.50015 1.38065 8.39498 1.19524 8.20957C1.00983 8.02416 0.90466 7.77335 0.902382 7.51115C0.900103 7.24895 1.0009 6.99635 1.18306 6.80775C6.25906 1.73075 14.4911 1.73075 19.5671 6.80775C19.7492 6.99635 19.85 7.24895 19.8477 7.51115C19.8454 7.77335 19.7403 8.02416 19.5549 8.20957C19.3695 8.39498 19.1187 8.50015 18.8565 8.50242C18.5943 8.5047 18.3417 8.40391 18.1531 8.22175ZM15.3251 11.0498C14.675 10.3997 13.9033 9.88398 13.054 9.53216C12.2047 9.18033 11.2944 8.99924 10.3751 8.99924C9.45574 8.99924 8.54543 9.18033 7.69611 9.53216C6.84678 9.88398 6.07508 10.3997 5.42506 11.0498C5.23645 11.2319 4.98385 11.3327 4.72165 11.3304C4.45946 11.3281 4.20865 11.223 4.02324 11.0376C3.83783 10.8522 3.73266 10.6013 3.73038 10.3392C3.7281 10.077 3.8289 9.82435 4.01106 9.63575C4.84678 8.80001 5.83894 8.13707 6.93088 7.68477C8.02282 7.23247 9.19315 6.99967 10.3751 6.99967C11.557 6.99967 12.7273 7.23247 13.8192 7.68477C14.9112 8.13707 15.9033 8.80001 16.7391 9.63575C16.9212 9.82435 17.022 10.077 17.0197 10.3392C17.0175 10.6013 16.9123 10.8522 16.7269 11.0376C16.5415 11.223 16.2907 11.3281 16.0285 11.3304C15.7663 11.3327 15.5137 11.2319 15.3251 11.0498ZM12.4951 13.8798C11.9325 13.3173 11.1695 13.0014 10.3741 13.0014C9.57856 13.0014 8.81564 13.3173 8.25306 13.8798C8.06541 14.0674 7.81092 14.1728 7.54556 14.1728C7.28019 14.1728 7.0257 14.0674 6.83806 13.8798C6.65041 13.6921 6.545 13.4376 6.545 13.1722C6.545 12.9069 6.65041 12.6524 6.83806 12.4648C7.30237 12.0003 7.85362 11.6319 8.46033 11.3805C9.06705 11.1292 9.71733 10.9998 10.3741 10.9998C11.0308 10.9998 11.6811 11.1292 12.2878 11.3805C12.8945 11.6319 13.4457 12.0003 13.9101 12.4648C14.0977 12.6524 14.2031 12.9069 14.2031 13.1722C14.2031 13.4376 14.0977 13.6921 13.9101 13.8798C13.7224 14.0674 13.4679 14.1728 13.2026 14.1728C12.9372 14.1728 12.6827 14.0674 12.4951 13.8798ZM9.37506 15.9998C9.37506 15.7345 9.48041 15.4802 9.66795 15.2926C9.85548 15.1051 10.1098 14.9998 10.3751 14.9998H10.3851C10.6503 14.9998 10.9046 15.1051 11.0922 15.2926C11.2797 15.4802 11.3851 15.7345 11.3851 15.9998C11.3851 16.265 11.2797 16.5193 11.0922 16.7069C10.9046 16.8944 10.6503 16.9998 10.3851 16.9998H10.3751C10.1098 16.9998 9.85548 16.8944 9.66795 16.7069C9.48041 16.5193 9.37506 16.265 9.37506 15.9998Z"
          fill={color ? color : "#111827"}
        />
      </g>
      <defs>
        <clipPath id="clip0_150_2421">
          <rect
            width={20}
            height={20}
            fill="white"
            transform="translate(0.375)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Wifi;
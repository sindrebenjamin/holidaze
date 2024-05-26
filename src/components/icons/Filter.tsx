const Filter = ({ color }: { color?: string }) => {
  return (
    <svg
      width={16}
      height={18}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 2.00001C4.73478 2.00001 4.48043 2.10537 4.29289 2.2929C4.10536 2.48044 4 2.73479 4 3.00001C4 3.26523 4.10536 3.51958 4.29289 3.70712C4.48043 3.89465 4.73478 4.00001 5 4.00001C5.26522 4.00001 5.51957 3.89465 5.70711 3.70712C5.89464 3.51958 6 3.26523 6 3.00001C6 2.73479 5.89464 2.48044 5.70711 2.2929C5.51957 2.10537 5.26522 2.00001 5 2.00001ZM2.17 2.00001C2.3766 1.41448 2.75974 0.907443 3.2666 0.548799C3.77346 0.190154 4.37909 -0.00244141 5 -0.00244141C5.62091 -0.00244141 6.22654 0.190154 6.7334 0.548799C7.24026 0.907443 7.6234 1.41448 7.83 2.00001H15C15.2652 2.00001 15.5196 2.10537 15.7071 2.2929C15.8946 2.48044 16 2.73479 16 3.00001C16 3.26523 15.8946 3.51958 15.7071 3.70712C15.5196 3.89465 15.2652 4.00001 15 4.00001H7.83C7.6234 4.58554 7.24026 5.09258 6.7334 5.45122C6.22654 5.80986 5.62091 6.00246 5 6.00246C4.37909 6.00246 3.77346 5.80986 3.2666 5.45122C2.75974 5.09258 2.3766 4.58554 2.17 4.00001H1C0.734784 4.00001 0.48043 3.89465 0.292893 3.70712C0.105357 3.51958 0 3.26523 0 3.00001C0 2.73479 0.105357 2.48044 0.292893 2.2929C0.48043 2.10537 0.734784 2.00001 1 2.00001H2.17ZM11 8.00001C10.7348 8.00001 10.4804 8.10537 10.2929 8.2929C10.1054 8.48044 10 8.73479 10 9.00001C10 9.26523 10.1054 9.51958 10.2929 9.70712C10.4804 9.89465 10.7348 10 11 10C11.2652 10 11.5196 9.89465 11.7071 9.70712C11.8946 9.51958 12 9.26523 12 9.00001C12 8.73479 11.8946 8.48044 11.7071 8.2929C11.5196 8.10537 11.2652 8.00001 11 8.00001ZM8.17 8.00001C8.3766 7.41448 8.75974 6.90744 9.2666 6.5488C9.77346 6.19015 10.3791 5.99756 11 5.99756C11.6209 5.99756 12.2265 6.19015 12.7334 6.5488C13.2403 6.90744 13.6234 7.41448 13.83 8.00001H15C15.2652 8.00001 15.5196 8.10537 15.7071 8.2929C15.8946 8.48044 16 8.73479 16 9.00001C16 9.26523 15.8946 9.51958 15.7071 9.70712C15.5196 9.89465 15.2652 10 15 10H13.83C13.6234 10.5855 13.2403 11.0926 12.7334 11.4512C12.2265 11.8099 11.6209 12.0025 11 12.0025C10.3791 12.0025 9.77346 11.8099 9.2666 11.4512C8.75974 11.0926 8.3766 10.5855 8.17 10H1C0.734784 10 0.48043 9.89465 0.292893 9.70712C0.105357 9.51958 0 9.26523 0 9.00001C0 8.73479 0.105357 8.48044 0.292893 8.2929C0.48043 8.10537 0.734784 8.00001 1 8.00001H8.17ZM5 14C4.73478 14 4.48043 14.1054 4.29289 14.2929C4.10536 14.4804 4 14.7348 4 15C4 15.2652 4.10536 15.5196 4.29289 15.7071C4.48043 15.8947 4.73478 16 5 16C5.26522 16 5.51957 15.8947 5.70711 15.7071C5.89464 15.5196 6 15.2652 6 15C6 14.7348 5.89464 14.4804 5.70711 14.2929C5.51957 14.1054 5.26522 14 5 14ZM2.17 14C2.3766 13.4145 2.75974 12.9074 3.2666 12.5488C3.77346 12.1902 4.37909 11.9976 5 11.9976C5.62091 11.9976 6.22654 12.1902 6.7334 12.5488C7.24026 12.9074 7.6234 13.4145 7.83 14H15C15.2652 14 15.5196 14.1054 15.7071 14.2929C15.8946 14.4804 16 14.7348 16 15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8947 15.2652 16 15 16H7.83C7.6234 16.5855 7.24026 17.0926 6.7334 17.4512C6.22654 17.8099 5.62091 18.0025 5 18.0025C4.37909 18.0025 3.77346 17.8099 3.2666 17.4512C2.75974 17.0926 2.3766 16.5855 2.17 16H1C0.734784 16 0.48043 15.8947 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14H2.17Z"
        fill={color ? color : "#111827"}
      />
    </svg>
  );
};

export default Filter;

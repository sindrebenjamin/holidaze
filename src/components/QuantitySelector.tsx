const QuantitySelector = ({
  quantity,
  handleQuantity,
  lowestAllowed,
  incrementDisabled,
}: {
  quantity: number;
  handleQuantity: (newQuantity: number) => void;
  lowestAllowed: number;
  incrementDisabled?: boolean;
}) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10);

    if (e.target.value === "") {
      handleQuantity(1);
    }

    if (!isNaN(value)) {
      handleQuantity(value);
    }
  }
  return (
    <div className="relative flex items-center max-w-[8rem]">
      <button
        onClick={() => handleQuantity(quantity - 1)}
        disabled={quantity === lowestAllowed}
        type="button"
        id="decrement-button"
        data-input-counter-decrement="quantity-input"
        className="disabled:opacity-50 disabled:pointer-events-none bg-gray-200 rounded-full hover:bg-gray-300 border p-2 focus:ring-gray-100 focus:ring-2 focus:outline-none transition-colors duration-100"
      >
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
            d="M5 10C5 9.73478 5.10536 9.48043 5.29289 9.29289C5.48043 9.10536 5.73478 9 6 9H14C14.2652 9 14.5196 9.10536 14.7071 9.29289C14.8946 9.48043 15 9.73478 15 10C15 10.2652 14.8946 10.5196 14.7071 10.7071C14.5196 10.8946 14.2652 11 14 11H6C5.73478 11 5.48043 10.8946 5.29289 10.7071C5.10536 10.5196 5 10.2652 5 10Z"
            fill="#111827"
          />
        </svg>
      </button>
      <input
        type="text"
        id="quantity-input"
        data-input-counter=""
        aria-describedby="helper-text-explanation"
        className="pointer-events-none bg-white border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-pink-500 focus:border-pink-500 block py-2.5 w-[32px]"
        value={quantity}
        onChange={handleChange}
      />
      <button
        disabled={incrementDisabled}
        onClick={() => handleQuantity(quantity + 1)}
        type="button"
        id="increment-button"
        data-input-counter-increment="quantity-input"
        className="disabled:opacity-50 disabled:pointer-events-none bg-gray-200 rounded-full hover:bg-gray-300 border p-2 focus:ring-gray-100 focus:ring-2 focus:outline-none transition-colors duration-100"
      >
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
            d="M10 5C10.2652 5 10.5196 5.10536 10.7071 5.29289C10.8946 5.48043 11 5.73478 11 6V9H14C14.2652 9 14.5196 9.10536 14.7071 9.29289C14.8946 9.48043 15 9.73478 15 10C15 10.2652 14.8946 10.5196 14.7071 10.7071C14.5196 10.8946 14.2652 11 14 11H11V14C11 14.2652 10.8946 14.5196 10.7071 14.7071C10.5196 14.8946 10.2652 15 10 15C9.73478 15 9.48043 14.8946 9.29289 14.7071C9.10536 14.5196 9 14.2652 9 14V11H6C5.73478 11 5.48043 10.8946 5.29289 10.7071C5.10536 10.5196 5 10.2652 5 10C5 9.73478 5.10536 9.48043 5.29289 9.29289C5.48043 9.10536 5.73478 9 6 9H9V6C9 5.73478 9.10536 5.48043 9.29289 5.29289C9.48043 5.10536 9.73478 5 10 5Z"
            fill="#111928"
          />
        </svg>
      </button>
    </div>
  );
};

export default QuantitySelector;

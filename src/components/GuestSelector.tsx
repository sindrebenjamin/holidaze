import QuantitySelector from "./QuantitySelector";

interface GuestSelectorProps {
  adultQuantity: number;
  childQuantity: number;
  handleQuantityAdult: (quantity: number) => void;
  handleQuantityChild: (quantity: number) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  incrementDisabled: boolean;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({
  adultQuantity,
  childQuantity,
  handleQuantityAdult,
  handleQuantityChild,
  isOpen,
  setIsOpen,
  incrementDisabled,
}) => {
  const classes = isOpen
    ? `translate-y-0 opacity-1 z-10`
    : `translate-y-4 opacity-0 z-[-1]`;
  return (
    <div
      className={`${classes} absolute border bg-white border-gray-300 w-full max-w-[300px] rounded-lg p-4 flex flex-col gap-4 mt-[11px] transition-all duration-300 ease-out`}
    >
      <div className="absolute z-20 h-4 w-4 rotate-45 mt-0.5  border-l border-t border-gray-300 bg-white top-[-11px]"></div>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium">Adults</p>
          <p className="text-sm text-gray-600">18+ years</p>
        </div>
        <QuantitySelector
          incrementDisabled={incrementDisabled}
          lowestAllowed={1}
          quantity={adultQuantity}
          handleQuantity={handleQuantityAdult}
        />
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium">Children</p>
          <p className="text-sm text-gray-600">0-17 years</p>
        </div>
        <QuantitySelector
          incrementDisabled={incrementDisabled}
          lowestAllowed={0}
          quantity={childQuantity}
          handleQuantity={handleQuantityChild}
        />
      </div>
      <button
        onClick={() => setIsOpen(false)}
        type="button"
        className="w-fit self-end hover:opacity-70 transition-opacity duration-100"
      >
        Close
      </button>
    </div>
  );
};

export default GuestSelector;

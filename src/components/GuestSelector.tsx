import React from "react";
import QuantitySelector from "./QuantitySelector";

interface GuestSelectorProps {
  adultQuantity: number;
  childQuantity: number;
  handleQuantityAdult: (quantity: number) => void;
  handleQuantityChild: (quantity: number) => void;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({
  adultQuantity,
  childQuantity,
  handleQuantityAdult,
  handleQuantityChild,
}) => {
  return (
    <div className="shadow max-w-[300px] rounded-lg p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium">Adults</p>
          <p className="text-sm text-gray-600">18+ years</p>
        </div>
        <QuantitySelector
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
          quantity={childQuantity}
          handleQuantity={handleQuantityChild}
        />
      </div>
    </div>
  );
};

export default GuestSelector;

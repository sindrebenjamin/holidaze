import { UseFormRegister, FieldValues } from "react-hook-form";

import InputAndLabelAndMessage from "../../InputAndLabelAndMessage";
import QuantitySelector from "../../QuantitySelector";
import RatingSelector from "../../RatingSelector";

interface DetailsModuleProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  quantity: number;
  setQuantity: (quantity: number) => void;
  rating: number;
  setRating: (rating: number) => void;
}

interface DetailsFields {
  price?: number;
}

const DetailsModule = ({
  register,
  quantity,
  setQuantity,
  rating,
  setRating,
}: DetailsModuleProps<DetailsFields>) => {
  return (
    <>
      <h2 className="text-gray-500 text-lg">Provide a Details of your venue</h2>
      <InputAndLabelAndMessage
        name="price"
        label="Price per night"
        placeholder="1000 kr"
        register={register}
        type="number"
      />
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Max guests</p>
        <QuantitySelector quantity={quantity} handleQuantity={setQuantity} />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Rate your venue</p>
        <RatingSelector rating={rating} setRating={setRating} />
      </div>
    </>
  );
};

export default DetailsModule;

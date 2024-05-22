import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { VenueFormData } from "../../../interfaces";
import InputAndLabelAndMessage from "../../InputAndLabelAndMessage";
import QuantitySelector from "../../QuantitySelector";
import RatingSelector from "../../RatingSelector";

interface DetailsModuleProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  quantity: number;
  setQuantity: (quantity: number) => void;
  rating: number;
  setRating: (rating: number) => void;
  hideTitle?: boolean;
}

const DetailsModule = ({
  register,
  errors,
  quantity,
  setQuantity,
  rating,
  setRating,
  hideTitle,
}: DetailsModuleProps<VenueFormData>) => {
  return (
    <>
      {!hideTitle && (
        <h2 className="text-gray-500 text-lg">Provide details of your venue</h2>
      )}

      <InputAndLabelAndMessage
        name="price"
        label="Price per night in NOK"
        placeholder="1000"
        register={register}
        type="number"
        error={Boolean(errors.price)}
        message={errors.price?.message}
      />
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Max guests</p>
        <QuantitySelector
          lowestAllowed={1}
          quantity={quantity}
          handleQuantity={setQuantity}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Service level</p>
        <RatingSelector rating={rating} setRating={setRating} />
      </div>
    </>
  );
};

export default DetailsModule;

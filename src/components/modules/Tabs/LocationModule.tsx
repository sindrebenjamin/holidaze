import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

import { VenueFormData } from "../../../interfaces";
import InputAndLabelAndMessage from "../../InputAndLabelAndMessage";

interface LocationModuleProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  hideTitle?: boolean;
}
const LocationModule = ({
  register,
  errors,
  hideTitle,
}: LocationModuleProps<VenueFormData>) => {
  return (
    <>
      {!hideTitle && (
        <h2 className="text-gray-500 text-lg">Specify your venue's location</h2>
      )}
      <InputAndLabelAndMessage
        name="address"
        label="Address"
        placeholder="123 Main St, Apt 4"
        register={register}
        type="text"
        error={Boolean(errors.address)}
        message={errors.address?.message}
      />
      <InputAndLabelAndMessage
        name="city"
        label="City"
        placeholder="New York"
        register={register}
        type="text"
      />
      <InputAndLabelAndMessage
        name="zip"
        label="Zip Code"
        placeholder="10001"
        register={register}
        type="number"
      />
      <InputAndLabelAndMessage
        name="country"
        label="Country"
        placeholder="United States"
        register={register}
        type="text"
      />
      <InputAndLabelAndMessage
        name="continent"
        label="Continent"
        placeholder="North America"
        register={register}
        type="text"
      />
    </>
  );
};

export default LocationModule;

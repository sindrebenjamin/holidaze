import { UseFormRegister, FieldValues } from "react-hook-form";

import InputAndLabelAndMessage from "../../InputAndLabelAndMessage";

interface LocationModuleProps<T extends FieldValues> {
  register: UseFormRegister<T>;
}

interface AddressFields {
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
}

const LocationModule = ({ register }: LocationModuleProps<AddressFields>) => {
  return (
    <>
      <h2 className="text-gray-500 text-lg">Specify your venue's location</h2>
      <InputAndLabelAndMessage
        name="address"
        label="Address"
        placeholder="123 Main St, Apt 4"
        register={register}
        type="text"
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

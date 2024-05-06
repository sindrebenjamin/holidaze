import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { VenueFormData } from "../../../interfaces";

import InputAndLabelAndMessage from "../../InputAndLabelAndMessage";
import TextareaAndLabelAndMessage from "../../TextareaAndLabelAndMessage";

interface DescriptionModuleProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

// interface DescriptionFields {
//   title?: string;
//   description?: string;
// }

const DescriptionModule = ({
  register,
  errors,
}: DescriptionModuleProps<VenueFormData>) => {
  return (
    <>
      <h2 className="text-gray-500 text-lg">
        Provide a description of your venue
      </h2>
      <InputAndLabelAndMessage
        name="title"
        label="Title"
        placeholder="The Getaway Beach House"
        register={register}
        type="text"
        error={Boolean(errors.title)}
        message={errors.title?.message}
      />
      <TextareaAndLabelAndMessage
        name="description"
        label="Description"
        placeholder="Share the unique details of your venue. What makes it special? What can guests expect during their stay? Mention any local attractions, the ambiance, and any unique amenities."
        register={register}
      />
    </>
  );
};

export default DescriptionModule;

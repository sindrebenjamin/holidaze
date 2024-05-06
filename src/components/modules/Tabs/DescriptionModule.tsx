import { UseFormRegister, FieldValues } from "react-hook-form";

import InputAndLabelAndMessage from "../../InputAndLabelAndMessage";
import TextareaAndLabelAndMessage from "../../TextareaAndLabelAndMessage";

interface DescriptionModuleProps<T extends FieldValues> {
  register: UseFormRegister<T>;
}

interface DescriptionFields {
  title?: string;
  description?: string;
}

const DescriptionModule = ({
  register,
}: DescriptionModuleProps<DescriptionFields>) => {
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

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormH1 } from "../components/TailwindComponents";
import Tabs from "../components/Tabs";
import InputAndLabelAndMessage from "../components/InputAndLabelAndMessage";

const AddVenuePage = () => {
  const { register, handleSubmit } = useForm();

  const locationContent = (
    <div className="max-w-[500px]">
      <InputAndLabelAndMessage
        name="address"
        label="Address"
        placeholder="123 Main St, Apt 4"
        register={register}
        type="text"
      />
    </div>
  );
  const tabsData = [
    { title: "Location", id: 1, content: locationContent },
    { title: "Description", id: 2, content: <p>Description</p> },
    { title: "Details", id: 3, content: <p>Details</p> },
    { title: "Amenities", id: 4, content: <p>Amenities</p> },
    { title: "Media", id: 5, content: <p>Amenities</p> },
    { title: "Publish", id: 4, content: <p>Amenities</p> },
  ];
  return (
    <main className="md:bg-gray-50 md:flex md:flex-col md:justify-center md:items-center md:min-h-screen md:px-6 md:py-12">
      <div className="max-w-[1000px] bg-white w-full py-12 min-h-screen md:min-h-0 md:p-10 md:rounded-lg md:shadow-md overflow-hidden">
        <FormH1 className="mb-6">List Venue</FormH1>
        <Tabs tabs={tabsData} />
      </div>
    </main>
  );
};

export default AddVenuePage;

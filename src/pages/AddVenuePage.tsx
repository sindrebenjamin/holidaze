import Tabs from "../components/Tabs";
import InputAndLabelAndMessage from "../components/InputAndLabelAndMessage";

const AddVenuePage = () => {
  const locationContent = <div></div>;
  const tabsData = [
    { title: "Location", id: 1, content: <h1>Location</h1> },
    { title: "Description", id: 2, content: <p>Description</p> },
    { title: "Details", id: 3, content: <p>Details</p> },
    { title: "Amenities", id: 4, content: <p>Amenities</p> },
  ];
  return <Tabs tabs={tabsData} />;
};

export default AddVenuePage;

import AmenityCard from "../../AmenityCard";

interface AmenitiesModuleProps {
  selectedAmenities: string[];
  handleAmenityClick: (amenity: string) => void;
  hideTitle?: boolean;
}

const AmenitiesModule = ({
  selectedAmenities,
  handleAmenityClick,
  hideTitle,
}: AmenitiesModuleProps) => {
  return (
    <>
      {!hideTitle && (
        <h2 className="text-gray-500 text-lg">
          Choose amenities available at your venue
        </h2>
      )}

      <div className="grid grid-cols-2 gap-2">
        <AmenityCard
          onClick={() => handleAmenityClick("parking")}
          title="Parking"
          selected={selectedAmenities.includes("parking")}
          icon="car"
        />
        <AmenityCard
          onClick={() => handleAmenityClick("wifi")}
          title="Wifi"
          selected={selectedAmenities.includes("wifi")}
          icon="wifi"
        />
        <AmenityCard
          onClick={() => handleAmenityClick("pets")}
          title="Pets allowed"
          selected={selectedAmenities.includes("pets")}
          icon="dog"
        />
        <AmenityCard
          onClick={() => handleAmenityClick("breakfast")}
          title="breakfast"
          selected={selectedAmenities.includes("breakfast")}
          icon="coffee"
        />
      </div>
    </>
  );
};

export default AmenitiesModule;

const VenueCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-0.5">
      {/* Image */}
      <div className="aspect-square loader rounded-xl"></div>
      <div className="h-12 loader rounded-xl"></div>
    </div>
  );
};

export default VenueCardSkeleton;

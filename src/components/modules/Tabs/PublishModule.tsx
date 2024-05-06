import Button from "../../Button";

const PublishModule = () => {
  return (
    <>
      <h2 className="text-gray-500 text-lg">Ready to Publish!</h2>
      <div className="p-6 rounded-lg border border-gray-300 flex flex-col gap-6">
        <p>Please review all information carefully before publishing.</p>

        <div>
          <p>✓ Review address details</p>
          <p>✓ Check description</p>
          <p>✓ Confirm pricing</p>
          <p>✓ Verify amenities</p>
          <p>✓ Look over uploaded photos</p>
        </div>

        <p>
          Once you're ready, hit 'Publish' to make your venue visible to guests.
        </p>
        <Button size="md" color="gray-dark" type="submit">
          Publish
        </Button>
      </div>
    </>
  );
};

export default PublishModule;

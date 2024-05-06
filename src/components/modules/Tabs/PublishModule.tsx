import Button from "../../Button";
import { ApiError, ApiStatus } from "../../../interfaces";

const PublishModule = ({
  apiErrors,
  apiStatus,
}: {
  apiErrors: ApiError[] | null;
  apiStatus: ApiStatus;
}) => {
  return (
    <>
      <h2 className="text-gray-500 text-lg">Ready to Publish!</h2>
      <div className="max-w-[400px] p-6 rounded-lg border border-gray-300 flex flex-col gap-6">
        <p>Please review all information carefully before publishing.</p>

        <div>
          <p>✓ Review address details</p>
          <p>✓ Check description</p>
          <p>✓ Confirm pricing</p>
          <p>✓ Verify amenities</p>
          <p>✓ Look over photos</p>
        </div>

        <p>
          Once you're ready, hit 'Publish' to make your venue visible to guests.
        </p>
        <Button size="md" color="gray-dark" type="submit">
          {apiStatus === "loading" ? (
            <div className="spinner-light"></div>
          ) : (
            "Publish"
          )}
        </Button>
      </div>
      <ul>
        {apiErrors &&
          apiErrors.map((error) => {
            return (
              <li className="text-red-500" key={error.message}>
                {error.message}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default PublishModule;

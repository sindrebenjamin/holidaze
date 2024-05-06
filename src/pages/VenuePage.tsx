import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useApi } from "../hooks/useApi";
import { SingleVenueResponse, Venue } from "../interfaces";

const VenuePage = () => {
  const params = useParams();
  const options = useMemo(
    () => ({
      method: "GET",
    }),
    []
  );
  const { data, status } = useApi<SingleVenueResponse>(
    `https://v2.api.noroff.dev/holidaze/venues/${params.id}`,
    options
  );

  console.log(data);
  return <h1>{data?.data.name}</h1>;
};

export default VenuePage;

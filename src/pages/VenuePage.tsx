import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useApi } from "../hooks/useApi";
import { SingleVenueResponse } from "../interfaces";
import MobileSlideShow from "../components/MobileSlideShow";

const VenuePage = () => {
  const params = useParams();
  const options = useMemo(
    () => ({
      method: "GET",
    }),
    []
  );
  const { data } = useApi<SingleVenueResponse>(
    `https://v2.api.noroff.dev/holidaze/venues/${params.id}`,
    options
  );

  console.log(data);
  return (
    <>
      <h1>{data?.data.name}</h1>
      <MobileSlideShow images={data?.data.media} />
    </>
  );
};

export default VenuePage;

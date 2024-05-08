import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useApi } from "../hooks/useApi";
import { SingleVenueResponse } from "../interfaces";
import MobileSlideShow from "../components/MobileSlideShow";
import DesktopSlideShow from "../components/DesktopSlideShow";
import { Section, Container } from "../components/TailwindComponents";

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
      <div className="lg:hidden">
        <MobileSlideShow images={data?.data.media} />
      </div>
      <div className="hidden lg:block">
        <Section $noXPadding={true}>
          <Container>
            <DesktopSlideShow images={data?.data.media} />
          </Container>
        </Section>
      </div>

      <h1>{data?.data.name}</h1>
    </>
  );
};

export default VenuePage;

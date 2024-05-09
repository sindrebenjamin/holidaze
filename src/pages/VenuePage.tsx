import { useMemo } from "react";
import { useParams } from "react-router-dom";

import VenueDetails from "../components/modules/VenuePage/VenueDetails";
import { useApi } from "../hooks/useApi";
import { SingleVenueResponse } from "../interfaces";
import MobileSlideShow from "../components/MobileSlideShow";
import DesktopSlideShow from "../components/DesktopSlideShow";
import { Section, Container, StyledH1 } from "../components/TailwindComponents";

const VenuePage = () => {
  const params = useParams();
  const options = useMemo(
    () => ({
      method: "GET",
    }),
    []
  );
  const { data } = useApi<SingleVenueResponse>(
    `https://v2.api.noroff.dev/holidaze/venues/${params.id}?_owner=true&_bookings=true`,
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
      <Section $noYPadding={true}>
        <Container>
          <StyledH1>{data?.data.name}</StyledH1>
          <VenueDetails data={data} />
        </Container>
      </Section>
    </>
  );
};

export default VenuePage;

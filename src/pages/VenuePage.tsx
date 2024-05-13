import { useMemo } from "react";
import { useParams } from "react-router-dom";

import VenueDetails from "../components/modules/VenuePage/VenueDetails";
import { useApi } from "../hooks/useApi";
import { SingleVenueResponse } from "../interfaces";
import MobileSlideShow from "../components/MobileSlideShow";
import DesktopSlideShow from "../components/DesktopSlideShow";
import {
  Section,
  Container,
  StyledH1,
  StyledH2,
} from "../components/TailwindComponents";
import HostCard from "../components/HostCard";
import { checkLongText } from "../utils/checkLongText";

import Booker from "../components/modules/VenuePage/Booker";

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

  if (data) {
    return (
      <>
        <div className="lg:hidden">
          <MobileSlideShow images={data?.data.media} />
        </div>

        <Section className="lg:mt-[60px]" $noYPadding={true}>
          <Container>
            <div className="hidden lg:block">
              <DesktopSlideShow images={data?.data.media} />
            </div>
            <StyledH1 className="mt-6 md:mt-[60px] break-words">
              {checkLongText(data?.data.name, 60)}
            </StyledH1>
            <div className="md:flex justify-between gap-8">
              <VenueDetails data={data} />
              <Booker data={data} />
            </div>
          </Container>
        </Section>
        <Section className="bg-gray-50">
          <Container className="flex flex-col">
            <StyledH2 className="text-center">Meet your host</StyledH2>
            <div className="flex flex-col gap-6 md:items-center">
              <HostCard
                name={data.data.owner.name}
                mediaItem={data.data.owner.avatar}
                email={data.data.owner.email}
              />
              {/* <p>{data.data.owner.bio}</p> */}
            </div>
          </Container>
        </Section>
      </>
    );
  }
};

export default VenuePage;

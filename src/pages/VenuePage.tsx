import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import VenueDetails from "../components/modules/VenuePage/VenueDetails";
import { useApi } from "../hooks/useApi";
import { SingleVenueResponse } from "../interfaces";
import MobileSlideShow from "../components/MobileSlideShow";
import DesktopSlideShow from "../components/DesktopSlideShow";
import { Section, Container, StyledH1 } from "../components/TailwindComponents";
import { DateValueType } from "react-tailwindcss-datepicker";

import Booker from "../components/modules/VenuePage/Booker";

const VenuePage = () => {
  const params = useParams();
  const [dates, setDates] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
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
            <div className="md:flex justify-between gap-8">
              <VenueDetails data={data} />
              <Booker
                data={data}
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                dates={dates}
                setDates={setDates}
              />
            </div>
          </Container>
        </Section>
      </>
    );
  }
};

export default VenuePage;

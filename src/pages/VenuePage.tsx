import { useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";

import { useUserStore } from "../store/useUserStore";
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
import { useRedirectStore } from "../store/useRedirectStore";
import Booker from "../components/modules/VenuePage/Booker";
import BackButton from "../components/BackButton";

const VenuePage = () => {
  const user = useUserStore((state) => state.user);
  const params = useParams();
  const options = useMemo(
    () => ({
      method: "GET",
    }),
    []
  );
  const { data, status } = useApi<SingleVenueResponse>(
    `https://v2.api.noroff.dev/holidaze/venues/${params.id}?_owner=true&_bookings=true`,
    options
  );
  const redirect = useRedirectStore((state) => state.setRedirect);
  redirect("/venue/" + params.id);

  if (status === "loading") {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <BackButton overrideClasses="absolute top-4 left-4 lg:hidden" />
        <div className="spinner-dark"></div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <BackButton overrideClasses="absolute top-4 left-4 lg:hidden" />
        <p>Something went wrong</p>
      </main>
    );
  }

  if (data) {
    return (
      <main className="">
        <div className="lg:hidden">
          <MobileSlideShow images={data?.data.media} />
        </div>

        <Section className="lg:mt-[60px]" $noYPadding={true}>
          <Container>
            <div className="hidden lg:block">
              <DesktopSlideShow images={data?.data.media} />
            </div>
            <StyledH1 className="mt-6 md:mt-[60px] break-words">
              {checkLongText(data?.data.name.trim(), 60)}
            </StyledH1>
            <div className="md:flex justify-between gap-8">
              <VenueDetails data={data} />
              {data?.data.owner.name !== user?.name && <Booker data={data} />}
            </div>
          </Container>
        </Section>
        <Section className="bg-gray-50 min-h-[700px] md:min-h-0">
          <Container className="flex flex-col">
            {user ? (
              <>
                <StyledH2 className="text-center">Meet your host</StyledH2>
                <div className="flex flex-col gap-6 md:items-center">
                  <HostCard
                    name={data.data.owner.name}
                    mediaItem={data.data.owner.avatar}
                    email={data.data.owner.email}
                  />
                  {/* <p>{data.data.owner.bio}</p> */}
                </div>
              </>
            ) : (
              <NavLink
                className="underline text-pink-700 hover:text-pink-800 transition-colors duration-100 text-center"
                to="/login"
              >
                Log in to view more info
              </NavLink>
            )}
          </Container>
        </Section>
      </main>
    );
  }
};

export default VenuePage;

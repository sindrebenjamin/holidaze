import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import { ApiStatus } from "../../../interfaces";
import { useUserStore } from "../../../store/useUserStore";
import { basicApi } from "../../../utils/basicApi";
import EditButton from "../../EditButton";
import SelectorButton from "../../SelectorButton";
import BioInput from "../../BioInput";
import ImageUrlModal from "./ImageUrlModal";
import { useCheckMedia } from "../../../hooks/useCheckMedia";

const AccountSettings = () => {
  const user = useUserStore((state) => state.user);
  const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
  const [bio, setBio] = useState(user?.bio);
  const [debouncedBio] = useDebounce(bio, 500);
  const [bannerPreview, setBannerPreview] = useState("");
  const [bannerModalIsOpen, setBannerModalIsOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarModalIsOpen, setAvatarModalIsOpen] = useState(false);
  const checkedAvatar = useCheckMedia(user?.avatar.url);
  const checkedBanner = useCheckMedia(user?.banner.url);

  const apiErrors = typeof apiStatus === "object" ? apiStatus.errors : null;

  const baseOptions = useMemo(
    () => ({
      method: "GET",
      headers: {
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
    }),
    [user?.accessToken]
  );

  /* Update account type */

  function changeAccountType(choice: boolean) {
    const accountTypeOptions = {
      ...baseOptions,
      body: JSON.stringify({
        venueManager: choice,
      }),
    };
    if (user) {
      useUserStore.setState({ user: { ...user, venueManager: choice } });
      (async function () {
        await basicApi(
          `https://v2.api.noroff.dev/holidaze/profiles/${user?.name}`,
          accountTypeOptions,
          setApiStatus
        );
      })();
    }
  }

  /* Update bio */

  useEffect(() => {
    const bioOptions = {
      ...baseOptions,
      body: JSON.stringify({
        bio: debouncedBio,
      }),
    };

    if (debouncedBio !== user?.bio) {
      (async function () {
        await basicApi(
          `https://v2.api.noroff.dev/holidaze/profiles/${user?.name}`,
          bioOptions,
          setApiStatus
        );
        if (user && debouncedBio) {
          useUserStore.setState({ user: { ...user, bio: debouncedBio } });
        }
      })();
    }
  }, [debouncedBio, baseOptions, user]);
  return (
    <div className="h-fit md:max-w-[400px] md:rounded-lg  md:shadow-md rounded-t-lg shrink-0 w-full">
      {/* Image settings */}
      <div className="relative">
        {/* Banner */}
        <div className="relative">
          <EditButton
            onClick={() => setBannerModalIsOpen(true)}
            overrideClasses="absolute top-2 right-2"
          />
          <img
            className="object-cover h-[200px] sm:h-[250px] md:h-[200px] w-full rounded-t-lg"
            src={bannerPreview ? bannerPreview : checkedBanner}
            alt={user?.banner.alt}
          />
          <ImageUrlModal
            setIsOpen={setBannerModalIsOpen}
            isOpen={bannerModalIsOpen}
            preview={bannerPreview}
            setPreview={setBannerPreview}
            saveTo="banner"
            value={user?.banner.url}
            position="right-2 top-[59px]"
            previewPosition="translate-y-[140px]"
            tipPosition="right-3"
          />
        </div>

        {/* Avatar */}
        <div className="bottom-[-18px] left-1/2 translate-x-[-50%] absolute">
          <div className="relative rounded-full w-[120px]">
            <EditButton
              onClick={() => setAvatarModalIsOpen(true)}
              overrideClasses="absolute top-0 right-0"
            />
            <img
              className="object-cover w-full rounded-full h-[120px]"
              src={avatarPreview ? avatarPreview : checkedAvatar}
              alt={user?.avatar.alt}
            />
            <ImageUrlModal
              setIsOpen={setAvatarModalIsOpen}
              isOpen={avatarModalIsOpen}
              preview={avatarPreview}
              setPreview={setAvatarPreview}
              saveTo="avatar"
              value={user?.avatar.url}
              position="top-[51px] left-[-84px]"
              tipPosition="right-24 "
              previewPosition="translate-y-[70px]"
            />
          </div>
        </div>
      </div>
      {/* Name & email */}
      <div className="text-center mt-7">
        <p className="text-xl">{user?.name}</p>
        <p className="text-gray-500">{user?.email}</p>
      </div>
      {/* Account card inner*/}
      <form className="px-4 sm:px-6 md:px-4 py-6 flex flex-col gap-6 sm:flex-row md:flex-col">
        {/* Account type */}
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm font-medium">Account type</p>
          <SelectorButton
            onClick={() => {
              if (!user?.venueManager) {
                changeAccountType(true);
              }
            }}
            selected={user?.venueManager ?? false}
          >
            Venue manager
          </SelectorButton>
          <SelectorButton
            onClick={() => {
              if (user?.venueManager) {
                changeAccountType(false);
              }
            }}
            selected={!user?.venueManager}
          >
            Guest
          </SelectorButton>
        </div>
        {/* Bio */}
        <BioInput
          onChange={(e) => {
            const value = e.target.value;
            setBio(value);
          }}
          name="bio"
          label="Bio"
          placeholder="Tell us a little about yourself!"
          value={bio ?? ""}
        />
      </form>
      <ul className="text-red-500 mt-2">
        {apiErrors &&
          apiErrors.map((error) => {
            return <li key={error.message}>{error.message}</li>;
          })}
      </ul>
    </div>
  );
};

export default AccountSettings;

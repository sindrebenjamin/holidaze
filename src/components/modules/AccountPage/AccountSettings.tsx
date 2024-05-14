import EditButton from "../../EditButton";
import SelectorButton from "../../SelectorButton";
import BioInput from "../../BioInput";
import { User } from "../../../interfaces";

const AccountSettings = ({
  user,
  changeAccountType,
  bio,
  setBio,
}: {
  user: User;
  changeAccountType: (venueManager: boolean) => void;
  bio: string | undefined;
  setBio: (bio: string) => void;
}) => {
  return (
    <form className="h-fit md:max-w-[400px] md:rounded-lg overflow-hidden md:shadow-md rounded-t-lg">
      {/* Image settings */}
      <div className="relative">
        {/* Banner */}
        <div className="relative">
          <EditButton overrideClasses="absolute top-2 right-2" />
          <img
            className="object-cover h-[200px] sm:h-[250px] md:h-[200px] w-full"
            src={user?.banner.url}
            alt={user?.banner.alt}
          />
        </div>

        {/* Avatar */}
        <div className="bottom-[-18px] left-1/2 translate-x-[-50%] absolute">
          <div className="relative rounded-full w-[120px]">
            <EditButton overrideClasses="absolute top-0 right-0" />
            <img
              className="object-cover w-full rounded-full"
              src={user?.avatar.url}
              alt={user?.avatar.alt}
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
      <div className="px-4 sm:px-6 md:px-4 py-6 flex flex-col gap-6 sm:flex-row md:flex-col">
        {/* Account type */}
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm font-medium">Account type</p>
          <SelectorButton
            onClick={() => {
              if (!user?.venueManager) {
                changeAccountType(true);
              }
            }}
            selected={user?.venueManager}
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
            // console.log(value);
            setBio(value);
          }}
          name="bio"
          label="Bio"
          placeholder="Tell us a little about yourself!"
          value={bio ?? ""}
        />
      </div>
    </form>
  );
};

export default AccountSettings;

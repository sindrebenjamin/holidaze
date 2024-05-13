import { ProfileData } from "../../../interfaces";
import BackButton from "../../BackButton";
import { Divider } from "../../TailwindComponents";

const ProfileInfo = ({ user }: { user: ProfileData }) => {
  return (
    <>
      {/* Account card outer*/}
      <div className="h-fit lg:max-w-[400px] lg:rounded-lg overflow-hidden lg:shadow-md">
        {/* Images */}
        <div className="relative">
          {/* Banner */}
          <div className="relative">
            <BackButton overrideClasses="top-4 left-4 absolute bg-white z-[1010] lg:hidden" />
            <img
              className="object-cover h-[200px] sm:h-[250px] md:h-[300px] lg:h-[200px] w-full"
              src={user?.banner.url}
              alt={user?.banner.alt}
            />
          </div>

          {/* Avatar */}
          <div className="bottom-[-18px] left-1/2 translate-x-[-50%] absolute">
            <img
              className="object-cover rounded-full w-[120px]"
              src={user?.avatar.url}
              alt={user?.avatar.alt}
            />
          </div>
        </div>
        {/* Name & email */}
        <div className="text-center mt-7">
          <p className="text-xl">{user?.name}</p>
          <p className="text-gray-500">{user?.email}</p>
        </div>
        {/* Account card inner*/}
        <div className="px-4 sm:px-6 lg:px-4 py-6 flex flex-col gap-6">
          <Divider />
          <div className="flex flex-col gap-2">
            <p className="font-bold">Bio</p>
            <p className="max-w-[400px]">{user?.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;

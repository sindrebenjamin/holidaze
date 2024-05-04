import HostCard from "../components/HostCard";
import { useUserStore } from "../store/useUserStore";

const AccountPage = () => {
  const user = useUserStore((state) => state.user);
  return (
    <>
      <HostCard
        name="Sindre"
        mediaItem={user.avatar}
        email="sindre@stud.noroff.no"
        averageScore={4.4}
      />
    </>
  );
};

export default AccountPage;

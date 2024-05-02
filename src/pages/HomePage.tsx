import { useUserStore } from "../store/useUserStore";

const HomePage = () => {
  const user = useUserStore((state) => state.user);
  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <p>
          {user.venueManager ? "Is venue manager!" : "Is not venue manager!"}
        </p>
        <p>{user.email}</p>
      </div>
    );
  }

  return <h1>no user</h1>;
};

export default HomePage;

import NumberSelector from "../components/NumberSelector";
import BackButton from "../components/BackButton";

const AccountPage = () => {
  return (
    <>
      <NumberSelector title="6+" selected={false} />
      <BackButton />
    </>
  );
};

export default AccountPage;

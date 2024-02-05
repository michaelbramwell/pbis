import Checkout from "@/components/checkout";
import Scheduler from "@/components/scheduler";
import UserForm from "@/components/userForm";
import { getAuthStatus } from "@/service/auth";

export default async function Home() {
  const { auth, error } = await getAuthStatus();

  if (error) {
    console.log("Auth Error", error);
  }

  return (
    <>
      {auth ? (
        <>
          <Scheduler />
          <UserForm />
          <Checkout />
        </>
      ) : (
        <p>An error has occurred :(</p>
      )}
    </>
  );
}

import { Inter } from "@next/font/google";
import Scheduler from "@/components/scheduler";
import Checkout from "@/components/checkout";
import { getAuthStatus } from "@/service/auth";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const { auth, error } = await getAuthStatus();
  if (error) {
    console.log("Auth Error", error);
  }

  return (
    <div className="container">
      <p>PBIS</p>
      {auth ? (
        <>
          <Scheduler />
          <Checkout />
        </>
      ) : (
        <p>An error has occurred :(</p>
      )}
    </div>
  );
}

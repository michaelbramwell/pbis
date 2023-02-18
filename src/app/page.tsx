import { Inter } from "@next/font/google";
import Scheduler from "@/components/scheduler";
import Checkout from "@/components/checkout";
import { AppAuth } from "@/components/auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container">
      <p>PBIS</p>
      <Scheduler />
      <Checkout />
      <AppAuth />
    </div>
  );
}

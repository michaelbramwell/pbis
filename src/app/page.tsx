import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Scheduler from "@/components/scheduler";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container">
      <p>Hello</p>
      <Scheduler />
    </div>
  );
}

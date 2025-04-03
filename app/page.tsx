import Background from "./components/Background/Backgroud";
import Header from "./components/Header/Header";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Background />
      <Header />
    </div>
  );
}

import GenerateKeys from "@/app/_components/GenerateKeys";
import MessageBox from "@/app/_components/MessageBox";
import EpochMilli from "@/app/_components/EpochMilli";

export default function Home() {
  return (
      <main style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
      }}>
          <GenerateKeys />
          <EpochMilli/>
          <MessageBox />
      </main>
  );
}

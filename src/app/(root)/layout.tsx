import Navbar from "@/components/Navbar";
import Sidebar from "./dashboard/_components/Sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden h-screen w-60 lg:block">
        <Sidebar />
      </div>
      <div className="flex sticky h-16 w-screen flex-col">
        <Navbar />
        <div className="pt-[64px] flex min-h-screen w-full items-center justify-center">{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;

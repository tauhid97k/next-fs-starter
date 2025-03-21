import Footer from "@/components/main/footer";
import Navbar from "@/components/main/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-background">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;

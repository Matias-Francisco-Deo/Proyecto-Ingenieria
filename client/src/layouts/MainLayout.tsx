// import { Footer } from "@/components/Footer";
// import { Header } from "@/components/Header";
// import { ToastContainer } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* <ToastContainer autoClose={5000} position="top-center" theme="dark" />
      <Header className="sticky top-0 left-0 z-10" />
      <main className="flex-grow p-4 md:p-8">{children}</main>
      <Footer /> */}
    </div>
  );
}

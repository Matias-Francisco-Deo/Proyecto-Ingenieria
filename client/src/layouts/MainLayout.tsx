// import { Footer } from "@/components/Footer";
// import { Header } from "@/components/Header";
// import { ToastContainer } from "react-toastify";

import { Header } from "../components/Header";

interface Props {
  children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header className="sticky top-0 left-0 z-10 p-10 bg-amber-600" />
      <main className="flex-grow p-4 md:p-8">{children}</main>
    </div>
  );
}

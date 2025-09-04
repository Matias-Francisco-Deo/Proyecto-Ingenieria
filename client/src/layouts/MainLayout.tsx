// import { Footer } from "@/components/Footer";
// import { Header } from "@/components/Header";
// import { ToastContainer } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-grow p-4 md:p-8">{children}</main>
    </div>
  );
}

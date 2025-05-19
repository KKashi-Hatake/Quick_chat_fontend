import FeatureSection from "@/components/base/FeatureSection";
import Footer from "@/components/base/Footer";
import HeroSection from "@/components/HeroSection/HeroSection";
import Navbar from "@/components/base/Navbar";
import UserReviews from "@/components/base/UserReviews";
import Image from "next/image";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SideBar from "@/components/Sidebar/Sidebar";

export default async function Home() {

  const session: CustomSession | null = await getServerSession(authOptions)



  return (
    session?.user ?
      <div className="w-full h-full grid grid-cols-3 space-x-4 overflow-y-hidden">
        {/* Sidebar */}
        <SideBar/>
        {/* Hero Section */}
        {/* <HeroSection /> */}
        <div></div>



      </div> :
      <div className="min-h-screen flex flex-col " >
        {/* Header */}
        <Navbar user={session?.user} />
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeatureSection />

        {/* User Reviews Section */}
        <UserReviews />

        {/* Footer */}
        <Footer />
      </div>
  );
}

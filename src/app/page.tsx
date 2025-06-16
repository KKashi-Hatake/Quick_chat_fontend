import FeatureSection from "@/components/base/FeatureSection";
import Footer from "@/components/base/Footer";
import HeroSectionOnDashboard from "@/components/base/HeroSection";
import Navbar from "@/components/base/Navbar";
import UserReviews from "@/components/base/UserReviews";
import ChatArea from "@/components/ChatArea/ChatArea";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions)


  return (
    session?.user ?
      <ChatArea user={session?.user}/> :
      <div className="min-h-screen flex flex-col " >
        {/* Header */}
        <Navbar user={session?.user} />
        {/* Hero Section */}
        <HeroSectionOnDashboard />

        {/* Features Section */}
        <FeatureSection />

        {/* User Reviews Section */}
        <UserReviews />

        {/* Footer */}
        <Footer />
      </div>
  );
}

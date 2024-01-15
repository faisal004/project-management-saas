import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Medal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";



const textFont = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ],
});

const MarketingPage = () => {
  return (
    <>
    
    <div className="flex items-center justify-center flex-col min-h-full">
      <div className={cn(
        "flex items-center justify-center flex-col",
     
      )}>
       
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
        Simplify Your Project
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
        Management Process
        </div>
      </div>
      <div className={cn(
        "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
        textFont.className,
      )}>
      Streamline Your Workflow, Boost Productivity, and Collaborate Efficiently with Agileflow.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">
          Get AgileFlow for free
        </Link>
      </Button>
      
    </div>
    
    </>
   
  );
};

export default MarketingPage;
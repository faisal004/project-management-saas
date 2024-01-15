import { WorkflowIcon } from "lucide-react";
import Link from "next/link";

const Logo = () => {
    return (  
        <div className="hidden md:block"><Link href="/">
         <WorkflowIcon className="h-6 w-6" />
        </Link></div>
    );
}
 
export default Logo;
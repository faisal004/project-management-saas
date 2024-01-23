import { WorkflowIcon } from 'lucide-react'
import Link from 'next/link'

const Logo = () => {
  return (
    <div className="hidden md:flex  gap-2">
      <Link href="/" className='flex'>
        <WorkflowIcon className="h-6 w-6" />
        <div className="font-semibold">Agile-Flow</div>
      </Link>
    </div>
  )
}

export default Logo

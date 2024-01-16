import { WorkflowIcon } from 'lucide-react'
import Link from 'next/link'

const Logo = () => {
  return (
    <div className="hidden md:flex gap-2">
      <Link href="/">
        <WorkflowIcon className="h-6 w-6" />
      </Link>
      <div className='font-semibold'>Agile-Flow</div>
    </div>
  )
}

export default Logo

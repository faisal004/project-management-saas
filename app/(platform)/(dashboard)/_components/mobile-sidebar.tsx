'use client'

import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { Sidebar } from './sidebar'

export const MobileSidebar = () => {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  const onOpen = useMobileSidebar((state) => state.onOpen)
  const onClose = useMobileSidebar((state) => state.onClose)
  const isOpen = useMobileSidebar((state) => state.isOpen)

  useEffect(() => {
    setIsMounted(true)
  }, [])
//fix on URL change drawer should be collapsed
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <Button
            onClick={onOpen}
            className="block md:hidden mr-2"
            variant="ghost"
            size="sm"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </DrawerContent>
      </Drawer>
    </>
  )
}

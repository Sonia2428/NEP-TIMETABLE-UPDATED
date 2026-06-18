import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { AlertFeed } from '@/components/layout/AlertFeed'
import { Sidebar } from '@/components/layout/Sidebar'

export function AppLayout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-svh">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-background">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="relative flex flex-1 overflow-auto"
        >
          <div className="flex-1 p-6 lg:p-8">
            <Outlet />
          </div>
          <AlertFeed />
        </motion.main>
      </div>
    </div>
  )
}

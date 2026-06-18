import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AppLayout } from '@/components/layout/AppLayout'
import { TimetableProvider } from '@/context/TimetableContext'
import { DashboardPage } from '@/pages/DashboardPage'
import { ExportPage } from '@/pages/ExportPage'
import { FacultyPage } from '@/pages/FacultyPage'
import { GeneratorPage } from '@/pages/GeneratorPage'
import { NepPage } from '@/pages/NepPage'
import { RoomsPage } from '@/pages/RoomsPage'
import { VisualizationsPage } from '@/pages/VisualizationsPage'

export default function App() {
  return (
    <TimetableProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="generator" element={<GeneratorPage />} />
            <Route path="visualizations" element={<VisualizationsPage />} />
            <Route path="faculty" element={<FacultyPage />} />
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="nep" element={<NepPage />} />
            <Route path="export" element={<ExportPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <Toaster position="bottom-right" richColors />
      </BrowserRouter>
    </TimetableProvider>
  )
}

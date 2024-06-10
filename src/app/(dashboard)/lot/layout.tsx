
import MainLayout from "@/components/MainLayout"
import { CircularProgress } from "@mui/material"
import { Suspense } from "react"


export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return  <Suspense fallback={<CircularProgress/>}>
              {children}
            </Suspense>
  }
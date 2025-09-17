import { Geist, Geist_Mono } from "next/font/google"
import { Navbar } from "@/components/navbar/navbar"
import { ThemeProvider } from "@/components/theme/theme-provider"
import "../globals.css"
import { Sidebar, SidebarProvider } from "../../components/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar"
import LeftPanel from "./_components/LeftPannel"
import TaskTreePanel from "./_components/TaskTreePanel"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
            <AppSidebar />
            <main className="bg-gray-300  w-full">
              <section className="flex-1 flex justify-center">{children}</section>
            </main>
          </ThemeProvider>
        </SidebarProvider>
      </body>
    </html>
  )
}

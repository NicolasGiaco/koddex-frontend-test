"use server"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme/theme-provider"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./(home)/_components/AppSidebar"

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

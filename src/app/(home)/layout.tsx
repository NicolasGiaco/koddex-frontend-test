import { Geist, Geist_Mono } from "next/font/google"
import { Navbar } from "@/components/navbar/navbar"
import { ThemeProvider } from "@/components/theme/theme-provider"
import "../globals.css"
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
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Navbar />
          <main className="flex justify-center bg-gray-300">
            <LeftPanel>
              <TaskTreePanel />
            </LeftPanel>
            <section className="p-8 flex-1 flex justify-center">{children}</section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

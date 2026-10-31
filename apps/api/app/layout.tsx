export const metadata = {
  title: "Proudly Open Source API",
  description: "API service for Proudly Open Source.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

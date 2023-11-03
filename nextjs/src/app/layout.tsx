import { Header } from "@/components/header";
import { Inter } from "next/font/google";
const BodyFont = Inter({ subsets: ["latin"] });

export default function RootLayout(props: { children: any; }) {
  const { children } = props;
  return (
    <html lang="en">
      <body className={BodyFont.className}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
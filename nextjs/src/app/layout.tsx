// app/layout.js - no directives needed
export default function RootLayout(props: { children: any; }) {
  const { children } = props;
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
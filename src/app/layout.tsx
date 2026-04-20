import Providers from "./providers";
import "./globals.css"

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
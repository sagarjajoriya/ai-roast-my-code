export const metadata = {
  title: "AI Roast My Code",
  description: "Get brutally roasted by AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}

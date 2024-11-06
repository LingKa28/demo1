import "./globals.css";

import { Box, Drawer } from "@mui/material";
import { Menu } from "@/components/menu";

const drawerWidth = 240;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body className="h-full m-0">
        <Box className="h-full flex">
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                border: "none",
                padding: "1rem",
                overflowY: "auto",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Menu />
          </Drawer>
          <Box
            component="main"
            className="h-full bg-[#F7F5F2] flex-1 p-5 overflow-y-auto"
          >
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}

import { Box, Container } from "@mui/material";
import BowlingImg from "assets/bowling.jpg";

export function AppLayout({
  children,
}: React.PropsWithChildren): React.ReactElement {
  return (
    <Box>
      <Container maxWidth="md" sx={{ height: "100vh" }}>
        <Image__Bowling />
        <Box sx={{ padding: "2rem 0" }}>{children}</Box>
      </Container>
    </Box>
  );
}

function Image__Bowling() {
  return (
    <Box
      component="img"
      src={BowlingImg}
      loading="lazy"
      alt="bowling img"
      sx={{
        width: "100%",
        height: "10rem",
      }}
    />
  );
}

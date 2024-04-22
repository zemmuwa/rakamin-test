import GroupCard from "@/component/card/GroupCard";
import { Container, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Container>
      <Stack py={3} direction="row" spacing={2}>
        <GroupCard variant="primary"/>
      </Stack>
      </Container>
    </main>
  );
}

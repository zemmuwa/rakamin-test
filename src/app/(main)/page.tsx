import { getGroups } from "@/action/group.action";
import GroupCard, { GroupCardProps } from "@/component/card/GroupCard";
import { Container, Stack, Typography } from "@mui/material";

export default async function Home() {
  const groupsData = await getGroups();
  const getVariant = (index: number): GroupCardProps["variant"] => {
    let variant = "primary";
    switch (index) {
      case 1:
        variant = "warning";
        break;
      case 2:
        variant = "error";
        break;
      case 3:
        variant = "success";
        break;

      default:
        break;
    }
    return variant as GroupCardProps["variant"];
  };
  return (
    <main>
      <Container>
        <Stack py={3} direction="row" spacing={2}>
          {groupsData.map((group, groupI) => (
            <GroupCard data={group} key={groupI} variant={getVariant(groupI)} />
          ))}
        </Stack>
      </Container>
    </main>
  );
}

import { getGroups } from "@/action/group.action";
import GroupCard, { GroupCardProps } from "@/component/card/GroupCard";
import TaskDeleteDialog from "@/component/dialog/TaskDeleteDialog";
import TaskDialog from "@/component/dialog/TaskDialog";
import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { Suspense } from "react";

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
      <Suspense
        fallback={
          <Stack
            height="calc(100dvh - 64px)"
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
          >
            <CircularProgress />
          </Stack>
        }
      >
        <Container>
          <Stack py={3} direction="row" spacing={2}>
            {groupsData.map((group, groupI) => (
              <GroupCard
                index={groupI}
                right={
                  groupI != groupsData?.length - 1
                    ? groupsData[groupI + 1].id
                    : undefined
                }
                left={groupI != 0 ? groupsData[groupI - 1].id : undefined}
                data={group}
                key={groupI}
                variant={getVariant(groupI)}
              />
            ))}
          </Stack>
          <TaskDialog />
          <TaskDeleteDialog />
        </Container>
      </Suspense>
    </main>
  );
}

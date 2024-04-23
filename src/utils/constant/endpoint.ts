export const ENDPOINT = {
  TODO: "todos",
  ITEMS: (todoId: string | number) => `todos/${todoId}/items`,
};

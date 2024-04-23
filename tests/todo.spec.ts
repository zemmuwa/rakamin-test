import { TEST_CONST } from "@/utils/constant/testConst";
import test, { expect } from "@playwright/test";

test("Create Task", async ({ page }) => {
  await page.goto("/v1");
  await page.getByTestId(`${TEST_CONST.BUTTON_CREATE}-0`).click();
  await expect(page.getByTestId(TEST_CONST.TASK_DIALOG)).toBeVisible();
  await page.getByTestId(`${TEST_CONST.TASK_NAME_FIELD}`).fill("Todo-test");
  await page.getByTestId(`${TEST_CONST.TASK_PROGRESS_FIELD}`).fill("90");
  await page.getByTestId(`${TEST_CONST.BUTTON_SAVE_CREATE}`).click();
  await expect(page.getByTestId(TEST_CONST.TASK_DIALOG)).toBeHidden();
  await page.waitForTimeout(3000)
});

test("Delete Task", async ({ page }) => {
  await page.goto("/v1");
  await page.getByTestId(`${TEST_CONST.ACTION_MENU}-0-0`).click();
  await expect(page.getByTestId(`${TEST_CONST.ACTION_MENU_DIALOG}-0-0`)).toBeVisible();
  await page.getByTestId(`${TEST_CONST.BUTTON_DELETE}-0-0`).click();
  await expect(page.getByTestId(TEST_CONST.TASK_DELETE_DIALOG)).toBeVisible();
  await page.getByTestId(`${TEST_CONST.BUTTON_SAVE_DELETE}`).click();
  await expect(page.getByTestId(TEST_CONST.TASK_DELETE_DIALOG)).toBeHidden();
  await page.waitForTimeout(3000)
});

test("Edit Task", async ({ page }) => {
  await page.goto("/v1");
  await page.getByTestId(`${TEST_CONST.ACTION_MENU}-0-0`).click();
  await expect(page.getByTestId(`${TEST_CONST.ACTION_MENU_DIALOG}-0-0`)).toBeVisible();
  await page.getByTestId(`${TEST_CONST.BUTTON_EDIT}-0-0`).click();
  await expect(page.getByTestId(TEST_CONST.TASK_DIALOG)).toBeVisible();
  await expect(page.getByTestId(`${TEST_CONST.TASK_NAME_FIELD}`)).toHaveValue(/[\s\S]*/);
  await page.getByTestId(`${TEST_CONST.TASK_NAME_FIELD}`).fill("Todo-test Edit",{force:true});
  await page.getByTestId(`${TEST_CONST.TASK_PROGRESS_FIELD}`).fill("100");
  await page.getByTestId(`${TEST_CONST.BUTTON_SAVE_CREATE}`).click();
  await expect(page.getByTestId(TEST_CONST.TASK_DIALOG)).toBeHidden();
  await page.waitForTimeout(3000)
}); 

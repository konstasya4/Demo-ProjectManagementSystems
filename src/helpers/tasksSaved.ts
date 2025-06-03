import { updateIssue, createIssues } from "../shared/api";
import { NewIssues } from "../types/types";

export async function saveTask(
  formValues: NewIssues,
  currentBoardId?: number| null,
  taskId?: number,
) {
  const payloadUpdate = {
    assigneeId: formValues.assigneeId!,
    description: formValues.description.trim(),
    priority: formValues.priority,
    status: formValues.status,
    title: formValues.title.trim(),
  };
  const payloadCreate = {
    assigneeId: formValues.assigneeId!,
    boardId: currentBoardId,
    description: formValues.description.trim(),
    priority: formValues.priority,
    title: formValues.title.trim(),
  };

  if (taskId) {
    await updateIssue(taskId, payloadUpdate);
  } else {
    await createIssues(payloadCreate);
  }
}
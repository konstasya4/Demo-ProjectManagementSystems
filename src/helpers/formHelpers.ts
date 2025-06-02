import { DataBoards, DataProjectIssue, NewIssues } from "../types/types";

export function getInitialValues(
  boards: DataBoards[],
  currentBoardId?: number,
  itemIssue?: DataProjectIssue,
): NewIssues {
  if (itemIssue) {
    const foundBoard = boards.find(b => b.name === itemIssue.boardName);
    return {
      title: itemIssue.title,
      description: itemIssue.description,
      boardId: foundBoard ? foundBoard.id : currentBoardId ?? null,
      status: itemIssue.status,
      priority: itemIssue.priority,
      assigneeId: itemIssue.assignee?.id ?? null,
    };
  }
  return {
    title: "",
    description: "",
    boardId: currentBoardId ?? null,
    status:"",
    priority:"",
    assigneeId: 0,
  };
}

export interface FormErrors {
  title: boolean;
  description: boolean;
  boardId: boolean;
  status: boolean;
  priority: boolean;
  assigneeId: boolean;
}

export function validateForm(
  values: NewIssues,
  currentBoardId?: number
): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {
    title: !values.title.trim(),
    description: !values.description.trim(),
    boardId: currentBoardId ? false : values.boardId === null,
    status: !values.status,
    priority: !values.priority,
    assigneeId: values.assigneeId === null,
  };
  return { isValid: !Object.values(errors).some(Boolean), errors };
}
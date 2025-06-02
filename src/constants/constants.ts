export const STATUSES = ["To Do", "In Progress", "Done"];
export const COLUMN_STATUSES: { [key: string]: {status:string, title:string} } = {
    "1": { status: "Backlog", title: "To do" },
    "2": { status: "InProgress", title: "In progress" },
    "3": { status: "Done", title: "Done" },
};
export const PRIORITIES = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];
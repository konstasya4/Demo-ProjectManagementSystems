import paths from "./paths";
import { ReactNode } from "react";
import { BoardsPage, IssuesPage, ToDoProjectPage } from "../../pages";

export type RouteData = {
  component: ReactNode;
  route: string;
};

const RoutesData = (): Array<RouteData> => {
  return [
    { component: <BoardsPage />, route: paths.boards },
    { component: <IssuesPage />, route: `${paths.issues}` },
    { component: <ToDoProjectPage />, route: `${paths.toDoProject}/:id` },
  ];
};

export default RoutesData;

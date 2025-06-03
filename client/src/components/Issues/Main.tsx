import { useEffect, useState } from "react";
import { getAllIssues } from "../../shared/api";
import { DataProjectIssue, State } from "../../types/types";
import IssuesList from "./IssuesList";
import { useDispatch, useSelector } from "react-redux";
import { setIssuesData } from "../../slices/slice";
import {
  Box,
} from "@mui/material";
import Filters from "./Filters";

const Main = () => {
  const [filteredIssues, setFilteredIssues] = useState<DataProjectIssue[]>([]);

  const dispatch = useDispatch();
  const allIssues = useSelector(
    (state: State) => state.dataIssues.dataAllIssues
  );
  const boards = useSelector((state: State) => state.dataBoards.boardsData);

  useEffect(() => {
    const controller = new AbortController()
    getAllIssues()
      .then((res) => {
        if (res) dispatch(setIssuesData(res.data));
      })
      .catch((err) => {
        console.error("Ошибка", err);
      });
      return () => controller.abort();
  }, []);


  return (
    <Box sx={{ p: 2 }}>
      <Filters
        issues={allIssues}
        boards={boards}
        onFilteredChange={setFilteredIssues}
      />
      <IssuesList data={filteredIssues} />
    </Box>
  );
};
export default Main;

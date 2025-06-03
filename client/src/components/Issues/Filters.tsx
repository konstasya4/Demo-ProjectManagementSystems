import { useEffect, useState, ChangeEvent } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Drawer,
} from "@mui/material";
import { DataProjectIssue, DataBoards } from "../../types/types";
import { COLUMN_STATUSES } from "../../constants/constants";

type FiltersProps = {
  issues: DataProjectIssue[];
  boards: DataBoards[];
  onFilteredChange: (filtered: DataProjectIssue[]) => void;
};

const Filters = ({ issues, boards, onFilteredChange }: FiltersProps) => {
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [boardFilter, setBoardFilter] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!issues || issues.length === 0) {
      onFilteredChange([]);
      return;
    }
    const qLower = searchQuery.trim().toLowerCase();
    const filtered = issues.filter((issue) => {
      if (statusFilter.length > 0 && !statusFilter.includes(issue.status)) {
        return false;
      }

      if (boardFilter.length > 0 && !boardFilter.includes(issue.boardId)) {
        return false;
      }

      if (qLower) {
        const inTitle = issue.title.toLowerCase().includes(qLower);
        const inAssignee = issue.assignee.fullName
          .toLowerCase()
          .includes(qLower);
        if (!inTitle && !inAssignee) {
          return false;
        }
      }

      return true;
    });

    onFilteredChange(filtered);
  }, [issues, statusFilter, boardFilter, searchQuery, onFilteredChange]);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const toggleStatus = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const toggleBoard = (boardId: number) => {
    setBoardFilter((prev) =>
      prev.includes(boardId)
        ? prev.filter((id) => id !== boardId)
        : [...prev, boardId]
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const resetAllFilters = () => {
    setStatusFilter([]);
    setBoardFilter([]);
    setSearchQuery("");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <TextField
          size="small"
          label="Поиск"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ minWidth: 250 }}
        />

        <Button variant="outlined" onClick={handleDrawerOpen}>
          Фильтры
        </Button>

        <Button variant="text" onClick={resetAllFilters}>
          Сбросить всё
        </Button>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{ sx: { width: 280, p: 2 } }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h6">Фильтры</Typography>
          <Button onClick={handleDrawerClose}>Закрыть</Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1">Статус задачи</Typography>
        <FormGroup>
          {Object.entries(COLUMN_STATUSES).map(([key, obj]) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={statusFilter.includes(obj.status)}
                  onChange={() => toggleStatus(obj.status)}
                />
              }
              label={obj.title}
            />
          ))}
        </FormGroup>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1">Доска</Typography>
        <FormGroup>
          {boards.map((board) => (
            <FormControlLabel
              key={board.id}
              control={
                <Checkbox
                  checked={boardFilter.includes(board.id)}
                  onChange={() => toggleBoard(board.id)}
                />
              }
              label={board.name}
            />
          ))}
        </FormGroup>
      </Drawer>
    </>
  );
};

export default Filters;

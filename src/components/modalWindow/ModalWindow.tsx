import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, FormControl, InputLabel, Select,
  MenuItem, Box, FormHelperText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { State, NewIssues } from "../../types/types";
import { validateForm, FormErrors, getInitialValues } from "../../helpers/formHelpers";
import { setUsersData, setDataFormsIssue, setItemBoardData } from "../../slices/slice";
import { COLUMN_STATUSES, PRIORITIES } from "../../constants/constants";
import { getAllUsers } from "../../shared/api";
import { saveTask } from "../../helpers/tasksSaved";
import { useNavigate } from "react-router-dom";
import paths from "../../constants/routes/paths";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  taskId?: number;
  currentBoardId?: number;
  onSaveSuccess: () => void;
}

export default function TaskModal({ open, onClose, taskId, currentBoardId, onSaveSuccess }: TaskModalProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const boards = useSelector((state: State) => state.dataBoards.boardsData);
  const users = useSelector((state: State) => state.dataUsers);
  const itemIssue = useSelector((state: State) => state.dataIssues.dataItemIssue);

  const [formValues, setFormValues] = useState<NewIssues>(getInitialValues(boards, currentBoardId, itemIssue));
  const [errors, setErrors] = useState<FormErrors>({
    title: false, description: false, boardId: false,
    status: false, priority: false, assigneeId: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    if (open) {
      getAllUsers()
      .then((res)=>{
        dispatch(setUsersData(res.data))
      })
      .catch((e)=>console.error(e))
    }
    return () => controller.abort();
  }, [open, dispatch]);

  useEffect(() => {
    if (!open) return;

    if (taskId && itemIssue) {
      setFormValues(getInitialValues(boards, currentBoardId, itemIssue));
    } else if (!taskId) {
      setFormValues(getInitialValues(boards, currentBoardId)); 
    }
    setErrors({ title: false, description: false, boardId: false, status: false, priority: false, assigneeId: false });
  }, [open, itemIssue, taskId, currentBoardId, boards]);

  const openBoard = (id:number) => {
    navigate(`${paths.toDoProject}/${id}`)
    dispatch(setItemBoardData(boards[id-1]))
  }

  const handleChange = <K extends keyof NewIssues>(field: K, value: NewIssues[K]) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmitForm = async () => {
    const { isValid, errors: newErrors } = validateForm(formValues, currentBoardId);
    setErrors(newErrors);
    if (!isValid) return;

    try {
      await saveTask(formValues, formValues.boardId, taskId);
      onSaveSuccess();
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    onClose();
    setFormValues(getInitialValues(boards, currentBoardId, itemIssue));
    dispatch(setDataFormsIssue(getInitialValues(boards, currentBoardId, itemIssue)));
    setErrors({ title: false, description: false, boardId: false, status: false, priority: false, assigneeId: false });
  };

  const isProjectLocked = Boolean(currentBoardId);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{taskId ? "Редактирование задачи" : "Создание задачи"}</DialogTitle>
      <DialogContent sx={{pb: 0}}>
        <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
          <TextField label="Название" fullWidth
            value={formValues.title}
            onChange={e => handleChange("title", e.target.value)}
            error={errors.title}
            helperText={errors.title && "Обязательное поле"} />

          <TextField label="Описание" fullWidth multiline rows={4}
            value={formValues.description}
            onChange={e => handleChange("description", e.target.value)}
            error={errors.description}
            helperText={errors.description && "Обязательное поле"} />

          <FormControl fullWidth error={errors.boardId} disabled={isProjectLocked}>
            <InputLabel id="label-board">Проект</InputLabel>
            <Select
              labelId="label-board"
              label="Проект"
              value={formValues.boardId ?? ""}
              onChange={e => handleChange("boardId", Number(e.target.value) || null)}
            >
              {boards.map(b => <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>)}
            </Select>
            {errors.boardId && <FormHelperText>Выберите проект</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={errors.status}>
            <InputLabel id="label-status">Статус</InputLabel>
            <Select
              labelId="label-status"
              label="Статус"
              value={formValues.status}
              onChange={e => handleChange("status", e.target.value)}
            >
              {Object.entries(COLUMN_STATUSES).map(([key, obj]) => (
                <MenuItem key={key} value={obj.status}>{obj.title}</MenuItem>
              ))}
            </Select>
            {errors.status && <FormHelperText>Укажите статус</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={errors.priority}>
            <InputLabel id="label-priority">Приоритет</InputLabel>
            <Select
              labelId="label-priority"
              label="Приоритет"
              value={formValues.priority}
              onChange={e => handleChange("priority", e.target.value)}
            >
              {PRIORITIES.map(p => <MenuItem key={p.label} value={p.label}>{p.label}</MenuItem>)}
            </Select>
            {errors.priority && <FormHelperText>Укажите приоритет</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={errors.assigneeId}>
            <InputLabel id="label-assignee">Исполнитель</InputLabel>
            <Select
              labelId="label-assignee"
              label="Исполнитель"
              value={formValues.assigneeId ?? ""}
              onChange={e => handleChange("assigneeId", Number(e.target.value))}
            >
              {users.map(u => <MenuItem key={u.id} value={u.id}>{u.fullName}</MenuItem>)}
            </Select>
            {errors.assigneeId && <FormHelperText>Укажите исполнителя</FormHelperText>}
          </FormControl>

          {!currentBoardId && taskId && itemIssue && formValues.boardId &&(
            <Box sx={{ mt: 1 }}>
              <Button onClick={()=>openBoard(formValues.boardId ?? 0)}>Перейти на доску</Button>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", px: 3, py: 2 }}>
        <Button variant="outlined" onClick={handleClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmitForm}>{taskId ? "Сохранить" : "Создать"}</Button>
      </DialogActions>
    </Dialog>
  );
}
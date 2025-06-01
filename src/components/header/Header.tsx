import { Button, Tab, Tabs } from "@mui/material";
import path from "path";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import paths from "../../constants/routes/paths";

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const pathToIndex: { [key: string]: number } = {
    [paths.issues]: 0,
    [paths.boards]: 1,
  };

  const [value, setValue] = useState(pathToIndex[location.pathname] ?? 1);

  useEffect(() => {
    const currentIndex = pathToIndex[location.pathname];
    if (currentIndex !== undefined && currentIndex !== value) {
      setValue(currentIndex);
    }
  }, [location.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    const path = Object.entries(pathToIndex).find(([key, val]) => val === newValue)?.[0];
    if (path) {
      navigate(path);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent:'space-between', borderBottom:'2px solid rgb(0, 0, 0, 0.20)', paddingBottom:'1vh' }}>
      <Tabs
        value={value}
        onChange={handleChange}
      >
        <Tab label="Все задачи" />
        <Tab label="Проекты" />
      </Tabs>
      <Button style={{marginRight:'2vw'}}>Создать задачу</Button>
    </div>
  );
};

export default Header;

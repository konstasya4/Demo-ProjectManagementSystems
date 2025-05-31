import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import routesData from './routesData'
import paths from './paths'

const CreateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routesData().map(({ component, route }) => (
          <Route path={route} element={component} key={route} />
        ))}
        <Route
          path="*"
          element={<Navigate to={paths.boards} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default CreateRoutes

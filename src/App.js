import "./App.css";
import AddTodo from "./components/AddTodo/AddTodo";

import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./routers/privateRoutes";
import PublicRoute from "./routers/publicRoutes";
import Auth from "./pages/AuthPage/Auth";
import ReactGA from "react-ga4";

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_CODE, {
  debug: true,
});

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<PrivateRoute component={AddTodo} />} />

        <Route exact path="/auth" element={<PublicRoute component={Auth} />} />
      </Routes>
    </>
  );
}

export default App;

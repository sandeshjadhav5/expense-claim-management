import { Route, Routes } from "react-router-dom";

import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import AllExpenses from "./AllExpenses";
import SingleExpense from "./SingleExpense";
import CreateExpense from "./CreateExpense";
import EditExpense from "./EditExpense";
import ProtectedRoute from "../Components/ProtectedRoute";
import SignUp from "./SignUp";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute> {<Dashboard />}</ProtectedRoute>}
      />
      <Route
        path="/allexpenses"
        element={<ProtectedRoute> {<AllExpenses />}</ProtectedRoute>}
      />
      <Route
        path="/allexpenses/:id"
        element={<ProtectedRoute> {<SingleExpense />}</ProtectedRoute>}
      />
      <Route
        path="/createnewexpense"
        element={<ProtectedRoute> {<CreateExpense />}</ProtectedRoute>}
      />
      <Route
        path="/editexpense/:id"
        element={<ProtectedRoute> {<EditExpense />}</ProtectedRoute>}
      />
    </Routes>
  );
}
export default MainRoutes;

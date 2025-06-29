import ProtectedRoute from "../../components/protected/protectedRoutes";
import Admin from "../../components/Admin";

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  );
}

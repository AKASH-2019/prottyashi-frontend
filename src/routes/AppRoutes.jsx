import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Schools from "../pages/Schools";
import Holidays from "../pages/Holidays";
import Deliveries from "../pages/Deliveries";
import Reports from "../pages/Reports";
import Form4Report from "../pages/Form4Report";
import Form12Report from "../pages/Form12Report";
import Form13Report from "../pages/Form13Report";
import Form10Report from "../pages/Form10Report";
import Form7Report from "../pages/Form7Report";
import RationSetting from "../pages/RationSetting";

import ProtectedRoute from "../components/ProtectedRoute";
import RoleRoute from "../components/RoleRoute";

const now = new Date();

const month = now.getMonth() + 1; // 1-12
const year = now.getFullYear();


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Dashboard - Both ADMIN & FIELD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                  "FIELD",
                ]}
              >
                <Dashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* ADMIN ONLY */}

        <Route
          path="/schools"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                ]}
              >
                <Schools />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/holidays"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                ]}
              >
                <Holidays />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                ]}
              >
                <Reports />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* ADMIN + FIELD */}

        <Route
          path="/deliveries"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                  "FIELD",
                ]}
              >
                <Deliveries />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports/form4/:month/:year"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                ]}
              >
                <Form4Report />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports/form12/:month/:year"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                ]}
              >
                <Form12Report />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports/form13/:month/:year"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                ]}
              >
                <Form13Report />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports/form10/:month/:year"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                ]}
              >
                <Form10Report />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports/form07/:month/:year"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                ]}
              >
                <Form7Report />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
            path="/ration-setting"
            element={
                <ProtectedRoute>
                <RoleRoute
                    allowedRoles={["ADMIN"]}
                >
                    <RationSetting />
                </RoleRoute>
                </ProtectedRoute>
            }
        />

      </Routes>
    </BrowserRouter>
  );
}
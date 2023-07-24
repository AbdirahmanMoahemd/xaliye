import { Routes, Route } from "react-router-dom";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
} from "@/widgets/layout";
import {electronicRoutes}  from "@/routes";
import { useMaterialTailwindController } from "@/context";

export function Dashboard2() {
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={electronicRoutes}
        brandName="Xaliye Computers & gadgets"
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
    
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <Routes>
          {electronicRoutes.map(
            ({ layout, pages }) =>
              layout === 'electronics' &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        
      </div>
    </div>
  );
}

Dashboard2.displayName = "/src/layout/dashboard2.jsx";

export default Dashboard2;

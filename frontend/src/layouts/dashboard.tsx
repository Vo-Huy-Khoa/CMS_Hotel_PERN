import { Footer } from "flowbite-react";
import { Routes, Route } from "react-router-dom";
import routes from "../routes";

export function Dashboard() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="container relative z-40 mx-auto p-4"></div>
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              // <Route  path={path} element={element || null} />
              <Route path={path} />
            ))
        )}
      </Routes>
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;

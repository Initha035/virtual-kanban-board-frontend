import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import Tabs from "../util/Tabs";
import Navbar from "./Navbar";
import Table from "./Table";

const Home = () => {
  const outlet = useOutlet();

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* <Menubar /> */}
        {outlet ? (
          <>
            <main className="h-screen mx-auto min-w-max grow items-start">
              <Tabs />
              <Outlet />
            </main>
          </>
        ) : (
          <Table />
        )}
      </div>
    </>
  );
};

export default Home;

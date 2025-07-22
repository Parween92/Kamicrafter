import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InfoButton from "../components/InfoButton";

// mein Webseite layout
function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <InfoButton />
    </div>
  );
}

export default MainLayout;

import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useUserAuth } from "../context/UserAuthContext";

function Home() {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Logout error :", err.message);
    }
  };

  useEffect(() => {
    if (!user) {
      // If user is not logged in, redirect to login page
      navigate("/login");
    }
  }, [user, navigate]); // Dependency array includes user and navigate

  return (
    <div className="text-center">
      <h2 className="w-100 fw-bold mb-3">Home</h2>
      <p>Hi, {user?.email}</p>
      <p>
        <b>UID : </b>
        {user?.uid}
      </p>
      <Button variant="danger" className="fw-bold" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Home;

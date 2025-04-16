import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useUserAuth } from "../context/UserAuthContext";

function Home() {
  const navigate = useNavigate();
  const { user, getUserDetailsFromFirestore, logOut } = useUserAuth();
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("ออกจากระบบสำเร็จ");
      navigate("/");
    } catch (err) {
      const error = err as FirebaseError;
      toast.error(error.message);
    }
  };

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    if (!user) {
      navigate("/login");
      return;
    }

    getUserDetailsFromFirestore(user.uid).then((data) => {
      if (!isMounted) return;

      if (!data) {
        toast.error("ไม่พบข้อมูลผู้ใช้ใน Firestore");
        setPhoneNumber(null);
      } else {
        setPhoneNumber(data.phone);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [user, navigate, getUserDetailsFromFirestore]);

  return (
    <div className="text-center mt-5">
      <h2 className="w-100 fw-bold mb-3">Home</h2>
      <p>Hi!!, {user?.displayName ? user?.displayName : "-"}</p>
      <p>
        <b>อีเมล : </b>
        {user?.email || "-"}
      </p>
      <p>
        <b>เบอร์โทรศัพท์ : </b>
        {phoneNumber || "-"}
      </p>
      <p>
        <b>UID : </b>
        {user?.uid || "-"}
      </p>
      <Button variant="danger" className="fw-bold" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Home;

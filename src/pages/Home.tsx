import { Task } from "../types/types";
import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useUserAuth } from "../context/UserAuthContext";
import { getDateWithTimeTHString } from "../helpers/date-string-format";
import { fetchTaskList } from "../services/fetchTaskList";

function Home() {
  const navigate = useNavigate();
  const { user, getUserDetailsFromFirestore, logOut } = useUserAuth();
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

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

  useEffect(() => {
    if (tasks.length === 0) {
      // toast.dismiss();
      // toast.info("Loading tasks...");
      loadTasks();
    }
  }, [tasks.length]);

  const loadTasks = async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1000);

    try {
      const newTaskList = await fetchTaskList("TODO", 1, 10, "createdAt", true);
      const newTasks = newTaskList?.tasks ?? [];
      setTasks(newTasks);
      // const newTaskGrouping = newTaskList?.tasksGrouing ?? [];
      // console.log("newTaskGrouping :>> ", newTaskGrouping);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการโหลดงาน");
      console.error("❌ loadMoreTasks error:", error);
    }
  };

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

      {tasks.length > 0 && (
        <div className="mt-5 container">
          <h4 className="mb-3">📋 รายการงานที่ต้องทำ (TODO)</h4>
          <h6 className="mb-3">***Call api example***</h6>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    {/* {getDateWithTimeString(task.createdAt)}
                    <br /> */}
                    {getDateWithTimeTHString(task.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Home;

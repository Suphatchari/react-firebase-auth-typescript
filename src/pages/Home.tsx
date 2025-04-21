import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { fetchTaskList } from "@services/fetchTaskList";
import { useUserAuth } from "@context/UserAuthContext";
import { getDateWithTimeTHString } from "@helpers/date-string-format";
import { Task } from "types";
import Loading from "@components/Loading";
import SectionLine from "@components/SectionLine";

function Home() {
  const navigate = useNavigate();
  const { user, getUserDetailsFromFirestore, logOut } = useUserAuth();
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [isLoadingTask, setIsLoadingTask] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchUserDetails() {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const data = await getUserDetailsFromFirestore(user.uid);
        if (!isMounted) return;

        if (!data) {
          toast.error("ไม่พบข้อมูลผู้ใช้ใน Firestore");
          setPhoneNumber(null);
        } else {
          setPhoneNumber(data.phone);
        }
      } catch (err) {
        toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้");
        console.error("❌ Error fetching user details :", err);
      }
    }

    fetchUserDetails();

    return () => {
      isMounted = false;
    };
  }, [user, navigate, getUserDetailsFromFirestore]);

  useEffect(() => {
    if (tasks.length === 0) {
      loadTasks();
    }
  }, [tasks.length]);

  const loadTasks = async () => {
    setIsLoadingTask(true);

    // ------------------------------------------------------------------------------------
    // ⚠️ Simulate delay to showcase loading spinner effect (for demo/testing only)
    // ❗️TODO: Remove this delay in production
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1000);
    // ------------------------------------------------------------------------------------

    try {
      const newTaskList = await fetchTaskList("TODO", 1, 10, "createdAt", true);
      const newTasks = newTaskList?.tasks ?? [];
      setTasks(newTasks);
      // const newTaskGrouping = newTaskList?.tasksGrouing ?? [];
      // console.log("newTaskGrouping :>> ", newTaskGrouping);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการโหลดงาน");
      console.error("❌ loadMoreTasks error:", error);
    } finally {
      setIsLoadingTask(false);
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
    <div className="text-center my-5">
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

      <div className="mb-3 container">
        <SectionLine />
        <h4 className="mb-3">📋 TODO List</h4>
        <p className="mb-3 small">*** API Request Demo ***</p>

        {isLoadingTask ? (
          <Loading />
        ) : tasks.length > 0 ? (
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
                  <td>{getDateWithTimeTHString(task.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <p className="text-muted mt-3">📭 No tasks available</p>
            <SectionLine />
          </>
        )}
      </div>

      <Button variant="danger" className="fw-bold" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Home;

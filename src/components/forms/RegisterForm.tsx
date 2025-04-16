import { FirebaseError } from "firebase/app";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { useUserAuth } from "../../context/UserAuthContext";

function RegisterForm() {
  const { signUpWithUserInformation, checkDuplicateEmailInFirestore } =
    useUserAuth();
  const navigate = useNavigate();

  // 🔐 Yup validation schema
  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(200, "กรุณากรอกชื่อไม่เกิน 200 ตัวอักษร")
      .required("กรุณากรอกชื่อ"),
    lastName: Yup.string()
      .max(200, "กรุณากรอกนามสกุลไม่เกิน 200 ตัวอักษร")
      .required("กรุณากรอกนามสกุล"),
    phone: Yup.string()
      .max(20, "กรุณากรอกเบอร์โทรศัพท์ไม่เกิน 20 ตัวอักษร")
      .matches(/^[0-9]{10}$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก")
      .required("กรุณากรอกเบอร์โทรศัพท์"),
    email: Yup.string()
      .max(200, "กรุณากรอกอีเมลไม่เกิน 200 ตัวอักษร")
      .email("รูปแบบอีเมลไม่ถูกต้อง")
      .required("กรุณากรอกอีเมล")
      .test(
        "check-duplicate-email",
        "อีเมลนี้ถูกใช้งานแล้ว",
        async function (value) {
          if (!value) return true;
          const exists = await checkDuplicateEmailInFirestore(
            value.trim().toLowerCase()
          );
          return !exists;
        }
      ),
    password: Yup.string()
      .max(200, "กรุณาตั้งรหัสผ่านไม่เกิน 200 ตัวอักษร")
      .min(6, "รหัสผ่านอย่างน้อย 6 ตัว")
      .required("กรุณาตั้งรหัสผ่าน"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "รหัสผ่านไม่ตรงกัน")
      .required("กรุณายืนยันรหัสผ่าน"),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          //   await signUpWithEmail(values.email, values.password);
          await signUpWithUserInformation({
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
          });
          toast.success("ลงทะเบียนสำเร็จ");
          navigate("/");
        } catch (err) {
          const error = err as FirebaseError;
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>ชื่อ-นามสกุล :</Form.Label>
            <div className="row">
              {/* First Name */}
              <div className="col">
                <Form.Control
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="ชื่อ"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName && touched.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </div>

              {/* Last Name */}
              <div className="col">
                <Form.Control
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="นามสกุล"
                  value={values.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName && touched.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </div>
            </div>
          </Form.Group>

          {/* Phone Number */}
          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Label>เบอร์โทรศัพท์ :</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="กรอกเบอร์โทรศัพท์"
              value={values.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone && touched.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>อีเมล :</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="กรอกอีเมล"
              value={values.email}
              onChange={handleChange}
              isInvalid={!!errors.email && touched.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>รหัสผ่าน :</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="ตั้งรหัสผ่าน"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password && touched.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>ยืนยันรหัสผ่าน :</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="พิมพ์รหัสผ่านอีกครั้ง"
              value={values.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword && touched.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              className="fw-bold mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;

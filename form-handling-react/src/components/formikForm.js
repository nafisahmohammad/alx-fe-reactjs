import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function FormikForm() {
  const initialValues = { username: "", email: "", password: "" };

  const onSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    setStatus(null);

    try {
      // Mock API simulation
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatus({ success: "Registration successful (mock)." });
      resetForm();
    } catch (err) {
      setStatus({ error: "Registration failed." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h2>Formik Registration Form</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status?.error && <p style={{ color: "crimson" }}>{status.error}</p>}
            {status?.success && <p style={{ color: "green" }}>{status.success}</p>}

            <div style={{ marginBottom: 12 }}>
              <label>Username</label>
              <Field name="username" type="text" style={{ width: "100%", padding: 8 }} />
              <div style={{ color: "crimson" }}>
                <ErrorMessage name="username" />
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label>Email</label>
              <Field name="email" type="email" style={{ width: "100%", padding: 8 }} />
              <div style={{ color: "crimson" }}>
                <ErrorMessage name="email" />
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label>Password</label>
              <Field name="password" type="password" style={{ width: "100%", padding: 8 }} />
              <div style={{ color: "crimson" }}>
                <ErrorMessage name="password" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} style={{ padding: "10px 14px" }}>
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormikForm;
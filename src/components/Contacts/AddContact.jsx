// import { useContext } from "react";
// import { Link } from "react-router-dom";

// import { ContactContext } from "../../context/contactContext";
// import { Spinner } from "../";
// import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";

// const AddContact = () => {
//   const { loading, contact, onContactChange, groups, createContact } =
//     useContext(ContactContext);

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <>
//           <section className="p-3">
//             <div className="container">
//               <div className="row">
//                 <div className="col">
//                   <p
//                     className="h4 fw-bold text-center"
//                     style={{ color: GREEN }}
//                   >
//                     Create a new contact{" "}
//                   </p>
//                 </div>
//               </div>
//               <hr style={{ backgroundColor: GREEN }} />
//               <div
//                 className="row p-2 w-75 mx-auto align-items-center"
//                 style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
//               >
//                 <div className="col-md-12">
//                   <form onSubmit={createContact}>
//                     <div className="mb-2">
//                       <input
//                         name="fullname"
//                         type="text"
//                         value={contact.fullname}
//                         onChange={onContactChange}
//                         className="form-control"
//                         placeholder="FirstName & LastName"
//                         required={true}
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <input
//                         name="photo"
//                         type="text"
//                         value={contact.photo}
//                         onChange={onContactChange}
//                         className="form-control"
//                         required={true}
//                         placeholder="image address"
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <input
//                         name="mobile"
//                         type="number"
//                         value={contact.mobile}
//                         onChange={onContactChange}
//                         className="form-control"
//                         required={true}
//                         placeholder="Phone"
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <input
//                         type="email"
//                         name="email"
//                         value={contact.email}
//                         onChange={onContactChange}
//                         className="form-control"
//                         required={true}
//                         placeholder="Email"
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <input
//                         type="text"
//                         name="job"
//                         value={contact.job}
//                         onChange={onContactChange}
//                         className="form-control"
//                         required={true}
//                         placeholder="Job"
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <select
//                         name="group"
//                         value={contact.group}
//                         onChange={onContactChange}
//                         required={true}
//                         className="form-control"
//                       >
//                         <option value="">Select Group :</option>
//                         {groups.length > 0 &&
//                           groups.map((group) => (
//                             <option key={group.id} value={group.id}>
//                               {group.name}
//                             </option>
//                           ))}
//                       </select>
//                     </div>
//                     <div className="mx-2">
//                       <input
//                         type="submit"
//                         className="btn"
//                         style={{ backgroundColor: PURPLE }}
//                         value="Create"
//                       />
//                       <Link
//                         to={"/contacts"}
//                         className="btn mx-2"
//                         style={{ backgroundColor: COMMENT }}
//                       >
//                         Cancel
//                       </Link>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//             <div className="text-center mt-5">
//             <img
//               src={require("../../assets/man-taking-note.png")}
//               height="300px"
//               style={{ opacity: "60%" }}
//               alt="img"
//             />
//           </div>
//           </section>
//         </>
//       )}
//     </>
//   );
// };

// export default AddContact;












import { useContext } from "react";
import { Link } from "react-router-dom";

import { ContactContext } from "../../context/contactContext";
import { Spinner } from "../";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const AddContact = () => {


  const { loading, contact, onContactChange, groups, createContact } = useContext(ContactContext);





  const handleSubmit = (values, { setSubmitting }) => {
    createContact(values);
    setSubmitting(false);
  };






  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('The FullName cannot be empty'),
    photo: Yup.string().url('Invalid URL').required('The Image cannot be empty'),
    mobile: Yup.string().matches(/^[0-9]+$/, 'Mobile number should only contain numbers').required('The PhoneNumber cannot be empty'),
    email: Yup.string().email('Email must include @ and .com').required('The Email cannot be empty'),
    job: Yup.string().required('The Job cannot be empty'),
    group: Yup.string().required('Please select your group'),
  });



  const initialValues = {
    fullname: '',
    photo: '',
    mobile: '',
    email: '',
    job: '',
    group: '',
  };

  






  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    Create a new contact{" "}
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form onChange={onContactChange}>
                      <div className="mb-2">
                        <Field
                          name="fullname"
                          type="text"
                          className="form-control"
                          placeholder="FirstName & LastName"
                          required={true}
                        />
                        <ErrorMessage name="fullname" component="div" className="error" />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="photo"
                          type="text"
                          className="form-control"
                          required={true}
                          placeholder="image address"
                        />
                        <ErrorMessage name="photo" component="div" className="error" />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="mobile"
                          type="number"
                          className="form-control"
                          required={true}
                          placeholder="Phone"
                        />
                        <ErrorMessage name="mobile" component="div" className="error" />
                      </div>
                      <div className="mb-2">
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          required={true}
                          placeholder="Email"
                        />
                        <ErrorMessage name="email" component="div" className="error" />
                      </div>
                      <div className="mb-2">
                        <Field
                          type="text"
                          name="job"
                          className="form-control"
                          required={true}
                          placeholder="Job"
                        />
                        <ErrorMessage name="job" component="div" className="error text-danger text-start" />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="group"
                          required={true}
                          className="form-control"
                          as="select"
                        >
                          <option value="">Select Group :</option>
                          {groups.length > 0 &&
                            groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage name="group" component="div" className="error" />
                      </div>
                      <div className="mx-2">
                        <button
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: PURPLE }}
                          disabled={isSubmitting}
                        >
                          Create
                        </button>
                        <Link
                          to={"/contacts"}
                          className="btn mx-2"
                          style={{ backgroundColor: COMMENT }}
                        >
                          Cancel
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="text-center mt-5">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
                alt="img"
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContact;







// import { useContext } from "react";
// import { Link } from "react-router-dom";

// import { ContactContext } from "../../context/contactContext";
// import { Spinner } from "../";
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";

// const AddContact = () => {
//   const { loading, contact, onContactChange, groups, createContact } =
//     useContext(ContactContext);



//     const handleSubmit = (values, { setSubmitting }) => {
//       createContact(values);
//       setSubmitting(false);
//     };



//     const initialValues = {
//       fullname: '',
//       photo: '',
//       mobile: '',
//       email: '',
//       job: '',
//       group: '',
//     };



//     const validationSchema = Yup.object().shape({
//       fullname: Yup.string()
//         .min(2, 'Too Short!')
//         .max(50, 'Too Long!')
//         .required('Required'),
//       photo: Yup.string().url('Invalid URL').required('Required'),
//       mobile: Yup.string().matches(/^[0-9]+$/, 'Invalid phone number').required('Required'),
//       email: Yup.string().email('Invalid email').required('Required'),
//       job: Yup.string().required('Required'),
//       group: Yup.string().required('Required'),
//     });

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <>
//           <section className="p-3">
//             <div className="container">
//               <div className="row">
//                 <div className="col">
//                   <p
//                     className="h4 fw-bold text-center"
//                     style={{ color: GREEN }}
//                   >
//                     Create a new contact{" "}
//                   </p>
//                 </div>
//               </div>
//               <hr style={{ backgroundColor: GREEN }} />
//               <div
//                 className="row p-2 w-75 mx-auto align-items-center"
//                 style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
//               >
//                 <div className="col-md-12">
//                   <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                   >
//                     {({ isSubmitting }) => (
//                       <Form>
//                         <div className="mb-2">
//                           <Field
//                             name="fullname"
//                             type="text"
//                             className="form-control"
//                             placeholder="FirstName & LastName"
//                             required={true}
//                           />
//                           <ErrorMessage name="fullname" component="div" className="error" />
//                         </div>
//                         <div className="mb-2">
//                           <Field
//                             name="photo"
//                             type="text"
//                             className="form-control"
//                             required={true}
//                             placeholder="image address"
//                           />
//                           <ErrorMessage name="photo" component="div" className="error" />
//                         </div>
//                         <div className="mb-2">
//                           <Field
//                             name="mobile"
//                             type="number"
//                             className="form-control"
//                             required={true}
//                             placeholder="Phone"
//                           />
//                           <ErrorMessage name="mobile" component="div" className="error" />
//                         </div>
//                         <div className="mb-2">
//                           <Field
//                             type="email"
//                             name="email"
//                             className="form-control"
//                             required={true}
//                             placeholder="Email"
//                           />
//                           <ErrorMessage name="email" component="div" className="error" />
//                         </div>
//                         <div className="mb-2">
//                           <Field
//                             type="text"
//                             name="job"
//                             className="form-control"
//                             required={true}
//                             placeholder="Job"
//                           />
//                           <ErrorMessage name="job" component="div" className="error" />
//                         </div>
//                         <div className="mb-2">
//                           <Field
//                             name="group"
//                             required={true}
//                             className="form-control"
//                             as="select"
//                           >
//                             <option value="">Select Group :</option>
//                             {groups.length > 0 &&
//                               groups.map((group) => (
//                                 <option key={group.id} value={group.id}>
//                                   {group.name}
//                                 </option>
//                               ))}
//                           </Field>
//                           <ErrorMessage name="group" component="div" className="error" />
//                         </div>
//                         <div className="mx-2">
//                           <button
//                             type="submit"
//                             className="btn"
//                             style={{ backgroundColor: PURPLE }}
//                             disabled={isSubmitting}
//                           >
//                             Create
//                           </button>
//                           <Link
//                             to={"/contacts"}
//                             className="btn mx-2"
//                             style={{ backgroundColor: COMMENT }}
//                           >
//                             Cancel
//                           </Link>
//                         </div>
//                       </Form>
//                     )}
//                   </Formik>
//                 </div>
//               </div>
//             </div>
//             <div className="text-center mt-5">
//               <img
//                 src={require("../../assets/man-taking-note.png")}
//                 height="300px"
//                 style={{ opacity: "60%" }}
//                 alt="img"
//               />
//             </div>
//           </section>
//         </>
//       )}
//     </>
//   );
// };

// export default AddContact;


import { useEffect, useState, useContext } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { ContactContext } from "../../context/contactContext";
import { getContact, updateContact } from "../../services/contactService";
import { Spinner } from "../";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditContact = () => {
  const { contactId } = useParams();
  const {
    contacts,
    setContacts,
    setFilteredContacts,
    loading,
    setLoading,
    groups,
    createContact,
  } = useContext(ContactContext);



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





  const navigate = useNavigate();

  const [contact, setContact] = useState({});


  const initialValues = {
    fullname: contact.fullname || "",
    photo: contact.photo || "",
    mobile: contact.mobile || "",
    email: contact.email || "",
    job: contact.job || "",
    group: contact.group || "",
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);

        setLoading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (event) => {
    
    try {
      setLoading(true);
      // Copy State
      // Update State
      // Send Request
      // status == 200 -> do nothing
      // status == error -> setState(copyState)
      const { data, status } = await updateContact(contact, contactId);

      /*
       * NOTE
       * 1- forceRender -> setForceRender(true)
       * 2- Send request server
       * 3- Update local state
       * 4- Update local state before sending request to server
       */

      if (status === 200) {
        setLoading(false);

        const allContacts = [...contacts];
        const contactIndex = allContacts.findIndex(
          (c) => c.id === parseInt(contactId)
        );
        allContacts[contactIndex] = { ...data };

        setContacts(allContacts);
        setFilteredContacts(allContacts);

        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    event.preventDefault();
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    Edit Contact
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitForm}
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
                          <ErrorMessage name="job" component="div" className="error" />
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
                            Edit
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
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-5">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;

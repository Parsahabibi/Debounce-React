import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

import { ContactContext } from "./context/contactContext";
import {
  AddContact,
  ViewContact,
  Contacts,
  EditContact,
  Navbar,
} from "./components";

import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactService";

import "./App.css";
import {
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from "./helpers/colors";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Contact Manager App 🐧 ");

    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createContactForm = async (event) => {
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(contact);

      /*
       * NOTE
       * 1- Rerender -> forceRender, setForceRender
       * 2- setContact(data)
       */

      if (status === 201) {
        const allContacts = [...contacts, data];

        setContacts(allContacts);
        setFilteredContacts(allContacts);

        setContact({});
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setLoading((prevLoading) => !prevLoading);
    }
    // event.preventDefault();
  };

  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
              direction: "ltr",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>Delete the contact </h1>
            <p style={{ color: FOREGROUND }}>
              Are you sure you want to delete {contactFullname}'s contact?
            </p>

            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              Yes{" "}
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    /*
     * NOTE
     * 1- forceRender -> setForceRender
     * 2- Server Request
     * 3- Delete Local State
     * 4- Delete State Before Server Request
     */

    // Contacts Copy
    const allContacts = [...contacts];
    try {
      const updatedContact = contacts.filter((c) => c.id !== contactId);
      setContacts(updatedContact);
      setFilteredContacts(updatedContact);

      // Sending delete request to server
      const { status } = await deleteContact(contactId);

      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (err) {
      console.log(err.message);

      setContacts(allContacts);
      setFilteredContacts(allContacts);
    }
  };

  const contactSearch = (query) => {
    setFilteredContacts(
      contacts.filter((contact) => {
        return contact.fullname.toLowerCase().includes(query.toLowerCase());
      })
    );
  };

  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        setContacts,
        setFilteredContacts,
        contacts,
        filteredContacts,
        groups,
        onContactChange,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="contacts/add" element={<AddContact />} />
          <Route path="contacts/:contactId" element={<ViewContact />} />
          <Route path="contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;

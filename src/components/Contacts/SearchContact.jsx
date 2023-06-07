// import { useContext } from "react";

// import { ContactContext } from "../../context/contactContext";
// import { PURPLE } from "../../helpers/colors";
// import debounce from "lodash/debounce";

// const SearchContact = ({ query, search }) => {
//   const { contactSearch } = useContext(ContactContext);

//   return (
//     <div className="input-group mx-2 w-75" dir="ltr">
//       <span
//         className="input-group-text"
//         id="basic-addon1"
//         style={{ backgroundColor: PURPLE }}
//       >
//         <i className="fas fa-search" />
//       </span>
//       <input
//         type="text"
//         onChange={debounce((event) => contactSearch(event.target.value) , 1000)}
//         className="form-control"
//         placeholder="Contact search"
//         aria-label="Search"
//         aria-describedby="basic-addon1"
//       />
//     </div>
//   );
// };
// export default SearchContact 








import { useContext } from "react";

import { ContactContext } from "../../context/contactContext";
import { PURPLE } from "../../helpers/colors";
import throttle from "lodash/throttle";

const SearchContact = ({ query, search }) => {
  const { contactSearch } = useContext(ContactContext);

  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: PURPLE }}
      >
        <i className="fas fa-search" />
      </span>
      <input
        type="text"
        onChange={throttle((event) => contactSearch(event.target.value) , 5000)}
        className="form-control"
        placeholder="Contact search"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};
export default SearchContact 










































// import { useState, useEffect } from "react";
// import debounce from "lodash/debounce";
// import { ContactContext } from "../../context/contactContext";
// import { PURPLE } from "../../helpers/colors";
// import { useContext } from "react";

// const SearchContact = ({ query, search }) => {
//   const { contactSearch } = useContext(ContactContext);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const debouncedSearch = debounce((value) => {
//       contactSearch(value);
//     }, 350);

//     debouncedSearch(searchTerm);

//     return () => {
//     };
//   }, [searchTerm]);

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div className="input-group mx-2 w-75" dir="ltr">
//       <span
//         className="input-group-text"
//         id="basic-addon1"
//         style={{ backgroundColor: PURPLE }}
//       >
//         <i className="fas fa-search" />
//       </span>
//       <input
//         type="text"
//         onChange={handleInputChange}
//         value={searchTerm}
//         className="form-control"
//         placeholder="Contact search"
//         aria-label="Search"
//         aria-describedby="basic-addon1"
//       />
//     </div>
//   );
// };
// export default SearchContact;



























// import { useContext } from "react";

// import { ContactContext } from "../../context/contactContext";
// import { PURPLE } from "../../helpers/colors";

// const SearchContact = ({ query, search }) => {
//   const { contactSearch } = useContext(ContactContext);

//   return (
//     <div className="input-group mx-2 w-75" dir="ltr">
//       <span
//         className="input-group-text"
//         id="basic-addon1"
//         style={{ backgroundColor: PURPLE }}
//       >
//         <i className="fas fa-search" />
//       </span>
//       <input
//         type="text"
//         onChange={(event) => contactSearch(event.target.value)}
//         className="form-control"
//         placeholder="Contact search"
//         aria-label="Search"
//         aria-describedby="basic-addon1"
//       />
//     </div>
//   );
// };

// export default SearchContact;

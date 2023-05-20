import PropTypes from 'prop-types';
import styleCon from "./contacts.module.css"



export const Contacts = ({ contacts, deleteContact }) => {
    return <ul className={styleCon.contactList}>{contacts.map(({ id, name, number}) =>
          (<li key={id} className={styleCon.contactItem}>
        <p>{name} : {number}</p>
        
        <button type="button" onClick={() => deleteContact(id)}> Delete</button>
          </li>
          ))}
          
        </ul> 
}


Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  deleteContact: PropTypes.func.isRequired,
};

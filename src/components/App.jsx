import { nanoid } from 'nanoid'
import { Component, useState, useEffect } from 'react'
import { Section } from './Section'
import { Form } from './Form'
import { Filter } from './Filter'
import { Contacts } from './Contacts'



export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    const contacts = JSON.parse(savedContacts);
    return contacts || [];
  });
  const [filter, setFilter] = useState('');


  useEffect(() => {
    console.log(contacts)
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}, [contacts]);

  const formSubmit = ( name, number ) => {
     const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (name.length === 0 || number.length === 0) {
      return alert(`Field is empty`);
    }

    if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
       return alert(`${name} is already in contacts.`);
    }

    if (contacts.find(contact => contact.number === number)) {
       return alert(`Number: ${number} is already in contacts.`);
    }

    setContacts([contact, ...contacts])
  
  }

  const filterId = nanoid()

  const searchContact = (e) => {
      setFilter(e.currentTarget.value)
  }

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  }
    
  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    };
  
    
  return <div>
      <Section title="Phonebooks">
        
        <Form onSubmit={formSubmit} />

      </Section>

      
      <Section title="Contacts" >
        {contacts.length > 1 && (
          <Filter filterId={filterId} value={filter} onChange={searchContact} />
        )}
       
    
        {contacts.length > 0 ?
          <Contacts contacts={getVisibleContacts()} deleteContact={deleteContact} /> :
          <p>The phonebook is empty</p>
        }
             
      </Section>
    </div>
  
}


// const INITIAL_STATE = {
//   contacts: [  ],
//   filter: '',
// };

// export class App extends Component {

//   state = { ...INITIAL_STATE }


//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('contacts'));
//     if (contacts) {
//       this.setState({ contacts });
//     }
//   }
  
//   componentDidUpdate(prevState){
//     if (this.state.contacts !== prevState.contacts) {
//           localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }
  
//   formSubmit = ( name, number ) => {
//     const {contacts} = this.state;
//      const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     if (name.length === 0 || number.length === 0) {
//       if (name.length === 0) {
//         return alert("The letter in name: ",  name.length);
//       }
//         if (number.length === 0) {
//         return alert("Number of digits in the number: ",  number.length);
//       }
//       return alert(`Field is empty`);
//     }

//     if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
//        return alert(`${name} is already in contacts.`);
//     }

//     if (contacts.find(contact => contact.number === number)) {
//        return alert(`Number: ${number} is already in contacts.`);
//     }


//      this.setState(({ contacts }) => ({
//         contacts: [contact, ...contacts],
//     }));
  
//   }
  
//   filterId = nanoid()
  
//   searchContact = (e) => {
//     this.setState({ filter: e.currentTarget.value });
//   }

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter),
//     );
//   }

//   deleteContact = (id) => {
//      this.setState(({ contacts }) => ({
//       contacts: contacts.filter(contact => contact.id !== id),
//     }));
    
//   }

//   render() {
//     const { filter, contacts } = this.state;
//     const visibleContacts = this.getVisibleContacts();
    
//     return <div>
//       <Section title="Phonebooks">
        
//         <Form onSubmit={ this.formSubmit} />

//       </Section>

      
//       <Section title="Contacts" >
//         {contacts.length > 1 && (
//           <Filter filterId={this.filterId} value={filter} onChange={this.searchContact} />
//         )}
       
    
//         {contacts.length > 0 ?
//           <Contacts contacts={visibleContacts} deleteContact={ this.deleteContact} /> :
//           <p>The phonebook is empty</p>
//         }
             
//       </Section>


    
//     </div>
//   }

// };

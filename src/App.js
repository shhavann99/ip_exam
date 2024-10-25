import React from 'react';
import Home from './components/Home';
import ContactForm from './components/ContactForm';

function App() {
  return React.createElement('div', { className: 'min-h-screen bg-gray-100' }, 
    React.createElement(Home, null), 
    React.createElement(ContactForm, null)
  );
}

export default App;

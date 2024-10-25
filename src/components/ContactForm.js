import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => alert('Message sent successfully!'))
      .catch(error => console.error('Error:', error));
  };

  return React.createElement('div', { className: 'container mx-auto p-4 mt-8' },
    React.createElement('h2', { className: 'text-3xl font-semibold mb-6 text-center' }, 'Contact Us'),
    React.createElement('form', { onSubmit: handleSubmit, className: 'bg-white p-6 rounded shadow-md max-w-lg mx-auto' },
      React.createElement('input', {
        type: 'text',
        name: 'name',
        placeholder: 'Your Name',
        value: formData.name,
        onChange: handleChange,
        className: 'block w-full p-3 mb-4 border border-gray-300 rounded',
        required: true
      }),
      React.createElement('input', {
        type: 'email',
        name: 'email',
        placeholder: 'Your Email',
        value: formData.email,
        onChange: handleChange,
        className: 'block w-full p-3 mb-4 border border-gray-300 rounded',
        required: true
      }),
      React.createElement('textarea', {
        name: 'message',
        placeholder: 'Your Message',
        value: formData.message,
        onChange: handleChange,
        className: 'block w-full p-3 mb-4 border border-gray-300 rounded',
        required: true
      }),
      React.createElement('button', {
        type: 'submit',
        className: 'bg-blue-500 text-white p-3 rounded w-full'
      }, 'Send Message')
    )
  );
}

export default ContactForm;

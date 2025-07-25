import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    businessName: '',
    businessInfo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  fetch('https://hostelng.onrender.com/onboard', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text || 'Submission failed');
        });
      }
      return response.json();
    })
    .then(data => {
     // console.log('User created successfully:', data);
      window.location.href = '/agent-dashboard';
    })
    .catch(error => {
      console.error('Failed to create user:', error.message);
      alert('Failed to register. ' + error.message);
    });
};



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Business Registration</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Full Name"
          required
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Your Address"
          required
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Business Name"
          required
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="businessInfo"
          value={formData.businessInfo}
          onChange={handleChange}
          placeholder="Tell us about your business"
          rows={4}
          required
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

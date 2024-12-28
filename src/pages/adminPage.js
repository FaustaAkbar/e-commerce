// adminPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const AdminPage = () => {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({
    _id: '',
    itemName: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    isBest: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menus');
        setMenus(response.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/menus/${form._id}`, form);
      } else {
        await axios.post('http://localhost:5000/api/menus', form);
      }
      const response = await axios.get('http://localhost:5000/api/menus');
      setMenus(response.data);
      setForm({
        _id: '',
        itemName: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        isBest: false,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving menu:', error);
    }
  };

  const handleEdit = (menu) => {
    setForm(menu);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menus/${id}`);
      setMenus(menus.filter((menu) => menu._id !== id));
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Menu Management</h1>

      <div className="mb-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">{isEditing ? 'Edit Menu' : 'Add New Menu'}</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateOrUpdate();
          }}
        >
          <input type="text" name="itemName" value={form.itemName} onChange={handleInputChange} placeholder="Item Name" className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea name="description" value={form.description} onChange={handleInputChange} placeholder="Description" className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="number" name="price" value={form.price} onChange={handleInputChange} placeholder="Price" className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="category" value={form.category} onChange={handleInputChange} placeholder="Category" className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleInputChange} placeholder="Image URL" className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <label className="flex items-center">
            <input type="checkbox" name="isBest" checked={form.isBest} onChange={handleInputChange} className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded" />
            Best Menu Item
          </label>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            {isEditing ? 'Update' : 'Create'}
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr key={menu._id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200 transition`}>
                <td className="border px-4 py-2 text-gray-700">{menu.itemName}</td>
                <td className="border px-4 py-2 text-gray-700">{menu.description}</td>
                <td className="border px-4 py-2 text-gray-700">{menu.price}</td>
                <td className="border px-4 py-2 text-gray-700">{menu.category}</td>
                <td className="border px-4 py-2 flex space-x-2 justify-center">
                  <button onClick={() => handleEdit(menu)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(menu._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;

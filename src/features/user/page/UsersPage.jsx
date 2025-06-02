import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { fetchRoles } from "../../roles/services/roleService";
import AddUserModal from "../components/AddUserModal";
import UsersTable from "../components/UsersTable";
import { fetchUsers, createUser, deleteUser } from "../services/userService";
import { useAuthStore } from "../../../store/authStore";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    isActive: true,
    role: "",
  });

  const currentUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const result = await fetchUsers();
        setUsers(result.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const result = await fetchRoles();
        setRoles(result.data);
      } catch {
        // Optionally handle error
      }
    };
    loadRoles();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        setUsers((prev) => prev.filter((user) => user._id !== userId));
      } catch (err) {
        alert("Failed to delete user.");
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await createUser(newUser);
      // Refetch users to get the correct role object
      const result = await fetchUsers();
      setUsers(result.data);
      setShowAddForm(false);
      setNewUser({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        isActive: true,
        role: "",
      });
    } catch (err) {
      console.error("Error adding user:", err);
      alert("Failed to add user.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">
            Manage and view all users in the system
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add User
        </button>
      </div>

      <AddUserModal
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddUser}
        roles={roles}
        newUser={newUser}
        onInputChange={handleInputChange}
        formLoading={formLoading}
      />

      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <UsersTable
        users={filteredUsers}
        onDelete={handleDeleteUser}
        currentUser={currentUser}
      />
    </div>
  );
};

export default UsersPage;

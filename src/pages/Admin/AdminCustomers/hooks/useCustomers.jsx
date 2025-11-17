import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchTerm, filterRole]);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setCustomers(data.users || []);
      toast.success('Customers loaded successfully!');
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const filterCustomers = () => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== 'all') {
      filtered = filtered.filter((customer) => customer.role === filterRole);
    }

    setFilteredCustomers(filtered);
  };

  const deleteCustomer = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCustomers();
      toast.success('Customer deleted successfully!');
      return { success: true };
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Failed to delete customer');
      return { success: false };
    }
  };

  // Calculate stats
  const stats = {
    totalCustomers: filteredCustomers.length,
    activeCustomers: filteredCustomers.filter(c => c.isActive).length,
    totalAdmins: filteredCustomers.filter(c => 
      c.role === 'admin' || c.role === 'superadmin' || c.role === 'staff'
    ).length,
    newCustomersThisMonth: filteredCustomers.filter(c => {
      const createdDate = new Date(c.createdAt);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return createdDate.getMonth() === currentMonth && 
             createdDate.getFullYear() === currentYear;
    }).length,
  };

  return {
    customers: filteredCustomers,
    loading,
    searchTerm,
    setSearchTerm,
    filterRole,
    setFilterRole,
    deleteCustomer,
    stats,
  };
};
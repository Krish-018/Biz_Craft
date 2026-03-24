import { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  Activity, 
  Settings, 
  Edit2, 
  Trash2, 
  Search, 
  X, 
  AlertCircle,
  UserPlus,
  UserCheck,
  Clock,
  Mail,
  Phone,
  Filter,
  ChevronDown,
  MoreVertical
} from 'lucide-react';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    adminUsers: 0,
    newToday: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active',
    phone: '',
    department: ''
  });

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'admin',
          status: 'active',
          lastActive: '2026-02-22T10:30:00',
          createdAt: '2026-01-15',
          phone: '+1 234-567-8901',
          department: 'Management',
          avatar: 'JD',
          logins: 245
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'user',
          status: 'active',
          lastActive: '2026-02-22T09:15:00',
          createdAt: '2026-01-20',
          phone: '+1 345-678-9012',
          department: 'Sales',
          avatar: 'JS',
          logins: 156
        },
        {
          id: 3,
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'user',
          status: 'inactive',
          lastActive: '2026-02-21T16:45:00',
          createdAt: '2026-02-01',
          phone: '+1 456-789-0123',
          department: 'Engineering',
          avatar: 'BJ',
          logins: 89
        },
        {
          id: 4,
          name: 'Alice Brown',
          email: 'alice@example.com',
          role: 'user',
          status: 'active',
          lastActive: '2026-02-22T11:00:00',
          createdAt: '2026-02-10',
          phone: '+1 567-890-1234',
          department: 'Marketing',
          avatar: 'AB',
          logins: 67
        },
        {
          id: 5,
          name: 'Charlie Wilson',
          email: 'charlie@example.com',
          role: 'admin',
          status: 'active',
          lastActive: '2026-02-22T08:20:00',
          createdAt: '2026-01-05',
          phone: '+1 678-901-2345',
          department: 'IT',
          avatar: 'CW',
          logins: 312
        }
      ];

      setUsers(mockUsers);
      setStats({
        totalUsers: mockUsers.length,
        activeUsers: mockUsers.filter(u => u.status === 'active').length,
        adminUsers: mockUsers.filter(u => u.role === 'admin').length,
        newToday: 2
      });
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString(),
      logins: 0,
      avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    };
    setUsers([newUser, ...users]);
    setShowAddModal(false);
    resetForm();
    
    setStats({
      ...stats,
      totalUsers: stats.totalUsers + 1,
      activeUsers: formData.status === 'active' ? stats.activeUsers + 1 : stats.activeUsers
    });
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        setStats({
          ...stats,
          adminUsers: newRole === 'admin' ? stats.adminUsers + 1 : stats.adminUsers - 1
        });
        return { ...user, role: newRole };
      }
      return user;
    }));
    setShowEditModal(false);
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        setStats({
          ...stats,
          activeUsers: newStatus === 'active' ? stats.activeUsers + 1 : stats.activeUsers - 1
        });
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  const handleDeleteUser = (userId) => {
    const userToDelete = users.find(u => u.id === userId);
    setUsers(users.filter(user => user.id !== userId));
    setShowDeleteModal(false);
    setSelectedUser(null);
    
    setStats({
      ...stats,
      totalUsers: stats.totalUsers - 1,
      activeUsers: userToDelete.status === 'active' ? stats.activeUsers - 1 : stats.activeUsers,
      adminUsers: userToDelete.role === 'admin' ? stats.adminUsers - 1 : stats.adminUsers
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user',
      status: 'active',
      phone: '',
      department: ''
    });
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-sm text-gray-600">Manage users and permissions</p>
          </div>
          
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <UserPlus size={18} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Cards - Horizontal Scroll on Mobile */}
      <div className="px-4 py-4 overflow-x-auto">
        <div className="flex sm:grid grid-cols-2 sm:grid-cols-4 gap-3 min-w-max sm:min-w-0">
          <div className="w-32 sm:w-auto bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg">
            <p className="text-xs opacity-90">Total Users</p>
            <p className="text-xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="w-32 sm:w-auto bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg">
            <p className="text-xs opacity-90">Active</p>
            <p className="text-xl font-bold">{stats.activeUsers}</p>
          </div>
          <div className="w-32 sm:w-auto bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg">
            <p className="text-xs opacity-90">Admins</p>
            <p className="text-xl font-bold">{stats.adminUsers}</p>
          </div>
          <div className="w-32 sm:w-auto bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-lg">
            <p className="text-xs opacity-90">New Today</p>
            <p className="text-xl font-bold">{stats.newToday}</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Filter size={18} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="all">All</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Users List - Mobile Card View */}
      <div className="px-4 md:hidden">
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                    {user.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{user.name}</h3>
                    <p className="text-xs text-gray-500">{user.department}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setFormData(user);
                      setShowEditModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(mobileMenuOpen === user.id ? null : user.id)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Expandable Details */}
              {mobileMenuOpen === user.id && (
                <div className="mt-3 pt-3 border-t space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={14} className="text-gray-400" />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={14} className="text-gray-400" />
                    <span className="text-gray-600">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-gray-600">Last active: {formatTimeAgo(user.lastActive)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Activity size={14} className="text-gray-400" />
                    <span className="text-gray-600">{user.logins} logins</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {user.role}
                    </span>
                    <button
                      onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {user.status}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Department</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Role</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Active</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                        {user.avatar}
                      </div>
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.phone}</p>
                  </td>
                  <td className="py-3 px-4 text-sm">{user.department}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-sm">{formatTimeAgo(user.lastActive)}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setFormData(user);
                          setShowEditModal(true);
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDeleteModal(true);
                        }}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal - Responsive */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
          <div className="bg-white rounded-t-xl md:rounded-xl w-full md:max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Add New User</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg text-base"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add User
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
          <div className="bg-white rounded-t-xl md:rounded-xl w-full md:max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Change User Role</h2>
            <p className="text-sm text-gray-600 mb-4">User: <span className="font-medium">{selectedUser.name}</span></p>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-lg">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={selectedUser.role === 'user'}
                  onChange={() => setSelectedUser({ ...selectedUser, role: 'user' })}
                />
                <div>
                  <p className="font-medium">User</p>
                  <p className="text-xs text-gray-500">Regular access</p>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border rounded-lg">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={selectedUser.role === 'admin'}
                  onChange={() => setSelectedUser({ ...selectedUser, role: 'admin' })}
                />
                <div>
                  <p className="font-medium">Admin</p>
                  <p className="text-xs text-gray-500">Full access</p>
                </div>
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleRoleChange(selectedUser.id, selectedUser.role)}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
          <div className="bg-white rounded-t-xl md:rounded-xl w-full md:max-w-md p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h2 className="text-lg font-semibold mb-2">Delete User</h2>
              <p className="text-sm text-gray-600 mb-6">
                Delete {selectedUser.name}?
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleDeleteUser(selectedUser.id)}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Add Button */}
      <button
        onClick={() => {
          resetForm();
          setShowAddModal(true);
        }}
        className="fixed bottom-20 right-4 md:hidden w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <UserPlus size={24} />
      </button>
    </div>
  );
};

export default Admin;
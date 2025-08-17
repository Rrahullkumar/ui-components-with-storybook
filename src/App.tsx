import React, { useState, useEffect } from 'react';
import InputField from './components/InputField/InputField';
import DataTable from './components/DataTable/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

// Sample data
const sampleUsers: User[] = [
  { id: 1, name: 'Chintu Sharma', email: 'chintu.mast@lol.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Pinky Verma', email: 'pinky.queen@timepass.in', role: 'User', status: 'active', joinDate: '2023-02-20' },
  { id: 3, name: 'Babloo Yadav', email: 'babloo.dabang@funmail.com', role: 'Editor', status: 'inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Guddi Mishra', email: 'guddi.chatori@chatpata.in', role: 'User', status: 'active', joinDate: '2023-04-05' },
  { id: 5, name: 'Raju Banarasi', email: 'raju.lassi@banaras.com', role: 'Admin', status: 'active', joinDate: '2023-05-12' },
  { id: 6, name: 'Pappu Singh', email: 'pappu.passhogaya@examfail.in', role: 'Moderator', status: 'active', joinDate: '2023-06-08' },
  { id: 7, name: 'Munna Tripathi', email: 'munna.bhaiya@mirzapur.net', role: 'User', status: 'inactive', joinDate: '2023-07-14' },
];

// Column definitions
const userColumns: Column<User>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    sortable: true,
  },
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
    render: (value: string) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value === 'Admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
        value === 'Editor' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      }`}>
        {value}
      </span>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (value: string) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value === 'active' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      }`}>
        {value}
      </span>
    ),
  },
  {
    key: 'joinDate',
    title: 'Join Date',
    dataIndex: 'joinDate',
    sortable: true,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
];

function App() {
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState<User[]>(sampleUsers);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Apply dark mode


  const handleRowSelect = (selectedRows: User[]) => {
    setSelectedUsers(selectedRows);
    console.log('Selected users:', selectedRows);
  };

  const simulateLoading = () => {
    setTableLoading(true);
    setTimeout(() => {
      setTableLoading(false);
    }, 2000);
  };

  const clearData = () => {
    setTableData([]);
  };

  const resetData = () => {
    setTableData(sampleUsers);
  };

  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    website: '',
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const errors = {
    name: !form.name ? 'Name is required' : '',
    email: !form.email ? 'Email is required' : !/.+@.+\..+/.test(form.email) ? 'Enter a valid email' : '',
    password: !form.password ? 'Password is required' : form.password.length < 8 ? 'Minimum 8 characters' : '',
    company: '',
    website: form.website && !/^https?:\/\/.+/i.test(form.website) ? 'Website must start with http:// or https://' : '',
  };

  const isInvalid = (key: keyof typeof form) => Boolean(touched[key] && errors[key]);

  const handleChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleBlur = (key: keyof typeof form) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, company: true, website: true });

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`✅ Form submitted successfully!\n\nName: ${form.name}\nEmail: ${form.email}`);
    }, 1200);
  };

  const toggleDarkMode = () => {
    console.log("Toggle clicked! Current darkMode:", darkMode);
    setDarkMode((prev) => {
      const newValue = !prev;
      console.log("Setting darkMode to:", newValue);
      return newValue;
    });
  };



  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              InputLab Form Components
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Fully functional input fields with validation, states, and theming
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-3 px-6 py-3 rounded-xl font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            {darkMode ? (
              <>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                Switch to Light
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                Switch to Dark
              </>
            )}
          </button>
        </div>

        {/* Main Form */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Main Form</h2>
          <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-8 space-y-6 shadow-2xl shadow-gray-200/50 dark:shadow-black/20">
            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              helperText="This will be displayed on your profile"
              errorMessage={errors.name}
              invalid={isInvalid('name')}
              variant="outlined"
              size="md"
            />

            <InputField
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              errorMessage={errors.email}
              invalid={isInvalid('email')}
              variant="filled"
              size="md"
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Enter a secure password"
              value={form.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              helperText="Must be at least 8 characters"
              errorMessage={errors.password}
              invalid={isInvalid('password')}
              variant="outlined"
              size="md"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Company"
                placeholder="Your company name"
                value={form.company}
                onChange={handleChange('company')}
                helperText="Optional field"
                variant="ghost"
                size="md"
              />

              <InputField
                label="Website"
                placeholder="https://example.com"
                value={form.website}
                onChange={handleChange('website')}
                onBlur={handleBlur('website')}
                errorMessage={errors.website}
                invalid={isInvalid('website')}
                variant="ghost"
                size="md"
              />
            </div>

            {/* Demo States */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 dark:border-gray-700 pt-6">
              <InputField
                label="Disabled State"
                placeholder="Cannot edit this field"
                disabled
                variant="outlined"
                value="Read-only content"
              />
              <InputField
                label="Loading State"
                placeholder="Processing..."
                loading={loading}
                variant="filled"
                value="Loading data..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Submit Form'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setForm({ name: '', email: '', password: '', company: '', website: '' });
                  setTouched({});
                }}
                className="px-8 py-3 rounded-xl font-semibold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>

        {/* Component Showcase */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Component Showcase - Sizes & Variants
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Small / Outlined */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 backdrop-blur p-6 shadow-xl">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Small & Outlined
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Compact size with clean borders
                </p>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Username"
                  size="sm"
                  variant="outlined"
                  placeholder="johndoe"
                  maxLength={20}
                  helperText="Max 20 characters"
                />
                <InputField
                  label="Pin Code"
                  size="sm"
                  variant="outlined"
                  placeholder="123456"
                  type="password"
                  maxLength={6}
                  helperText="6 digit pin"
                />
                <InputField
                  label="OTP"
                  size="sm"
                  variant="outlined"
                  placeholder="Enter 4-digit code"
                  maxLength={4}
                  disabled
                  value="1234"
                />
              </div>
            </div>

            {/* Medium / Filled */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 backdrop-blur p-6 shadow-xl">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Medium & Filled
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Standard size with background fill
                </p>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Email Address"
                  size="md"
                  variant="filled"
                  placeholder="your.email@domain.com"
                  type="email"
                  maxLength={50}
                  helperText="Work or personal email"
                />
                <InputField
                  label="Phone Number"
                  size="md"
                  variant="filled"
                  placeholder="+1 (555) 000-0000"
                  maxLength={17}
                  helperText="Include country code"
                />
                <InputField
                  label="Department"
                  size="md"
                  variant="filled"
                  placeholder="Engineering"
                  maxLength={30}
                  invalid
                  errorMessage="Please select a department"
                />
              </div>
            </div>

            {/* Large / Ghost */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 backdrop-blur p-6 shadow-xl">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Large & Ghost
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Spacious size with minimal styling
                </p>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Project Title"
                  size="lg"
                  variant="ghost"
                  placeholder="Enter project name"
                  maxLength={60}
                  helperText="Up to 60 characters"
                />
                <InputField
                  label="Search Query"
                  size="lg"
                  variant="ghost"
                  placeholder="Type to search..."
                  maxLength={100}
                  helperText="Search across all fields"
                />
                <InputField
                  label="API Key"
                  size="lg"
                  variant="ghost"
                  placeholder="sk-..."
                  type="password"
                  maxLength={64}
                  loading
                  helperText="Validating key..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Demo */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Special Features Demo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 backdrop-blur p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Password & Clear Features
              </h3>
              <div className="space-y-4">
                <InputField
                  label="New Password"
                  type="password"
                  placeholder="Create secure password"
                  helperText="Toggle visibility and clear easily"
                />
                <InputField
                  label="Confirm Password"
                  type="password"
                  placeholder="Repeat password"
                  variant="filled"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 backdrop-blur p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Validation States
              </h3>
              <div className="space-y-4">
                <InputField
                  label="Valid Input"
                  placeholder="This looks good!"
                  value="john.doe@company.com"
                  helperText="✓ Email format is correct"
                />
                <InputField
                  label="Invalid Input"
                  placeholder="Fix this field"
                  value="invalid-email"
                  invalid
                  errorMessage="Please enter a valid email address"
                  variant="filled"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              DataDeck
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Interactive data tables with sorting, selection, loading, and empty states
            </p>
          </div>
          
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-6 py-3 rounded-xl font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button> */}
        </div>

        {/* InputField Demo */}
        {/* <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            InputField Component
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              helperText="We'll never share your email"
            />
            <InputField
              label="Password"
              placeholder="Enter password"
              type="password"
              helperText="Must be at least 8 characters"
            />
            <InputField
              label="Disabled Input"
              placeholder="Cannot edit"
              disabled
              value="Read-only content"
            />
          </div>
        </div> */}

        {/* DataTable Demo */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              DataTable Component
            </h2>
            
            <div className="flex gap-3">
              <button
                onClick={simulateLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Test Loading
              </button>
              <button
                onClick={clearData}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Data
              </button>
              <button
                onClick={resetData}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Reset Data
              </button>
            </div>
          </div>

          <DataTable
            data={tableData}
            columns={userColumns}
            loading={tableLoading}
            selectable={true}
            onRowSelect={handleRowSelect}
          />

          {/* Selection Info */}
          {selectedUsers.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                Selected Users ({selectedUsers.length}):
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map(user => (
                  <span
                    key={user.id}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {user.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;

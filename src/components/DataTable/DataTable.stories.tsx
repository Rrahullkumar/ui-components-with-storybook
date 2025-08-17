import type { Meta, StoryObj } from '@storybook/react';
// import DataTable, { Column } from './DataTable';
import DataTable from './DataTable';

// Sample data interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
  avatar?: string;
}

// Define locally instead of importing
interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}


interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in-stock' | 'out-of-stock' | 'low-stock';
}

// Sample Users Data
const sampleUsers: User[] = [
  { id: 1, name: 'Chintu Sharma', email: 'chintu.mast@lol.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Pinky Verma', email: 'pinky.queen@timepass.in', role: 'User', status: 'active', joinDate: '2023-02-20' },
  { id: 3, name: 'Babloo Yadav', email: 'babloo.dabang@funmail.com', role: 'Editor', status: 'inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Guddi Mishra', email: 'guddi.chatori@chatpata.in', role: 'User', status: 'active', joinDate: '2023-04-05' },
  { id: 5, name: 'Raju Banarasi', email: 'raju.lassi@banaras.com', role: 'Admin', status: 'active', joinDate: '2023-05-12' },
  { id: 6, name: 'Pappu Singh', email: 'pappu.passhogaya@examfail.in', role: 'Moderator', status: 'active', joinDate: '2023-06-08' },
  { id: 7, name: 'Munna Tripathi', email: 'munna.bhaiya@mirzapur.net', role: 'User', status: 'inactive', joinDate: '2023-07-14' },
];

// Sample Products Data
const sampleProducts: Product[] = [
  { id: 1, name: 'MacBook Pro', category: 'Electronics', price: 2399, stock: 15, status: 'in-stock' },
  { id: 2, name: 'iPhone 14', category: 'Electronics', price: 999, stock: 0, status: 'out-of-stock' },
  { id: 3, name: 'AirPods Pro', category: 'Accessories', price: 249, stock: 3, status: 'low-stock' },
  { id: 4, name: 'iPad Air', category: 'Electronics', price: 599, stock: 25, status: 'in-stock' },
];

// User Columns Configuration
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
    render: (value: string, record: User) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
          {value.charAt(0)}
        </div>
        <span className="font-medium">{value}</span>
      </div>
    ),
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
    render: (value: string) => (
      <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
        {value}
      </span>
    ),
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
        value === 'Moderator' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
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
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          value === 'active' ? 'bg-green-500' : 'bg-red-500'
        }`} />
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {value}
        </span>
      </div>
    ),
  },
  {
    key: 'joinDate',
    title: 'Join Date',
    dataIndex: 'joinDate',
    sortable: true,
    render: (value: string) => (
      <span className="text-gray-600 dark:text-gray-400">
        {new Date(value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </span>
    ),
  },
];

// Product Columns Configuration
const productColumns: Column<Product>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Product Name', dataIndex: 'name', sortable: true },
  { key: 'category', title: 'Category', dataIndex: 'category', sortable: true },
  {
    key: 'price',
    title: 'Price',
    dataIndex: 'price',
    sortable: true,
    render: (value: number) => (
      <span className="font-semibold text-green-600 dark:text-green-400">
        ${value.toLocaleString()}
      </span>
    ),
  },
  {
    key: 'stock',
    title: 'Stock',
    dataIndex: 'stock',
    sortable: true,
    render: (value: number, record: Product) => (
      <span className={`font-medium ${
        record.status === 'out-of-stock' ? 'text-red-600 dark:text-red-400' :
        record.status === 'low-stock' ? 'text-yellow-600 dark:text-yellow-400' :
        'text-gray-900 dark:text-gray-100'
      }`}>
        {value} units
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
        value === 'in-stock' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
        value === 'low-stock' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      }`}>
        {value.replace('-', ' ')}
      </span>
    ),
  },
];

// Minimal columns for basic examples
const minimalColumns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DataTable Component

A comprehensive data table component with sorting, selection, loading, and empty states.

## Features
- **Column Sorting**: Click on column headers to sort data
- **Row Selection**: Single or multiple row selection with checkboxes
- **Loading State**: Skeleton loading animation
- **Empty State**: Beautiful empty state with icon and message
- **Custom Rendering**: Custom render functions for columns
- **Responsive Design**: Horizontal scroll on mobile devices
- **Accessibility**: ARIA roles, labels, and keyboard navigation
- **Dark Mode**: Full theme support
- **TypeScript**: Generic typing for type-safe data handling

## Usage
\`\`\`tsx
<DataTable
  data={users}
  columns={userColumns}
  loading={false}
  selectable={true}
  onRowSelect={(rows) => console.log(rows)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of data objects to display in the table',
    },
    columns: {
      control: 'object',
      description: 'Array of column definitions',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading skeleton animation',
    },
    selectable: {
      control: 'boolean',
      description: 'Enable row selection with checkboxes',
    },
    onRowSelect: {
      action: 'row selected',
      description: 'Callback fired when row selection changes',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    loading: false,
    selectable: true,
  },
};

export const BasicTable: Story = {
  args: {
    data: sampleUsers.slice(0, 3),
    columns: minimalColumns,
    loading: false,
    selectable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic table with minimal columns and no selection functionality.',
      },
    },
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    loading: false,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with row selection enabled. Click checkboxes to select rows.',
      },
    },
  },
};

export const WithoutSelection: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    loading: false,
    selectable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table without selection functionality for read-only display.',
      },
    },
  },
};

// State Examples
export const LoadingState: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
    selectable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state with skeleton animation while data is being fetched.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: false,
    selectable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state shown when no data is available to display.',
      },
    },
  },
};

// Data Examples
export const LargeDataset: Story = {
  args: {
    data: [
      ...sampleUsers,
      ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 8,
        name: `User ${i + 8}`,
        email: `user${i + 8}@example.com`,
        role: ['User', 'Admin', 'Editor'][i % 3],
        status: i % 3 === 0 ? 'inactive' : 'active',
        joinDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      })) as User[],
    ],
    columns: userColumns,
    loading: false,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with a larger dataset to test scrolling and performance.',
      },
    },
  },
};

export const ProductsTable: Story = {
  args: {
    data: sampleProducts,
    columns: productColumns,
    loading: false,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with different data type - products with prices and inventory.',
      },
    },
  },
};

// Interactive Examples
export const InteractivePlayground: Story = {
  render: (args) => <DataTable {...args} />,
  args: {
    data: sampleUsers,
    columns: userColumns,
    loading: false,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - try changing the controls to see how the table behaves.',
      },
    },
  },
};

// Sorting Examples
export const PreSortedData: Story = {
  args: {
    data: [...sampleUsers].sort((a, b) => b.name.localeCompare(a.name)),
    columns: userColumns,
    loading: false,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with pre-sorted data (sorted by name descending).',
      },
    },
  },
};

// Custom Rendering Examples
export const CustomRendering: Story = {
  args: {
    data: sampleUsers,
    columns: [
      { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
      {
        key: 'user',
        title: 'User Info',
        dataIndex: 'name',
        sortable: true,
        render: (value: string, record: User) => (
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 dark:text-gray-100">{value}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{record.email}</span>
          </div>
        ),
      },
      {
        key: 'role',
        title: 'Role & Status',
        dataIndex: 'role',
        render: (value: string, record: User) => (
          <div className="flex flex-col gap-1">
            <span className={`px-2 py-1 text-xs font-medium rounded-full inline-block w-fit ${
              value === 'Admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
              value === 'Editor' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
              'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
            }`}>
              {value}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full inline-block w-fit ${
              record.status === 'active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {record.status}
            </span>
          </div>
        ),
      },
      {
        key: 'joinDate',
        title: 'Join Date',
        dataIndex: 'joinDate',
        sortable: true,
        render: (value: string) => new Date(value).toLocaleDateString(),
      },
    ],
    loading: false,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom column rendering combining multiple data fields.',
      },
    },
  },
};

// Responsive Example
export const ResponsiveTable: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    loading: false,
    selectable: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Table in mobile viewport - shows horizontal scroll behavior.',
      },
    },
  },
};

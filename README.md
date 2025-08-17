# 🚀 React UI Components Library

A modern, accessible React component library built with TypeScript, Tailwind CSS, and Storybook.

## ✨ Components

### 🔤 InputField
A flexible input component with validation, multiple variants, and interactive features.

- **Variants**: Outlined, Filled, Ghost
- **Sizes**: Small, Medium, Large  
- **Features**: Validation, Loading states, Clear button, Password toggle
- **Dark Mode**: Full theme support

### 📊 DataTable
A comprehensive data table with sorting, selection, and rich customization options.

- **Sorting**: Click headers to sort (asc → desc → none)
- **Selection**: Multi-select with checkboxes
- **States**: Loading skeleton, Empty state
- **Custom Rendering**: Rich cell content
- **Responsive**: Mobile-friendly scrolling

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** for lightning-fast development
- **Tailwind CSS** for styling
- **Storybook** for component documentation
- **Deployed on Vercel**

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

Clone the repository
git clone <your-repo-url>
cd ui-components

Install dependencies
npm install

Start development server
npm run dev

Start Storybook
npm run storybook

text

## 📱 Development

Development server (React app)
npm run dev # http://localhost:5173

Storybook (Component docs)
npm run storybook # http://localhost:6006

Build for production
npm run build # React app → dist/
npm run build-storybook # Storybook → storybook-static/

text

## 🎨 Usage

### InputField Example
import { InputField } from './components/InputField';

<InputField
label="Email Address"
type="email"
placeholder="Enter your email"
variant="outlined"
size="md"
helperText="We'll never share your email"
onChange={(e) => console.log(e.target.value)}
/>

text

### DataTable Example
import { DataTable } from './components/DataTable';

const columns = [
{ key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
{ key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
];

<DataTable
data={users}
columns={columns}
selectable={true}
onRowSelect={(rows) => console.log('Selected:', rows)}
/>

text

## 🎯 My Approach

### Design Philosophy
- **Accessibility First**: ARIA roles, keyboard navigation, screen reader support
- **Developer Experience**: TypeScript, clear APIs, comprehensive documentation
- **Flexibility**: Multiple variants, custom rendering, extensible design
- **Performance**: Optimized rendering, minimal bundle size

### Architecture Decisions
- **Component Composition**: Each component is self-contained with clear interfaces
- **TypeScript Generics**: DataTable uses generics for type-safe data handling
- **Tailwind CSS**: Utility-first approach for consistent, maintainable styling
- **Storybook Integration**: Living documentation with interactive examples

### Development Workflow
1. **Component Development**: Build components with React + TypeScript
2. **Styling**: Use Tailwind for responsive, theme-aware designs
3. **Documentation**: Create Storybook stories with interactive examples
4. **Testing**: Manual testing via Storybook playground
5. **Deployment**: Automated deployment to Vercel

## 🌐 Live Demo

- **🎨 Storybook Documentation**:https://ui-components-with-storybook.vercel.app/?path=/story/components-datatable--default

## 🎨 Features Showcase

### InputField Features
- ✅ Multiple input types (text, email, password, number)
- ✅ Validation states with error messages
- ✅ Loading and disabled states
- ✅ Clear button functionality
- ✅ Password visibility toggle
- ✅ Responsive sizing
- ✅ Dark mode support

- <img width="1891" height="919" alt="image" src="https://github.com/user-attachments/assets/12fdf7c9-57cf-4277-82e8-642dbee3d0e8" />


### DataTable Features
- ✅ Column sorting with visual indicators
- ✅ Row selection (single/multiple)
- ✅ Loading skeleton animation
- ✅ Empty state with meaningful message
- ✅ Custom cell rendering
- ✅ Responsive horizontal scrolling
- ✅ Keyboard accessibility

- <img width="1880" height="891" alt="image" src="https://github.com/user-attachments/assets/5dd10f25-bb66-4122-a87c-97ef33718358" />


## 🚀 Deployment

Both components are deployed separately:
- **Storybook**: Component documentation and playground

Automated deployment pipeline using Vercel with GitHub integration.

## 🎯 Next Steps

- [ ] Add unit tests with Jest + React Testing Library
- [ ] Implement additional components (Button, Modal, Form)
- [ ] Add animation and micro-interactions
- [ ] Create component templates/generators
- [ ] Implement theming system

## 🤝 Contributing

Feel free to explore the components, suggest improvements, or use them in your projects!

---

**Built with ❤️ using React + TypeScript + Tailwind + Storybook**

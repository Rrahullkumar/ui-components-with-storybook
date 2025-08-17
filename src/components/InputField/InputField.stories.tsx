// src/components/InputField/InputField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# InputField Component

A comprehensive, accessible input component with validation states, multiple variants, and interactive features.

## Features
- **Variants**: Outlined, filled, ghost
- **Sizes**: Small, medium, large  
- **States**: Disabled, invalid, loading
- **Interactive**: Clear button, password toggle
- **Validation**: Error messages, helper text
- **Accessibility**: ARIA labels, keyboard navigation
- **Dark Mode**: Full theme support
        `,
      },
    },
  },
  argTypes: {
    // Basic Props
    label: {
      control: 'text',
      description: 'Input label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
    },
    value: {
      control: 'text',
      description: 'Current value of the input (controlled)',
    },
    helperText: {
      control: 'text',
      description: 'Additional help text below the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (overrides helperText when present)',
    },
    
    // Visual Props
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'ghost'],
      description: 'Visual style variant of the input',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    
    // Input Type
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
      description: 'HTML input type',
    },
    
    // State Props
    disabled: {
      control: 'boolean',
      description: 'Disable the input field',
    },
    invalid: {
      control: 'boolean',
      description: 'Show invalid state styling',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state with spinner',
    },
    
    // Feature Props
    clearable: {
      control: 'boolean',
      description: 'Show clear button when input has value',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum number of characters allowed',
    },
    
    // Event Handlers
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
    onFocus: { action: 'focused' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email address',
    helperText: 'We will never share your email with anyone',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    value: 'John Doe',
    helperText: 'This will be displayed on your profile',
  },
};

export const Required: Story = {
  args: {
    label: 'Username *',
    placeholder: 'Choose a username',
    helperText: 'Username must be unique and 3-20 characters',
    maxLength: 20,
  },
};

// Input Types
export const Email: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'john@example.com',
    helperText: 'Enter a valid email address',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter secure password',
    value: 'mypassword123',
    helperText: 'Use at least 8 characters with numbers and symbols',
  },
};

export const Number: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '25',
    helperText: 'Enter your age in years',
  },
};

// Variants
export const Outlined: Story = {
  args: {
    label: 'Outlined Input',
    placeholder: 'Clean border styling',
    variant: 'outlined',
    helperText: 'Traditional input with visible borders',
  },
};

export const Filled: Story = {
  args: {
    label: 'Filled Input',
    placeholder: 'Background filled styling',
    variant: 'filled',
    helperText: 'Modern input with background fill',
  },
};

export const Ghost: Story = {
  args: {
    label: 'Ghost Input',
    placeholder: 'Minimal underline styling',
    variant: 'ghost',
    helperText: 'Subtle input with bottom border only',
  },
};

// Sizes
export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Compact size',
    size: 'sm',
    helperText: 'Ideal for tight spaces and dense layouts',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    placeholder: 'Standard size',
    size: 'md',
    helperText: 'Most commonly used size for forms',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Spacious size',
    size: 'lg',
    helperText: 'Prominent size for important inputs',
  },
};

// States
export const Invalid: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter valid email',
    value: 'invalid-email-format',
    invalid: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot interact',
    value: 'Read-only content',
    disabled: true,
    helperText: 'This field cannot be modified',
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading Input',
    placeholder: 'Processing...',
    loading: true,
    helperText: 'Please wait while we validate your input',
  },
};

// Features
export const WithClearButton: Story = {
  args: {
    label: 'Search Query',
    placeholder: 'Type to search...',
    value: 'react components',
    clearable: true,
    helperText: 'Click the X button to clear your search',
  },
};

export const WithCharacterLimit: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    value: 'I am a software developer',
    maxLength: 100,
    helperText: 'Brief description for your profile',
  },
};

export const PasswordWithToggle: Story = {
  args: {
    label: 'Create Password',
    type: 'password',
    placeholder: 'Enter new password',
    value: 'SuperSecure123!',
    helperText: 'Click the eye icon to toggle visibility',
  },
};

// Interactive Playground
export const InteractivePlayground: Story = {
  render: (args) => <InputField {...args} />,
  args: {
    label: 'Interactive Input',
    placeholder: 'Try changing props in controls →',
    helperText: 'Use the controls panel to test all features',
  },
};

// Complex Examples
export const FormSection: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        User Registration Form
      </h3>
      
      <InputField
        label="Full Name *"
        placeholder="John Doe"
        variant="outlined"
        size="md"
        helperText="Enter your legal name"
      />
      
      <InputField
        label="Email Address *"
        type="email"
        placeholder="john@example.com"
        variant="filled"
        size="md"
        helperText="We'll send confirmation to this email"
      />
      
      <InputField
        label="Password *"
        type="password"
        placeholder="Create secure password"
        variant="outlined"
        size="md"
        helperText="Must be at least 8 characters"
      />
      
      <InputField
        label="Company"
        placeholder="Acme Inc."
        variant="ghost"
        size="md"
        helperText="Optional - Your current workplace"
      />
      
      <InputField
        label="Phone Number"
        placeholder="+1 (555) 000-0000"
        variant="filled"
        size="md"
        maxLength={17}
        helperText="Include country code"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Example of multiple InputField components used together in a form layout.',
      },
    },
  },
};

export const AllSizesComparison: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Size Comparison
      </h3>
      
      <InputField
        label="Small (sm)"
        placeholder="Compact input"
        size="sm"
        variant="outlined"
        helperText="Good for dense layouts"
      />
      
      <InputField
        label="Medium (md)"
        placeholder="Standard input"
        size="md"
        variant="outlined"
        helperText="Most common size"
      />
      
      <InputField
        label="Large (lg)"
        placeholder="Prominent input"
        size="lg"
        variant="outlined"
        helperText="For important fields"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllVariantsComparison: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Variant Comparison
      </h3>
      
      <InputField
        label="Outlined Variant"
        placeholder="Traditional bordered style"
        variant="outlined"
        helperText="Classic input with visible borders"
      />
      
      <InputField
        label="Filled Variant"
        placeholder="Modern filled style"
        variant="filled"
        helperText="Contemporary design with background"
      />
      
      <InputField
        label="Ghost Variant"
        placeholder="Minimal underline style"
        variant="ghost"
        helperText="Subtle design with bottom border"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Validation States
      </h3>
      
      <InputField
        label="Valid Input"
        placeholder="This looks good"
        value="john.doe@company.com"
        helperText="✓ Email format is correct"
      />
      
      <InputField
        label="Invalid Input"
        placeholder="Something went wrong"
        value="invalid-email"
        invalid
        errorMessage="Please enter a valid email address"
      />
      
      <InputField
        label="Disabled Input"
        placeholder="Cannot edit"
        value="Read-only content"
        disabled
        helperText="This field is not editable"
      />
      
      <InputField
        label="Loading Input"
        placeholder="Validating..."
        loading
        helperText="Please wait while we check availability"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

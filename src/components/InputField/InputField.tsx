import React, { forwardRef, useId, useState } from 'react';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  type?: 'text' | 'email' | 'password' | 'number';
  maxLength?: number;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  const {
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled = false,
    invalid = false,
    loading = false,
    variant = 'outlined',
    size = 'md',
    type = 'text',
    clearable = true,
    className = '',
    id,
    maxLength,
    ...rest
  } = props;

  const uid = useId();
  const inputId = id || `input-${uid}`;
  const [localValue, setLocalValue] = useState<string>(value ?? '');
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === 'password';
  const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;
  const hasError = invalid || Boolean(errorMessage);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value! : localValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setLocalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!disabled && !loading) {
      if (!isControlled) setLocalValue('');
      onChange?.({ target: { value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Size classes with better constraints
  const getSizeClasses = () => {
    if (size === 'sm') return 'h-8 px-3 text-sm min-w-0';
    if (size === 'lg') return 'h-14 px-4 text-lg min-w-0';
    return 'h-11 px-3 text-base min-w-0'; // md
  };

  // Label size classes
  const getLabelSizeClasses = () => {
    if (size === 'sm') return 'text-xs font-medium';
    if (size === 'lg') return 'text-base font-semibold';
    return 'text-sm font-medium'; // md
  };

  // Helper text size classes
  const getHelperSizeClasses = () => {
    if (size === 'sm') return 'text-xs';
    if (size === 'lg') return 'text-sm';
    return 'text-xs'; // md
  };

  // Icon size classes
  const getIconSizeClasses = () => {
    if (size === 'sm') return 'h-3 w-3';
    if (size === 'lg') return 'h-5 w-5';
    return 'h-4 w-4'; // md
  };

  // Button size classes
  const getButtonSizeClasses = () => {
    if (size === 'sm') return 'h-6 w-6';
    if (size === 'lg') return 'h-8 w-8';
    return 'h-7 w-7'; // md
  };

  // Variant classes with improved styling
  const getVariantClasses = () => {
    const baseClasses = 'w-full transition-all duration-200 focus:outline-none overflow-hidden text-ellipsis';
    
    if (variant === 'filled') {
      return `${baseClasses} bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 dark:focus:border-blue-400 rounded-lg ${
        hasError ? 'border-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/20' : 'focus:bg-white dark:focus:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700'
      }`;
    }
    
    if (variant === 'ghost') {
      return `${baseClasses} border-0 border-b-2 bg-transparent rounded-none pb-2 ${
        hasError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500'
      }`;
    }
    
    // outlined (default)
    return `${baseClasses} border-2 bg-transparent rounded-lg ${
      hasError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500'
    }`;
  };

  const getInputPadding = () => {
    const hasIcons = (clearable && currentValue && !disabled && !loading) || 
                     (isPasswordType && !disabled && !loading) || 
                     loading;
    
    if (size === 'sm') return hasIcons ? 'pr-10' : '';
    if (size === 'lg') return hasIcons ? 'pr-14' : '';
    return hasIcons ? 'pr-12' : ''; // md
  };

  const getRightIconPosition = () => {
    if (size === 'sm') return 'right-2';
    if (size === 'lg') return 'right-4';
    return 'right-3'; // md
  };

  const getPasswordTogglePosition = () => {
    const baseRight = clearable && currentValue ? 
      (size === 'sm' ? 'right-8' : size === 'lg' ? 'right-12' : 'right-10') :
      getRightIconPosition();
    return baseRight;
  };

  return (
    <div className={`w-full text-gray-900 dark:text-gray-100 ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`mb-2 block text-gray-800 dark:text-gray-200 ${getLabelSizeClasses()} ${
            disabled ? 'opacity-60' : ''
          }`}
        >
          {label}
          {maxLength && (
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">
              ({currentValue.length}/{maxLength})
            </span>
          )}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          maxLength={maxLength}
          className={`${getSizeClasses()} ${getVariantClasses()} ${getInputPadding()} ${
            disabled ? 'opacity-60 cursor-not-allowed' : ''
          } placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm focus:shadow-md focus:shadow-blue-200/50 dark:focus:shadow-blue-900/30`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        {/* Focus Ring */}
        {isFocused && !disabled && variant !== 'ghost' && (
          <div className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-blue-500/20 ring-offset-2 dark:ring-blue-400/20 ring-offset-white dark:ring-offset-gray-950" />
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className={`absolute inset-y-0 ${getRightIconPosition()} flex items-center`}>
            <svg className={`animate-spin text-gray-400 ${getIconSizeClasses()}`} viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
            </svg>
          </div>
        )}

        {/* Clear Button */}
        {clearable && currentValue && !disabled && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute inset-y-0 ${getRightIconPosition()} my-auto ${getButtonSizeClasses()} rounded-full grid place-items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 transition-colors`}
          >
            <svg className={getIconSizeClasses()} viewBox="0 0 24 24" fill="none">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}

        {/* Password Toggle */}
        {isPasswordType && !disabled && !loading && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute inset-y-0 ${getPasswordTogglePosition()} my-auto ${getButtonSizeClasses()} rounded-full grid place-items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 transition-colors`}
          >
            {showPassword ? (
              <svg className={getIconSizeClasses()} viewBox="0 0 24 24" fill="none">
                <path d="M3 3l18 18M10.58 10.58A3 3 0 0112 9a3 3 0 013 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className={getIconSizeClasses()} viewBox="0 0 24 24" fill="none">
                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zm10 3a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Helper/Error Text */}
      {(helperText || errorMessage) && (
        <p className={`mt-2 ${getHelperSizeClasses()} ${
          hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
        }`}>
          {hasError ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';
export default InputField;

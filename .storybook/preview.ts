// .storybook/preview.ts
import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      story: {
        inline: true,
      },
    },
  },
  globalTypes: {
    darkMode: {
      description: 'Global dark mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Dark mode',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.darkMode === 'dark';
      
      // Apply dark class to html element
      React.useEffect(() => {
        if (typeof document !== 'undefined') {
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      }, [isDark]);

      return React.createElement(
        'div',
        {
          className: `min-h-screen p-6 transition-colors duration-300 ${
            isDark ? 'dark bg-gray-900' : 'bg-white'
          }`
        },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;

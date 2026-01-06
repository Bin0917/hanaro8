import type { Preview } from '@storybook/nextjs-vite';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // redirect => 사용해주어야함
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;

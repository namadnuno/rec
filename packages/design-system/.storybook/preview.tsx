import type { Preview } from '@storybook/react'
import '../src/css/globals.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#111111' },
        { name: 'light', value: '#ffffff' }
      ]
    },
    layout: 'centered'
  },
  decorators: [
    (Story, context) => {
      const isLight = context.globals['backgrounds']?.value === '#ffffff'
      return (
        <div
          data-theme={isLight ? 'light' : undefined}
          style={{ padding: '2rem' }}
        >
          <Story />
        </div>
      )
    }
  ]
}

export default preview

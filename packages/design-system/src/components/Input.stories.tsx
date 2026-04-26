import type { Meta, StoryObj } from '@storybook/react'
import { Input, Select } from './Input'

const inputMeta = {
  title: 'Components/Input',
  component: Input
} satisfies Meta<typeof Input>

export default inputMeta
type InputStory = StoryObj<typeof inputMeta>

export const Default: InputStory = {
  args: { placeholder: 'Enter text...' }
}

export const WithLabel: InputStory = {
  args: { label: 'Recording title', placeholder: 'My awesome recording' }
}

export const WithHint: InputStory = {
  args: { label: 'Email', placeholder: 'you@example.com', hint: 'Used for sharing notifications' }
}

export const WithError: InputStory = {
  args: { label: 'Title', placeholder: 'Enter title', error: 'Title is required' }
}

export const Disabled: InputStory = {
  args: { label: 'Disabled', value: 'Cannot edit', disabled: true }
}

export const SelectDefault: InputStory = {
  render: () => (
    <Select
      label="Quality"
      options={[
        { value: '1080', label: '1080p' },
        { value: '720', label: '720p' },
        { value: '480', label: '480p' }
      ]}
    />
  )
}

export const SelectWithError: InputStory = {
  render: () => (
    <Select
      label="Source"
      error="Please select a source"
      options={[
        { value: 'screen', label: 'Screen' },
        { value: 'window', label: 'Window' }
      ]}
    />
  )
}

export const SelectWithHint: InputStory = {
  render: () => (
    <Select
      label="Frame rate"
      hint="Higher FPS uses more CPU"
      options={[
        { value: '60', label: '60 fps' },
        { value: '30', label: '30 fps' }
      ]}
    />
  )
}

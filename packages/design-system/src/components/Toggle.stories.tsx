import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './Toggle'

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  args: {
    checked: false,
    onChange: () => {}
  }
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = { args: { checked: false } }

export const On: Story = { args: { checked: true } }

export const WithLabel: Story = {
  args: { checked: true, label: 'Show cursor' }
}

export const WithSublabel: Story = {
  args: {
    checked: true,
    label: 'Record microphone',
    sublabel: 'Captures system audio and microphone'
  }
}

export const Disabled: Story = {
  args: { checked: false, label: 'Disabled toggle', disabled: true }
}

export const DisabledOn: Story = {
  args: { checked: true, label: 'Disabled on', disabled: true }
}

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Toggle
        checked={checked}
        onChange={setChecked}
        label="Record audio"
        sublabel="Captures microphone input"
      />
    )
  }
}

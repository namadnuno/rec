import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Button' }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: 'primary' } }

export const Record: Story = { args: { variant: 'record', children: 'Stop Recording' } }

export const Ghost: Story = { args: { variant: 'ghost' } }

export const Subtle: Story = { args: { variant: 'subtle' } }

export const Danger: Story = { args: { variant: 'danger', children: 'Delete' } }

export const Small: Story = { args: { size: 'sm', children: 'Small' } }

export const Large: Story = { args: { size: 'lg', children: 'Large' } }

export const Icon: Story = {
  args: { size: 'icon', children: '⏺' }
}

export const Disabled: Story = { args: { disabled: true } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="record">Record</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="danger">Danger</Button>
    </div>
  )
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">⏺</Button>
    </div>
  )
}

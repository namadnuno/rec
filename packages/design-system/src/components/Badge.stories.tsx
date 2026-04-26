import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Badge' }
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { variant: 'default' } }

export const Primary: Story = { args: { variant: 'primary', children: 'Active' } }

export const Recording: Story = { args: { variant: 'record', children: 'REC', dot: true } }

export const Success: Story = { args: { variant: 'success', children: 'Uploaded' } }

export const Warning: Story = { args: { variant: 'warning', children: 'Warning' } }

export const AI: Story = { args: { variant: 'ai', children: 'AI' } }

export const WithDot: Story = { args: { variant: 'record', children: 'Recording', dot: true } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="record" dot>REC</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="ai">AI</Badge>
    </div>
  )
}

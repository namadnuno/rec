import type { Meta, StoryObj } from '@storybook/react'
import { Timer } from './Timer'

const meta = {
  title: 'Components/Timer',
  component: Timer,
  args: { seconds: 0 }
} satisfies Meta<typeof Timer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { seconds: 0 } }

export const Running: Story = { args: { seconds: 142, recording: true } }

export const LongRecording: Story = { args: { seconds: 3661, recording: true } }

export const SizeLarge: Story = { args: { seconds: 75, recording: true, size: 'lg' } }

export const SizeSmall: Story = { args: { seconds: 75, recording: true, size: 'sm' } }

export const SizeExtraSmall: Story = { args: { seconds: 75, size: 'xs' } }

export const Idle: Story = { args: { seconds: 0, recording: false } }

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <Timer seconds={3723} recording size="lg" />
      <Timer seconds={3723} recording size="sm" />
      <Timer seconds={3723} size="xs" />
    </div>
  )
}

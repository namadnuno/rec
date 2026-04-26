import { Monitor, AppWindow, Crop, Camera } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react'
import { SourceCard } from './SourceCard'

const meta = {
  title: 'Components/SourceCard',
  component: SourceCard,
  args: {
    icon: <Monitor size={20} />,
    label: 'Full Screen'
  }
} satisfies Meta<typeof SourceCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Selected: Story = {
  args: { selected: true }
}

export const WithSublabel: Story = {
  args: {
    icon: <AppWindow size={20} />,
    label: 'Window',
    sublabel: 'Record a single application'
  }
}

export const SelectedWithSublabel: Story = {
  args: {
    icon: <AppWindow size={20} />,
    label: 'Window',
    sublabel: 'Record a single application',
    selected: true
  }
}

export const AllSources: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '320px' }}>
      <SourceCard icon={<Monitor size={20} />} label="Full Screen" sublabel="Entire display" />
      <SourceCard icon={<AppWindow size={20} />} label="Window" sublabel="Single application" selected />
      <SourceCard icon={<Crop size={20} />} label="Region" sublabel="Custom area" />
      <SourceCard icon={<Camera size={20} />} label="Camera" sublabel="Webcam only" />
    </div>
  )
}

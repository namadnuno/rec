import type { Meta, StoryObj } from '@storybook/react'
import {
  Heading1,
  SectionTitle,
  PanelTitle,
  BodyText,
  LabelText,
  CapsLabel,
  MonoText
} from './Typography'

const meta = {
  title: 'Components/Typography',
  component: Heading1
} satisfies Meta<typeof Heading1>

export default meta
type Story = StoryObj<typeof meta>

export const AllScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Heading1>Heading 1 — 28px semibold</Heading1>
      <SectionTitle>Section Title — 22px semibold</SectionTitle>
      <PanelTitle>Panel Title — 18px medium</PanelTitle>
      <BodyText>Body Text — 14px regular. Used for descriptions and longer-form content.</BodyText>
      <LabelText>Label Text — 12px medium</LabelText>
      <CapsLabel>Caps Label — 11px uppercase</CapsLabel>
      <MonoText>mono text — 12px monospace</MonoText>
    </div>
  )
}

export const Heading1Story: Story = {
  name: 'Heading1',
  render: () => <Heading1>Screen Recorder</Heading1>
}

export const SectionTitleStory: Story = {
  name: 'SectionTitle',
  render: () => <SectionTitle>Recording Options</SectionTitle>
}

export const PanelTitleStory: Story = {
  name: 'PanelTitle',
  render: () => <PanelTitle>Audio Settings</PanelTitle>
}

export const BodyTextStory: Story = {
  name: 'BodyText',
  render: () => (
    <BodyText>
      Choose the recording source and configure audio options before starting your session.
    </BodyText>
  )
}

export const LabelTextStory: Story = {
  name: 'LabelText',
  render: () => <LabelText>Frame rate</LabelText>
}

export const CapsLabelStory: Story = {
  name: 'CapsLabel',
  render: () => <CapsLabel>Recording Settings</CapsLabel>
}

export const MonoTextStory: Story = {
  name: 'MonoText',
  render: () => <MonoText>00:03:41</MonoText>
}

export const PolymorphicAs: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <BodyText as="span">BodyText rendered as span</BodyText>
      <Heading1 as="div">Heading1 rendered as div</Heading1>
    </div>
  )
}

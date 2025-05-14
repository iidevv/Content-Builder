import { ComponentConfig } from '@measured/puck'
import React from 'react'

type Props = {
  title: string
  htmlTag: string
  fontSize: string
  alignment: string
  fontColor: string
}

const Heading: ComponentConfig<Props> = {
  label: 'Heading',
  fields: {
    title: {
      type: 'text',
      label: 'Title',
    },
    htmlTag: {
      type: 'select',
      label: 'HTML Tag',
      options: [
        { label: 'h1', value: 'h1' },
        { label: 'h2', value: 'h2' },
        { label: 'h3', value: 'h3' },
        { label: 'h4', value: 'h4' },
        { label: 'h5', value: 'h5' },
        { label: 'h6', value: 'h6' },
        { label: 'span', value: 'span' },
        { label: 'p', value: 'p' },
      ],
    },
    fontSize: {
      type: 'select',
      label: 'Font Size',
      options: [
        { label: 'Extra Small', value: 'text-xs' },
        { label: 'Small', value: 'text-sm' },
        { label: 'Medium', value: 'text-base' },
        { label: 'Large', value: 'text-lg' },
        { label: 'Extra Large', value: 'text-xl' },
        { label: '2XL', value: 'text-2xl' },
        { label: '3XL', value: 'text-3xl' },
      ],
    },
    alignment: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'text-left' },
        { label: 'Center', value: 'text-center' },
        { label: 'Right', value: 'text-right' },
        { label: 'Justify', value: 'text-justify' },
      ],
    },
    fontColor: {
      type: 'text',
      label: 'Font Color',
    },
  },
  defaultProps: {
    title: 'Add Your Heading Text Here',
    htmlTag: 'h2',
    fontSize: 'text-base',
    alignment: 'text-left',
    fontColor: '#000000',
  },
  render: ({ title, htmlTag, fontSize, alignment, fontColor }) => {
    const Tag = (htmlTag || 'p') as keyof React.JSX.IntrinsicElements
    return (
      <Tag className={`${fontSize} ${alignment}`} style={{ color: fontColor }}>
        {title}
      </Tag>
    )
  },
}

export default Heading

import { ComponentConfig } from '@measured/puck'

type Props = {
  thickness: string
  color: string
  orientation: string
}

export const Divider: ComponentConfig<Props> = {
  fields: {
    thickness: {
      type: 'select',
      options: [
        { label: 'Thin', value: 'border' },
        { label: 'Medium', value: 'border-2' },
        { label: 'Thick', value: 'border-4' },
      ],
    },
    color: {
      type: 'select',
      options: [
        { label: 'Gray', value: 'border-gray-300' },
        { label: 'Black', value: 'border-black' },
        { label: 'Light', value: 'border-gray-100' },
      ],
    },
    orientation: {
      type: 'select',
      options: [
        { label: 'Horizontal', value: 'border-t' },
        { label: 'Vertical', value: 'border-l' },
      ],
    },
  },
  defaultProps: {
    thickness: 'border',
    color: 'border-gray-300',
    orientation: 'border-t',
  },
  render: ({ thickness, color, orientation }) => (
    <div
      className={`my-0 mx-auto ${thickness} ${color} ${orientation} ${
        orientation === 'border-t' ? 'w-full h-px' : 'h-full w-px'
      }`}
    />
  ),
}

export default Divider

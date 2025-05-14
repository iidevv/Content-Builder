import { ComponentConfig } from '@measured/puck'

type Props = {
  height: string
}

const Spacer: ComponentConfig<Props> = {
  fields: {
    height: {
      type: 'select',
      options: [
        { label: 'Extra Small', value: 'h-1 md:h-2 lg:h-4' },
        { label: 'Small', value: 'h-2 md:h-4 lg:h-6' },
        { label: 'Medium', value: 'h-4 md:h-6 lg:h-8' },
        { label: 'Large', value: 'h-6 md:h-8 lg:h-10' },
        { label: 'Extra Large', value: 'h-8 md:h-10 lg:h-12' },
      ],
    },
  },
  defaultProps: {
    height: 'h-1 md:h-2 lg:h-4',
  },
  render: ({ height }) => <div className={height}></div>,
}

export default Spacer

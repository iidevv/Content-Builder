import { ComponentConfig } from '@measured/puck'

type Props = {
  title: string
  padding: number
  variant: string
}

const Heading: ComponentConfig<Props> = {
  label: 'Heading',
  fields: {
    title: { type: 'text' },
    padding: { type: 'number' },
    variant: {
      type: 'select',
      options: [
        { label: 'blue', value: 'text-[blue]' },
        { label: 'red', value: 'text-[red]' },
      ],
    },
  },
  defaultProps: {
    title: 'Heading',
    padding: 4,
    variant: 'blue',
  },
  render: ({ title, padding, variant }) => (
    <div style={{ padding }}>
      <h2 className={`${variant}`}>{title}</h2>
    </div>
  ),
}

export default Heading

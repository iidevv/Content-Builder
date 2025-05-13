import { ComponentConfig } from '@measured/puck'

type Props = {
  title: string
  description: string
}

const Card: ComponentConfig<Props> = {
  label: 'Card',
  fields: {
    title: { type: 'text' },
    description: { type: 'textarea' },
  },
  defaultProps: {
    title: 'Heading 1',
    description: 'Description 1',
  },
  render: ({ title, description }) => (
    <div style={{ padding: 64 }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  ),
}

export default Card

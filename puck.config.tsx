import { DropZone, type Config } from '@measured/puck'

type Props = {
  Container: {}
  Grid: {}
  Heading: { title: string; padding: number; variant: string }
  Text: {}
  Image: {}
  Video: {}
  Button: {}
  Divider: {}
  Spacer: {}
  Card: {
    title: string
    description: string
  }
}

export const config: Config<Props> = {
  components: {
    Container: {
      render: () => <DropZone zone="container" />,
    },
    Grid: {
      render: () => {
        return (
          <DropZone
            zone="grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
          />
        )
      },
    },
    Heading: {
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
    },
    Text: {
      render: () => <div>Text</div>,
    },
    Image: {
      render: () => <div>Image</div>,
    },
    Video: {
      render: () => <div>Video</div>,
    },
    Button: {
      render: () => <div>Button</div>,
    },
    Divider: {
      render: () => <div>Divider</div>,
    },
    Spacer: {
      render: () => <div>Spacer</div>,
    },
    Card: {
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
    },
  },
  categories: {
    layout: {
      components: ['Container', 'Grid'],
    },
    basic: {
      components: ['Heading', 'Text', 'Image', 'Video', 'Button', 'Divider', 'Spacer'],
    },
    interactive: {
      components: ['Card'],
    },
  },
}

export default config

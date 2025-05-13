import { ComponentConfig, DropZone } from '@measured/puck'

type Props = {}

const Container: ComponentConfig<Props> = {
  render: () => <DropZone zone="container" />,
}

export default Container

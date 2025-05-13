import { ComponentConfig } from '@measured/puck'
import { DropZone } from '@measured/puck'

type Props = {
  columns: number
  columnGap: number
  rowGap: number
}

const Grid: ComponentConfig<Props> = {
  fields: {
    columns: { type: 'number' },
    columnGap: { type: 'number' },
    rowGap: { type: 'number' },
  },
  defaultProps: {
    columns: 3,
    columnGap: 16,
    rowGap: 16,
  },
  render: () => {
    return <DropZone zone="grid" className="grid grid-cols-2 sm:grid-cols-3 gap-2" />
  },
}

export default Grid

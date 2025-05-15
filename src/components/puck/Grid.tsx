import { ComponentConfig, usePuck } from '@measured/puck'
import { DropZone } from '@measured/puck'
import { Smartphone, Tablet, Laptop } from 'lucide-react'
import { useState } from 'react'

type Props = {
  columns: {
    columnsMobile: string
    columnsTablet: string
    columnsDesktop: string
  }
}

const viewports = {
  Mobile: { width: 375, height: 'auto' as const },
  Tablet: { width: 768, height: 'auto' as const },
  Desktop: { width: 1440, height: 'auto' as const },
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const icons = {
  Mobile: Smartphone,
  Tablet: Tablet,
  Desktop: Laptop,
}

const Grid: ComponentConfig<Props> = {
  fields: {
    columns: {
      type: 'custom',
      render: ({
        value = { columnsMobile: '', columnsTablet: '', columnsDesktop: '' },
        onChange,
      }) => {
        const { dispatch, appState } = usePuck()
        const [currentTab, setCurrentTab] = useState<keyof typeof viewports>('Desktop')

        const parseCols = (val: string) => parseInt(val.match(/\d+/)?.[0] || '1', 10)

        const handleChange = (device: keyof typeof viewports, cols: number) => {
          const newValue = {
            ...value,
            [`columns${device}`]: getGridClass(device, cols),
          }
          onChange(newValue)
        }

        const getGridClass = (device: string, cols: number) => {
          const prefix = {
            Mobile: '',
            Tablet: 'md:',
            Desktop: 'lg:',
          }[device]
          return `${prefix}grid-cols-${cols}`
        }

        const getSlider = (device: keyof typeof viewports) => {
          const currentVal = value[`columns${device}`] || ''
          const cols = parseCols(currentVal)
          return (
            <>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {device} Columns: {cols}
              </label>
              <input
                type="range"
                min={1}
                max={6}
                value={cols}
                onChange={(e) => handleChange(device, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </>
          )
        }

        const setViewport = (viewport: keyof typeof viewports) => {
          dispatch({
            type: 'setUi',
            ui: {
              viewports: {
                ...appState.ui.viewports,
                current: viewports[viewport],
              },
            },
          })
          setCurrentTab(viewport)
        }

        return (
          <div>
            <div className="mb-4 flex space-x-2">
              {Object.keys(viewports).map((viewport) => {
                const Icon = icons[viewport as keyof typeof icons]
                return (
                  <button
                    key={viewport}
                    onClick={() => setViewport(viewport as keyof typeof viewports)}
                    className={classNames(
                      currentTab === viewport ? 'text-indigo-600' : 'text-gray-500',
                      'p-1',
                    )}
                    aria-label={`Switch to ${viewport} viewport`}
                  >
                    <Icon className="h-8 w-8 p-1 cursor-pointer" />
                  </button>
                )
              })}
            </div>
            <div className="mt-4">{getSlider(currentTab)}</div>
          </div>
        )
      },
    },
  },
  defaultProps: {
    columns: {
      columnsMobile: 'grid-cols-1',
      columnsTablet: 'md:grid-cols-2',
      columnsDesktop: 'lg:grid-cols-3',
    },
  },
  render: ({ columns }) => {
    return (
      <DropZone
        zone="grid"
        className={classNames(
          'grid gap-2',
          columns.columnsMobile,
          columns.columnsTablet,
          columns.columnsDesktop,
        )}
      />
    )
  },
}

export default Grid

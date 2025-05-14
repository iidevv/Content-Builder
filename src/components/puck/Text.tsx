import { useState } from 'react'
import { ComponentConfig } from '@measured/puck'
import RichText from '../lexical'

type Props = {
  text: string
}

const Text: ComponentConfig<Props> = {
  fields: {
    text: {
      type: 'custom',
      render: ({ onChange, value }) => {
        const [isOpen, setIsOpen] = useState(false)
        const [tempValue, setTempValue] = useState(value)

        const openModal = () => {
          setTempValue(value)
          setIsOpen(true)
        }

        const saveAndClose = () => {
          onChange(tempValue)
          setIsOpen(false)
        }

        return (
          <>
            <button
              onClick={openModal}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none cursor-pointer"
            >
              EDIT TEXT
            </button>

            {isOpen && (
              <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/10">
                <div className="bg-white p-6 rounded-lg rounded-b-none w-full max-w-4xl shadow-2xl">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={saveAndClose}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none cursor-pointer"
                    >
                      SAVE
                    </button>
                  </div>
                  <div className="mb-4">
                    <RichText value={tempValue} onChange={setTempValue} />
                  </div>
                </div>
              </div>
            )}
          </>
        )
      },
    },
  },
  defaultProps: {
    text: '<p>Add Your Text Here</p>',
  },
  render: ({ text }) => {
    return <div dangerouslySetInnerHTML={{ __html: text }} />
  },
}

export default Text

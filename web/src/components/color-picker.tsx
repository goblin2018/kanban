import { CirclePicker } from 'react-color'

interface Props {
  color?: string
  setColor: (c: string) => void
}

const ColorPicker: React.FC<Props> = ({ color, setColor }) => {
  return (
    <CirclePicker
      color={color}
      onChange={(c, e) => {
        setColor(c.hex)
      }}
      colors={[
        '#8C67DC',
        '#CAB8EE',
        '#FD8871',
        '#FDAB9B',
        '#0B70FE',
        '#67A6FE',
        '#43CCFF',
        '#99E3FF',
        '#1DD1A1',
        '#4CE6BD',
        '#FECA57',
        '#FEDF9A',
        '#E96EA3',
        '#FA9EC6',
        '#FEA451',
        '#FFCA99',
        '#60D579',
        '#AFE9BB',
      ]}
    />
  )
}

export default ColorPicker

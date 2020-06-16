import React, { useState } from 'react'
import styled from 'styled-components'
import { SketchPicker } from 'react-color'
import { Brush } from '@styled-icons/material/Brush'

const PickerWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`

const Color = styled.div`
  width: 25px;
  height: 25px;
  display:block;
  background-color: ${props => props.color? 'rgb(' + props.color.rgb.r + ',' + props.color.rgb.g + ',' + props.color.rgb.b + ')' : '#fff'};
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.selected ? 'red' : 'black'}
  cursor: pointer;
  border-radius: 2px;
`

const StyledSketchPicker = styled(SketchPicker)`
  display: block;
`

const BrushColor = styled(Brush)`
  color: ${props => props.color.rgb.r + props.color.rgb.g + props.color.rgb.b > 525 ? '#000': '#fff'}
`

const EmptyColor = () => {
  return (<Color><Brush /></Color>)
}

const SetupColorSwatches = (colors, rows, columns, selectedIdx, onSelect) => {
  const palette = []
  for(var i = 0; i < rows; i++){
    palette[i] = []
    for(var j = 0; j < columns; j++){
      const idx = i*columns + j
      const color = colors[idx]
      const key = 'rowcolumn' + idx
      palette[i][j] = idx < colors.length ? <Color key={key} color={color} onClick={() => selectedIdx !== idx ? onSelect(idx) : onSelect(-1)} selected={selectedIdx === idx}><BrushColor color={color} /></Color> : <EmptyColor key={key} />
    }
  }
  return palette
}

const handleColorChange = (idx, onChange) => (color) => {
  onChange(list => { list[idx] = color; return [...list]})
}

const ColorPicker = ({ colors, rows, columns, onChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const palette = SetupColorSwatches(colors, rows, columns, selectedIndex, setSelectedIndex)

  return (
    <PickerWrapper>
      <table>
        <tbody>
          {palette.map((colorRow, rowidx) => <tr key={'row'+rowidx}>
            {colorRow.map((color, idx) =>
              <td key={'td-'+idx}>
                {color}
              </td>
            )}
          </tr>)}
        </tbody>
      </table>
      {selectedIndex !== -1 && <StyledSketchPicker color={colors[selectedIndex]} onChange={handleColorChange(selectedIndex, onChange)} />}
    </PickerWrapper>
  )
}

export default ColorPicker
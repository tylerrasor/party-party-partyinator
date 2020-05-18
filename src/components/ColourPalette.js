import React, { useState } from 'react'
import styled from 'styled-components'
import { SketchPicker } from "react-color"
import { Brush } from '@styled-icons/material/Brush'


const Colour = styled.div`
  width: 25px;
  height: 25px;
  display:block;
  background-color: ${props => props.colour? 'rgb(' + props.colour.rgb.r + ',' + props.colour.rgb.g + ',' + props.colour.rgb.b + ')' : '#fff'};
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.selected ? 'red' : 'black'}
  cursor: pointer;
  `

const BrushColor = styled(Brush)`
  color: ${props => props.color.rgb.r + props.color.rgb.g + props.color.rgb.b > 525 ? '#000': '#fff'}
`

const EmptyColour = () => {
  return (<Colour><Brush /></Colour>)
}

const SetupColourSwatches = (colours, rows, columns, selectedIdx, onSelect) => {
  const palette = []
  for(var i = 0; i < rows; i++){
    palette[i] = []
    for(var j = 0; j < columns; j++){
      const idx = i*columns + j
      const color = colours[idx]
      const key = 'rowcolumn' + idx
      palette[i][j] = idx < colours.length ? <Colour key={key} colour={color} onClick={() => onSelect(idx)} selected={selectedIdx === idx}><BrushColor color={color} /></Colour> : <EmptyColour key={key} />
    }
  }
  return palette
}

const handleColorChange = (idx, onChange) => (color) => {
  onChange(list => { list[idx] = color; return [...list]})
}

const ColourPalette = ({ colours, rows, columns, onChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const palette = SetupColourSwatches(colours, rows, columns, selectedIndex, setSelectedIndex)

  return (
    <>
      <table>
        <tbody>
          {palette.map((colourRow, rowidx) => <tr key={'row'+rowidx}>
            {colourRow.map((color, idx) =>
              <td key={'td-'+idx}>
                {color}
              </td>
            )}
          </tr>)}
        </tbody>
      </table>
      <SketchPicker color={colours[selectedIndex]} onChange={handleColorChange(selectedIndex, onChange)} />
    </>
  )
}

export default ColourPalette
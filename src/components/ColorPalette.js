import React  from 'react'
import styled from 'styled-components'
import { Palette } from '@styled-icons/material-outlined/Palette'


const StyledColorPalette = styled.div`
  width: 50px;
  height: 50px;
  display:block;
  background-image: linear-gradient(to right, ${props => props.colors});
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.selected ? 'red' : 'black'}
  cursor: pointer;
  border-radius: 5px;
  `

const ColorPalette = ({ colors, onClick, style }) => {
  let colorList = colors.map(color => color.hex)
  colorList = colorList.join(',')

  return (
    <StyledColorPalette colors={colorList} onClick={onClick} style={style}><Palette /></StyledColorPalette>
  )
}

export default ColorPalette
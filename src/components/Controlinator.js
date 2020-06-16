import React from 'react'
import ColorPalette from './ColorPalette'
import ColorPicker from './ColorPicker'
import styled from 'styled-components'
import { isMobile } from "react-device-detect"
import { ColorObjPlease } from '../util/ColorPaletteUtil'
import { NoParty, PartyPartyParty } from '../util/PredefinedColorPalettes'

const StyledRowWrapper = styled.div`
  width: ${isMobile ? '100%' : '50%'};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`

const PredefinedPalettes = {
  partyPalette: ColorObjPlease(PartyPartyParty),
  noPartyPalette: ColorObjPlease(NoParty)
}

const Controlinator = ({ colors, setColors }) => {
  return (
    <>
      <StyledRowWrapper>
        <ColorPalette colors={PredefinedPalettes.partyPalette} onClick={() => setColors([...PredefinedPalettes.partyPalette])} style={{'marginRight': '10px'}}/>
        <ColorPalette colors={PredefinedPalettes.noPartyPalette} onClick={() => setColors([...PredefinedPalettes.noPartyPalette])} />
      </StyledRowWrapper>
      <StyledRowWrapper>
        <ColorPicker rows={1} columns={10} colors={colors} onChange={setColors}/>
      </StyledRowWrapper>
    </>
  )
}

export default Controlinator

import React, { useState } from 'react'
import styled from 'styled-components'
import Partyifier from './components/Partyifier'
import Uploadinator from './components/Uploadinator'
import { isMobile } from 'react-device-detect'
import ColorPicker from './components/ColorPicker'
import { PartyPartyParty, NoParty } from './util/PredefinedColorPalettes'
import { RGBArrayPlease, ColorObjPlease } from './util/ColorPaletteUtil'
import ColorPalette from "./components/ColorPalette";

const StyledAppWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const StyledColumnWrapper = styled.div`
  width: ${isMobile ? '100%' : '50%'};
  display: flex;
  flex-direction: column;
  align-items: center;
`

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

const App = () => {
  const [theParty, setTheParty] = useState(null)
  const [colors, setColors] = useState([...ColorObjPlease(PartyPartyParty)])

  const jamImageOnPage = image => { setTheParty(image) }

  return (
    <StyledAppWrapper>
      <StyledColumnWrapper>
        <StyledRowWrapper>
          <ColorPalette colors={PredefinedPalettes.partyPalette} onClick={() => setColors([...PredefinedPalettes.partyPalette])} style={{'margin-right': '10px'}}/>
          <ColorPalette colors={PredefinedPalettes.noPartyPalette} onClick={() => setColors([...PredefinedPalettes.noPartyPalette])} />
        </StyledRowWrapper>
        <StyledRowWrapper>
          <ColorPicker rows={5} columns={2} colors={colors} onChange={setColors}/>
        </StyledRowWrapper>
      </StyledColumnWrapper>
      <StyledColumnWrapper>
        <Uploadinator jamImageOnPage={jamImageOnPage}/>
        <Partyifier maybePartyFile={theParty} colors={RGBArrayPlease(colors)}/>
      </StyledColumnWrapper>
    </StyledAppWrapper>
  )
}

export default App

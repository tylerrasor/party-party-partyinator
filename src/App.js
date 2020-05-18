import React, { useState } from 'react'
import styled from 'styled-components'
import Partyifier from './components/Partyifier'
import Uploadinator from './components/Uploadinator'
import { isMobile } from 'react-device-detect'
import ColourPalette from './components/ColourPalette'
import { RGBArrayPlease, ColorObjPlease, PartyPartyParty, NoParty } from "./util/ColorPalettes";

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

const paletteSize = 10
const defaultPaletteColor = {rgb:{r:0, g:0, b:0, a:1}, hex: '#000'}

const App = () => {
  const [theParty, setTheParty] = useState(null)
  const [colors, setColors] = useState(Array(paletteSize).fill(defaultPaletteColor,0))

  const jamImageOnPage = image => { setTheParty(image) }

  return (
    <StyledAppWrapper>
      <StyledColumnWrapper>
        <Uploadinator jamImageOnPage={jamImageOnPage}/>
        <Partyifier maybePartyFile={theParty} colors={RGBArrayPlease(colors)}/>
        <ColourPalette rows={2} columns={5} colours={colors} onChange={setColors}/>
        <button onClick={() => setColors([...ColorObjPlease(PartyPartyParty)])}>Party Palette</button>
        <button onClick={() => setColors([...ColorObjPlease(NoParty)])}>Speak Easy Palette</button>
      </StyledColumnWrapper>
    </StyledAppWrapper>
  )
}

export default App

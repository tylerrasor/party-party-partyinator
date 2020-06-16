import React, { useState } from 'react'
import styled from 'styled-components'
import Partyifier from './components/Partyifier'
import Uploadinator from './components/Uploadinator'
import Controlinator from './components/Controlinator'
import { isMobile } from 'react-device-detect'
import { PartyPartyParty } from './util/PredefinedColorPalettes'
import { ColorObjPlease } from './util/ColorPaletteUtil'

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

const App = () => {
  const [theParty, setTheParty] = useState(null)
  const [config, setConfig] = useState({
    speed: 100,
    colors: [...ColorObjPlease(PartyPartyParty)]
  })

  const jamImageOnPage = image => { setTheParty(image) }

  return (
    <StyledAppWrapper>
      <StyledColumnWrapper>
        <Uploadinator jamImageOnPage={jamImageOnPage} />
        <Partyifier maybePartyFile={theParty} config={config} />
        {theParty && <Controlinator config={config} setConfig={setConfig} />}
      </StyledColumnWrapper>
    </StyledAppWrapper>
  )
}

export default App

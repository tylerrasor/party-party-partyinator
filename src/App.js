import React, { useState } from 'react'
import styled from 'styled-components'
import Partyifier from './components/Partyifier'
import Uploadinator from './components/Uploadinator'
import { isMobile } from 'react-device-detect'
import { Clock } from 'styled-icons/icomoon/Clock'

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
  const [shouldIParty, setShouldIParty] = useState( true)

  const jamImageOnPage = image => { setTheParty(image) }

  return (
    <StyledAppWrapper>
      <StyledColumnWrapper>
        <span onClick={() => setShouldIParty(!shouldIParty) }><Clock width='10' height='10'/></span>
        <Uploadinator jamImageOnPage={jamImageOnPage}/>
        <Partyifier maybePartyFile={theParty} shouldIParty={shouldIParty}/>
      </StyledColumnWrapper>
    </StyledAppWrapper>
  )
}

export default App

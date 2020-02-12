import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Partyifier from './components/Partyifier'
import Uploadinator from './components/Uploadinator'
import Downloadinator from './components/Downloadinator'
import { isMobile } from 'react-device-detect'

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

  const jamImageOnPage = useCallback(image => { setTheParty(image) }, [setTheParty])

  return (
    <StyledAppWrapper>
      <StyledColumnWrapper>
        <Downloadinator jamImageOnPage={jamImageOnPage} />
        <Uploadinator jamImageOnPage={jamImageOnPage}/>
        <Partyifier maybePartyFile={theParty}/>
      </StyledColumnWrapper>
    </StyledAppWrapper>
  )
}

export default App

import React, { useState } from 'react'
import styled from 'styled-components'
import Partyifier from './components/Partyifier'
import Uploadinator from './components/Uploadinator'

const StyledAppWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const StyledColumnWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const App = () => {
  const [theParty, setTheParty] = useState(null)

  const jamImageOnPage = image => { setTheParty(image) }

  return (
    <StyledAppWrapper>
      <StyledColumnWrapper>
        <Uploadinator jamImageOnPage={jamImageOnPage}/>
        <Partyifier party={theParty}/>
      </StyledColumnWrapper>
    </StyledAppWrapper>
  )
}

export default App

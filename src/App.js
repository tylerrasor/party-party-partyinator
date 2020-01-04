import React, { useState } from 'react'
import styled from 'styled-components'
import Uploadinator from './components/Uploadinator'

const StyledAppWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const StyledColumnWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const StyledPartyJammingSpace = styled.div`
  height: 200px;
  background: #ababab;
  text-justify: auto;
  text-align: center;
  padding-top: 20px;
  border-radius: 10px;
  margin-top: 80px;
`

const App = () => {
  const [theParty, setTheParty] = useState()
  const jamImageOnPage = image => { setTheParty(<div>{image}</div>) }

  return (
    <StyledAppWrapper>
      <StyledColumnWrapper>
        <Uploadinator jamImageOnPage={jamImageOnPage}/>
        <StyledPartyJammingSpace>
          {theParty}
        </StyledPartyJammingSpace>
      </StyledColumnWrapper>
    </StyledAppWrapper>
  )
}

export default App

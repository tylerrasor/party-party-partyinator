import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Download } from 'styled-icons/feather/Download'
import { isMobile } from 'react-device-detect'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import axios from 'axios'

const Container = styled.div`
  height: ${isMobile ? '15vh' : '75px'};
  width: ${isMobile ? '95vw' : '400px'};
  background: #ababab;
  text-justify: auto;
  text-align: center;
  padding-top: ${isMobile ? '5vh' : '20px'};
  border-radius: 10px;
  margin-top: ${isMobile ? '2vh' : '80px'};
  font-size: ${isMobile ? '24px' : ''};
`

const UrlInput = styled(TextField)`
      text-color: 'white';
      border-color: 'white';
`

const StyledDownloadIcon = styled(Download).attrs(props => ({
  ...props,
  size: isMobile ? 72 : 24
}))`
  margin-top: 15px;
`

let Downloadinator = ({ jamImageOnPage }) => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    let imageToParty = <p>whoa, I can't party that</p>
    
    if (url.length > 0){
      axios({
        url: url,
        method: 'GET',
        responseType: 'arraybuffer'
      }).then((response) => {
        if ( response.statusText === 'OK' ) {
          imageToParty = new File([response.data], 'test.png', {type: 'image/png'})
          imageToParty.path = 'test.png'
          jamImageOnPage(imageToParty)
        }
      })
    }

  }, [url, jamImageOnPage])

  return (
    <Container >
          <div>
            <UrlInput 
              value={url}
              onChange={e => setUrl(e.target.value)}
              type='text'
              id='url' 
              label='Get the party started'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <StyledDownloadIcon />
                  </InputAdornment>
                )
              }}
              variant="outlined"
            />
          </div>
    </Container>
  )
}

export default Downloadinator

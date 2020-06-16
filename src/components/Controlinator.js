import React from 'react'
import ColorPalette from './ColorPalette'
import ColorPicker from './ColorPicker'
import styled from 'styled-components'
import { isMobile } from "react-device-detect"
import { ColorObjPlease } from '../util/ColorPaletteUtil'
import { NoParty, PartyPartyParty } from '../util/PredefinedColorPalettes'
import Collapsible from 'react-collapsible'
import { SlidersH } from '@styled-icons/fa-solid/SlidersH'

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

const Controlinator = ({ config, setConfig }) => {
  return (
    <Collapsible trigger={<SlidersH size={24} color={'#6a6a6a'} />} open={true}>
      <StyledRowWrapper>

      </StyledRowWrapper>
      <StyledRowWrapper>
        <ColorPalette colors={PredefinedPalettes.partyPalette} onClick={() => setConfig({ ...config, colors: [...PredefinedPalettes.partyPalette] })} style={{'marginRight': '10px'}}/>
        <ColorPalette colors={PredefinedPalettes.noPartyPalette} onClick={() => setConfig({ ...config, colors: [...PredefinedPalettes.noPartyPalette] })} />
      </StyledRowWrapper>
      <StyledRowWrapper>
        <ColorPicker rows={1} columns={10} colors={config.colors} onChange={colors => setConfig({ ...config, colors: colors })}/>
      </StyledRowWrapper>
    </Collapsible>
  )
}

export default Controlinator

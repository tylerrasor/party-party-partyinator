import React from 'react'
import ColorPalette from './ColorPalette'
import ColorPicker from './ColorPicker'
import styled from 'styled-components'
import { isMobile } from "react-device-detect"
import { ColorObjPlease } from '../util/ColorPaletteUtil'
import { NoParty, PartyPartyParty } from '../util/PredefinedColorPalettes'
import Collapsible from 'react-collapsible'
import { SlidersH } from '@styled-icons/fa-solid/SlidersH'
import ReactSlider from 'react-slider'

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

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 20px;
`;

const StyledThumb = styled.div`
    height: 20px;
    line-height: 20px;
    width: 25px;
    text-align: center;
    background-color: #000;
    color: #cacaca;
    border-radius: 15%;
    cursor: grab;
`;

const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => props.index === 2 ? '#f00' : props.index === 1 ? '#555555' : '#aaaaaa'};
    border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const Controlinator = ({ config, setConfig }) => {
  return (
    <Collapsible trigger={<SlidersH size={24} color={'#6a6a6a'} />} open={true}>
      <StyledRowWrapper>
        Speed:
        <StyledSlider min={1} defaultValue={[50]} renderTrack={Track} renderThumb={Thumb} onAfterChange={val => setConfig({ ...config, speed: 100 * 50/val })} />
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

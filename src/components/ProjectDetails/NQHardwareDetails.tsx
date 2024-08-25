import styled from "styled-components";

const Frame = styled.div<{vis: boolean}>`
    width: calc(100vw - 360px);
    display: ${(props) => props.vis ? 'block' : 'none'};
`
const Scope = styled.div`
    display: flex;
    flex-direction: column;
`
const Caption = styled.p`
    font-family: halyard-text, sans-serif;
    font-size: 1.1rem;
    font-weight: 200;
    color: rgb(143, 143, 143);
    float: left;
`
const P = styled.p`
    clear: both;
    line-height: 1.5rem;
`
const Summary = styled.div`
    display: flex;
    flex-direction: column;
`
const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`
const SpacerLine = styled.div`
    width: 40px;
    margin-top: 30px;
    margin-left: 6px;
    margin-right: 6px;
`
const Line = styled.div`
    border-top: 1px solid rgb(143, 143, 143);
`
interface Props {
    visible: boolean;
}
const NQHardwareDetails = ({ visible } : Props) => {
  return (
    <Frame vis={visible}>
        <h1>NQ Hardware Details</h1>
        <Scope>
            <Caption>Scope</Caption>
            <P>Art Direction,<br/>UX/UI,<br/>Web development</P>
        </Scope>
        <Summary>
            <Top>
                <Caption>Website</Caption>
                <SpacerLine><Line/></SpacerLine>
                <Caption>2019</Caption>
            </Top>
        </Summary>
    </Frame>
  )
}

export default NQHardwareDetails
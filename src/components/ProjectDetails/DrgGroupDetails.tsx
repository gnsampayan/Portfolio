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
const H1 = styled.h1`
    clear: both;
    font-family: halyard-display, sans-serif;
    font-size: 3rem;
    font-weight: 400;
    margin-top: -10px;
`
const P = styled.p`
    clear: both;
    font-family: halyard-text, sans-serif;
    font-size: 0.9rem;
    font-weight: 200;
    font-style: italic;
    max-width: 600px;
    line-height: 1.5rem;
    color: rgb(143, 143, 143);
`
interface Props {
    visible: boolean;
}
const DrgGroupDetails = ({ visible } : Props) => {
  return (
    <Frame vis={visible}>
        <h1>DRG Group Details</h1>
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
            <H1>DesignRunGroup</H1>
            <P>
                To comply with my non-disclosure agreement, 
                I have omitted and obfuscated confidential 
                information in this case study. All information 
                in this case study is my own and does not necessarily 
                reflect the views of DesignRun.org.
            </P>
            <Caption>Summary</Caption>
            <P>
            DesignRun
            </P>
        </Summary>
    </Frame>
  )
}

export default DrgGroupDetails
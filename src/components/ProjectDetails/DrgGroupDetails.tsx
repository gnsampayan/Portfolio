import styled from "styled-components";
import DRGGroupVis from '../../assets/DrgGroupVid.mp4';
import Wordmard from '../../assets/drg_branding.png';
import Screenshot from '../../assets/drg_sample_page.png';

const Frame = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 60px 0px 60px 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 40px;
    overflow: auto;
    /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
    &::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for other browsers */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
`
const Heading = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px;
    align-items: center;
    justify-content: center;
`
const Scope = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
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
`
const Line = styled.div`
    border-top: 1px solid rgb(143, 143, 143);
    width: 40px;
    height: 1px;
    margin-left: 6px;
    margin-right: 6px;
    transform: translateY(-8px);
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
const A = styled.a`
    all: unset;
    text-decoration: none;
    width: fit-content;
    padding: 10px 20px;
    border-radius: 3px;
    color: #40cd47;
    background: white;
    outline: 1px solid #40cd47;
    cursor: pointer;
    &:hover {
        color: white;
        background: #40cd47;
        outline: none;
    }
`
const Video = styled.video`
    height: 300px;
    transition: all 1s ease;
    box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
    z-index: 2;
    @media only screen and (max-width: 768px) {
        width: calc(100vw - 80px);
    }
`
const Image = styled.img`
    width: 100%;
    max-width: 600px;
    box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
`
const End = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const VerticalLine = styled.div`
    height: 40px;
    width: 1px;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 6px;
`
const SmallBlobAnimation = styled.div`
    height: 10px;
    width: 10px;
    animation: 3s ease-in-out 0s infinite colorShifter1;
    @keyframes colorShifter1 {
    25% { transform: rotate(90deg); }
    40% { background-color: #438dff; }
    50% { background-color: #40cd47; transform: rotate(90deg); }
    60% { background-color: #438dff; }
    75% { transform: rotate(90deg); }
    100% { transform: rotate(90deg); }
  }
  @keyframes colorShifter2 {
    25% { transform: scale(1.1); }
    40% { background-color: rgb(255, 208, 0); }
    50% { background-color: #40cd47; transform: scale(1); }
    60% { background-color: rgb(255, 208, 0); }
    75% { transform: scale(0.9); }
    100% { transform: scale(1); }
  }
  @keyframes colorShifter3 {
    25% { transform: skew(25deg); }
    40% { border-bottom: 10px solid #f6543c; }
    50% { border-bottom: 10px solid #40cd47; transform: skew(0deg); }
    60% { border-bottom: 10px solid #f6543c; }
    75% { transform: skew(-25deg); }
    100% { transform: skew(0deg); }
  }
`

const DrgGroupDetails = () => {
  return (
    <Frame>
        <Heading>
            <Scope>
                <Caption>Scope</Caption>
                <P>Art Direction,<br/>UX/UI,<br/>Web development</P>
            </Scope>
            <Summary>
                <Top>
                    <Caption>Website</Caption>
                    <Line/>
                    <Caption>2019</Caption>
                </Top>
                <H1>Design Run Group</H1>
                <P>
                    To comply with my non-disclosure agreement, 
                    I have omitted and obfuscated confidential 
                    information in this case study. All information 
                    in this case study is my own and does not necessarily 
                    reflect the views of DesignRun.org.
                </P>
                <Caption>Summary</Caption>
                <P>
                DesignRun.org is a healthcare startup and non-profit organization 
                that aims to establish a strong brand identity and digital presence 
                to reach its target audience of current and future investors, 
                clients, and partners. The challenge was to create a minimalist 
                and subtle brand identity, user-friendly interface, and smooth user 
                experience with limited resources and time. Despite these constraints, 
                the team successfully delivered a website that effectively 
                communicated the company's mission and provided a seamless 
                experience for its users.
                </P>
                <A href="https://www.designrungroup.com/" target="_blank">Visit Site</A>
            </Summary>
        </Heading>
        <Video src={DRGGroupVis} autoPlay loop muted />
        <Image src={Wordmard}/>
        <Image src={Screenshot}/>
        <End>
            <VerticalLine/>
            <SmallBlobAnimation />
        </End>
    </Frame>
  )
}

export default DrgGroupDetails
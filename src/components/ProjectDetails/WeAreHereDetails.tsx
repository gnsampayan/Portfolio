import styled from "styled-components";
import WeAreHereVideo from '../../assets/WeAreHere.mp4';
import Image1 from '../../assets/drg1.png';

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
const PBody = styled.p`
    clear: both;
    font-family: halyard-text, sans-serif;
    font-size: 0.9rem;
    font-weight: 200;
    font-style: normal;
    max-width: 600px;
    line-height: 1.5rem;
    color: rgb(0, 0, 0);
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
const WeAreHereDetails = () => {
  return (
    <Frame>
        <Heading>
            <Scope>
                <Caption>Scope</Caption>
                <P>Full Stack Dev,<br/>UX/UI</P>
            </Scope>
            <Summary>
                <Top>
                    <Caption>Website</Caption>
                    <Line/>
                    <Caption>2021</Caption>
                </Top>
                <H1>We Are Here</H1>
                <P>
                    To comply with my non-disclosure agreement, 
                    I have omitted and obfuscated confidential 
                    information in this case study. All information 
                    in this case study is my own and does not necessarily 
                    reflect the views of DesignRun.org.
                </P>
                <Caption>Summary</Caption>
                <PBody>
                    "Here" is a healthcare startup that provides resources 
                    and support to individuals affected by cancer. 
                    The project involved the development of a professional 
                    website that offered a minimalist design, smooth user 
                    experience, and secure payment transactions. The 
                    website was built using Webflow for HTML, CSS, and 
                    JavaScript, a content management system (CMS) for 
                    ease of maintenance, and domain hosting for reliable 
                    access. The backend was automated using Zapier and 
                    payment transactions were handled using the Stripe 
                    API. The end result was a successful website that 
                    met the client's needs and aimed to have a positive 
                    impact on those affected by cancer.
                </PBody>
                <A href="https://www.wearehere.com/" target="_blank">Visit Site</A>
            </Summary>
        </Heading>
        <Video src={WeAreHereVideo} autoPlay loop muted />
        <Image src={Image1}/>
        <Image src={Image1}/>
        <End>
            <VerticalLine/>
            <SmallBlobAnimation />
        </End>
    </Frame>
  )
}

export default WeAreHereDetails
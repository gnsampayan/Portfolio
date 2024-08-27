import styled from "styled-components";
import SpanningVideo from '../../assets/spanning-o365.mp4';
import Image1 from '../../assets/Dash1.png';
import Image2 from '../../assets/email1.png';
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useEffect, useRef } from "react";

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
    cursor: pointer;
    color: white;
    background: black;
    outline: none;
    &:hover {
        color: black;
        background: white;
        outline: 1px solid black;
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
const Images = styled.div`
    display: flex;
`
const ImageDash = styled.img`
    width: 350px;
    box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
`
const ImageEmail = styled.img`
    width: 460px;
    box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
    margin-right: 20px;
`

const SpanningDetails = () => {
    const { boxInView } = useControlPanel();
    const myDivRef = useRef<HTMLDivElement>(null);

    const resetScroll = () => {
        if (myDivRef.current) {
            myDivRef.current.scrollTop = 0; // Reset scroll to the top
        }
    };
    useEffect(() => {
        if (boxInView !== 7) {
            setTimeout(() => {
                resetScroll();
            }, 1000)
        }
    }, [boxInView]);
    return (
        <Frame ref={myDivRef}>
            <Heading>
                <Scope>
                    <Caption>Scope</Caption>
                    <P>
                        UX/UI,
                        <br />
                        Graphic Design
                    </P>
                    <Caption>Links</Caption>
                    <A href="https://www.spanning.com/" target="_blank">
                        Visit Site
                    </A>
                </Scope>
                <Summary>
                    <Top>
                        <Caption style={{ textTransform: "uppercase" }}>Web app</Caption>
                        <Line />
                        <Caption>2019</Caption>
                    </Top>
                    <H1>Spanning Cloud Apps</H1>
                    <P>
                        To comply with my non-disclosure agreement, I have omitted and
                        obfuscated confidential information in this case study. All
                        information in this case study is my own and does not necessarily
                        reflect the views of Spanning Cloud Apps.
                    </P>
                    <Caption>Summary</Caption>
                    <PBody>
                        &nbsp;&nbsp;&nbsp;Spanning Cloud Apps is a SaaS solution that
                        provides data protection for Microsoft 365, G Suite, and
                        Salesforce, empowering administrators and users to restore lost
                        data with ease.
                        <br />
                        &nbsp;&nbsp;&nbsp;As part of an agile design team, I contributed
                        to the development of new features across all Spanning products.
                        Our team follows an iterative approach, releasing new features in
                        small chunks and typically completing each block within two weeks.
                        <br />
                        &nbsp;&nbsp;&nbsp;This case study showcases the type of work I was
                        involved in while working with the Spanning Cloud Apps team.
                    </PBody>
                </Summary>
            </Heading>
            <div>
                <Video src={SpanningVideo} autoPlay loop muted />
                <P style={{ paddingTop: "20px", width: "540px" }}>
                    Explore Spanning Cloud Apps for Office 360—watch as a user navigates
                    backup, restoration, file management, and activity tracking,
                    showcasing the platform’s robust functionality.
                </P>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Images style={{ display: 'flex', flexDirection: 'column' }}>
                    <ImageDash src={Image1} />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            paddingTop: "20px",
                        }}
                    >
                        <P>Dashboard</P>
                        <PBody style={{ width: "300px" }}>
                            Spanning Cloud Apps dashboard: Designed for intuitive navigation,
                            with customizable widgets that highlight key information and data,
                            empowering users to prioritize and manage resources efficiently
                            based on their unique needs.
                        </PBody>
                    </div>
                </Images>
                <Images
                    style={{
                        alignItems: "flex-end",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                        }}
                    >
                        <ImageEmail src={Image2} />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                width: "460px",
                                paddingRight: "20px",
                                paddingTop: "20px",
                            }}
                        >
                            <P>Daily Email Summary</P>
                            <PBody>
                                Daily email backup summary: Delivered in a clean, well-organized
                                format, this summary provides users with a clear and concise
                                overview of their backup status. The design ensures that
                                essential information is easily accessible, allowing users to
                                quickly grasp the health of their data backups. With a focus on
                                clarity and usability, this summary helps users stay informed
                                and confident in the security of their critical data.
                            </PBody>
                        </div>
                    </div>
                </Images>

            </div>

            <End>
                <VerticalLine />
                <SmallBlobAnimation />
            </End>
        </Frame>
    );
}

export default SpanningDetails
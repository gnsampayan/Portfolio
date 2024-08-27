import styled from "styled-components";
import DRGGroupVid from "../../assets/DrgGroupVid.mp4";
import Screenshot1 from "../../assets/drg1.png";
import Screenshot2 from "../../assets/drg2.png";
import Logo1 from "../../assets/drg_logo_v1.svg";
import Logo2 from "../../assets/drg_logo_v2.svg";
import { useEffect, useRef } from "react";
import { useControlPanel } from "../Contexts/ControlPanelContext";

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
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
`;
const Heading = styled.div`
	display: flex;
	flex-direction: row;
	gap: 40px;
	align-items: center;
	justify-content: center;
`;
const Scope = styled.div`
	display: flex;
	flex-direction: column;
	text-align: right;
    align-items: flex-end;
`;
const Caption = styled.p`
	font-family: halyard-text, sans-serif;
	font-size: 1.1rem;
	font-weight: 200;
	color: rgb(143, 143, 143);
	float: left;
`;
const Summary = styled.div`
	display: flex;
	flex-direction: column;
`;
const Top = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const Line = styled.div`
	border-top: 1px solid rgb(143, 143, 143);
	width: 40px;
	height: 1px;
	margin-left: 6px;
	margin-right: 6px;
	transform: translateY(-8px);
`;
const H1 = styled.h1`
	clear: both;
	font-family: halyard-display, sans-serif;
	font-size: 3rem;
	font-weight: 400;
	margin-top: -10px;
`;
const P = styled.p`
	clear: both;
	font-family: halyard-text, sans-serif;
	font-size: 0.9rem;
	font-weight: 200;
	font-style: italic;
	max-width: 600px;
	line-height: 1.5rem;
	color: rgb(143, 143, 143);
`;
const PBody = styled.p`
	clear: both;
	font-family: halyard-text, sans-serif;
	font-size: 0.9rem;
	font-weight: 200;
	font-style: normal;
	max-width: 600px;
	line-height: 1.5rem;
	color: rgb(0, 0, 0);
`;
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
`;
const Video = styled.video`
	height: 300px;
	transition: all 1s ease;
	box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
	z-index: 2;
	@media only screen and (max-width: 768px) {
        width: calc(100vw - 80px);
	}
`;
const Logo1Div = styled.img`
	position: absolute;
    left: 0;
    top: 0;
    height: auto;
	width: 400px;
    transition: opacity 1s ease;
    opacity: 1;
    &:hover {
        opacity: 0;
    }
    
    &:hover + img {
        opacity: 1;
    }
    z-index: 999;
    `;
const Logo2Div = styled.img`
	position: absolute;
    left: 0;
    top: 0;
    height: auto;
	width: 400px;
    opacity: 0;
    transition: opacity 1s ease;
    z-index: 1;
`;
const Image1 = styled.img`
	position: absolute;
    right: 0;
    top: 0;
	width: auto;
    height: 600px;
	max-width: 600px;
    transition: opacity 1s ease;
    opacity: 1;
    &:hover {
        opacity: 0;
    }
    
    &:hover + img {
        opacity: 1;
    }
    z-index: 999;
	box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
`;
const Image2 = styled.img`
	position: absolute;
    right: 0;
    top: 0;
	width: auto;
    height: 600px;
    opacity: 0;
    transition: opacity 1s ease;
	box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
    z-index: 9;
`;
const Examples = styled.div`
    width: 100%;
`
const ImageOverlap = styled.div`
    position: relative;
    display: block;
    height: 600px;
    width: 400px;
    z-index: 999;
`;
const LogoOverlap = styled.div`
    position: relative;
    padding: 1px;
`;
const End = styled.div`
    position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const VerticalLine = styled.div`
	height: 40px;
	width: 1px;
	border-left: 1px solid rgba(0, 0, 0, 0.2);
	margin-bottom: 6px;
`;
const SmallBlobAnimation = styled.div`
	height: 10px;
	width: 10px;
	animation: 3s ease-in-out 0s infinite colorShifter1;
	@keyframes colorShifter1 {
		25% {
			transform: rotate(90deg);
		}
		40% {
			background-color: #438dff;
		}
		50% {
			background-color: #40cd47;
			transform: rotate(90deg);
		}
		60% {
			background-color: #438dff;
		}
		75% {
			transform: rotate(90deg);
		}
		100% {
			transform: rotate(90deg);
		}
	}
	@keyframes colorShifter2 {
		25% {
			transform: scale(1.1);
		}
		40% {
			background-color: rgb(255, 208, 0);
		}
		50% {
			background-color: #40cd47;
			transform: scale(1);
		}
		60% {
			background-color: rgb(255, 208, 0);
		}
		75% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes colorShifter3 {
		25% {
			transform: skew(25deg);
		}
		40% {
			border-bottom: 10px solid #f6543c;
		}
		50% {
			border-bottom: 10px solid #40cd47;
			transform: skew(0deg);
		}
		60% {
			border-bottom: 10px solid #f6543c;
		}
		75% {
			transform: skew(-25deg);
		}
		100% {
			transform: skew(0deg);
		}
	}
`;

const DrgGroupDetails = () => {
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
        <>
            <Frame ref={myDivRef}>
                <Heading>
                    <Scope>
                        <Caption>Scope</Caption>
                        <P>
                            Art Direction,
                            <br />
                            UX/UI,
                            <br />
                            Web Design,
                            <br />
                            Front-End Development
                        </P>
                        <Caption>Links</Caption>
                        <A href="https://www.designrungroup.com/" target="_blank">
                            Visit Site
                        </A>
                    </Scope>
                    <Summary>
                        <Top>
                            <Caption>WEBSITE</Caption>
                            <Line />
                            <Caption>2023</Caption>
                        </Top>
                        <H1>Design Run Group</H1>
                        <P>
                            To comply with my non-disclosure agreement, I have omitted and
                            obfuscated confidential information in this case study. All
                            information in this case study is my own and does not
                            necessarily reflect the views of DesignRun Group.
                        </P>
                        <Caption>Summary</Caption>
                        <PBody>
                            &nbsp;&nbsp;&nbsp;DesignRun.org is a healthcare startup and
                            non-profit organization that aims to establish a strong brand
                            identity and digital presence to reach its target audience of
                            current and future investors, clients, and partners.
                            <br />
                            &nbsp;&nbsp;&nbsp;The challenge was to create a minimalist and
                            subtle brand identity, user-friendly interface, and smooth user
                            experience with limited resources and time.
                            <br />
                            &nbsp;&nbsp;&nbsp;Despite these constraints, the team
                            successfully delivered a website that effectively communicated
                            the company's mission and provided a seamless experience for its
                            users.
                        </PBody>
                    </Summary>
                </Heading>
                <div>
                    <Video src={DRGGroupVid} autoPlay loop muted />
                    <P style={{ paddingTop: "20px" }}>
                        Experience the bold, innovative design of the DesignRun Group site
                        in action.
                    </P>
                </div>
                <Examples style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <LogoOverlap>
                            <Logo1Div src={Logo1} />
                            <Logo2Div src={Logo2} />
                        </LogoOverlap>
                        <P style={{ paddingTop: "20px", marginTop: "80px" }}>
                            Wordmark.
                        </P>
                        <PBody style={{ width: '400px' }}>
                            A dynamic wordmark that expertly balances professionalism and
                            creativity, shifting tones between bold black and vibrant color
                            to embody the essence of DesignRun Group.
                        </PBody>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <ImageOverlap>
                                <Image1 src={Screenshot1} />
                                <Image2 src={Screenshot2} />
                            </ImageOverlap>
                            <div>
                                <P style={{ paddingTop: '20px' }}>
                                    Dual-view interactive slider.
                                </P>
                                <PBody style={{ width: "400px" }}>
                                    Explore the interactive dual-view slider, where content shifts
                                    dynamically between two dimensions. Sliding left or right
                                    reveals interconnected narratives, illustrating how DesignRun
                                    Group's design seamlessly integrates multiple perspectives
                                    into a cohesive user experience.
                                </PBody>
                            </div>
                        </div>
                    </div>
                </Examples>
                <End>
                    <VerticalLine />
                    <SmallBlobAnimation />
                </End>
            </Frame>
        </>
    );
};

export default DrgGroupDetails;

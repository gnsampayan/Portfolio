import styled from "styled-components";
import DRGGroupVid from "../../assets/DrgGroupVid.mp4";
import Screenshot1 from "../../assets/drg1.png";
import Screenshot2 from "../../assets/drg2.png";
import Logo1 from "../../assets/drg_logo_v1.svg";
import Logo2 from "../../assets/drg_logo_v2.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import { RiArrowLeftSLine, RiArrowRightSLine, RiCloseLargeFill, RiExpandDiagonalFill } from "react-icons/ri";

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

const Frame = styled.div`
    width: 100vw;
    height: 100vh;
    padding: calc(50vh - 200px) 0px 60px 0px;
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
const Padded = styled.div`
    padding-left: 360px;
    width: 100vw;
`
const VideoWrapper = styled.div`
	position: relative;
	height: 300px;
    width: 534px;
	overflow: hidden;
	transition: all 0.3s ease;
	z-index: 3;
`;

const HoverText = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 2rem;
	color: white;
	opacity: 0;
	transition: opacity 0.3s ease;
	pointer-events: none;
	z-index: 4;

	${VideoWrapper}:hover & {
		opacity: 1;
	}
`;

const Video = styled.video`
	height: 100%;
	width: auto;
	transition: all 0.3s ease;
    border: 1px solid black;
	z-index: 2;
    cursor: pointer;
	@media only screen and (max-width: 768px) {
		width: calc(100vw - 80px);
	}
	${VideoWrapper}:hover & {
		filter: brightness(0.5);
	}
`;

const Modal = styled.div<{ isOpen: boolean }>`
	display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	padding-left: 360px;
	background-color: rgba(0, 0, 0, 0.9);
	justify-content: center;
	align-items: center;
	z-index: 999;
`;

const ModalContent = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 20px;
	position: relative;
    max-height: 100vh;
    overflow-y: hidden;
`;

const ModalVideo = styled.video`
	width: 100%;
	height: auto;
	max-width: 1000px;
	z-index: 2;
`;

const ModalImage = styled.img`
	width: 100%;
	height: auto;
	max-width: 1000px;
	z-index: 2;
`;

const Arrow = styled.div`
	font-size: 2rem;
	color: white;
	cursor: pointer;
	margin: 0 10px;
	z-index: 3; 
`;

const Breadcrumbs = styled.div`
	position: absolute;
	bottom: 20px;
	display: flex;
	justify-content: center;
	gap: 8px;
	width: 100%;
	z-index: 4;
`;

const BreadcrumbDot = styled.div<{ isActive: boolean }>`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: ${({ isActive }) => (isActive ? 'white' : 'gray')};
	cursor: pointer;
	transition: background-color 0.3s ease;
`;

const Close = styled.button`
	all: unset;
	position: absolute;
	top: 40px;
	right: 40px;
	color: white;
	cursor: pointer;
`;

const Logo1Div = styled.img`
	position: absolute;
	left: 20px;
	top: 20px;
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
	left: 20px;
	top: 20px;
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
`;

const Image2 = styled.img`
	position: absolute;
	right: 0;
	top: 0;
	width: auto;
	height: 600px;
	opacity: 0;
	transition: opacity 1s ease;
	z-index: 9;
`;

const Examples = styled.div`
	width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 20px;
`;

const ImageOverlap = styled.div`
	position: relative;
	display: block;
	height: 602px;
	width: 402px;
	z-index: 9;
    outline: 1px solid black;
    cursor: pointer;
`;

const LogoOverlap = styled.div`
	position: relative;
    width: 442px;
    height: 122px;
    background: white;
    border: 1px solid black;
    cursor: default;
    &:focus {
        cursor: not-allowed;
    }
    &:active {
        cursor: not-allowed;
    }
`;

const End = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    padding-top: 60px;
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
`;


const DrgGroupDetails = () => {
    const { boxInView } = useControlPanel();
    const myDivRef = useRef<HTMLDivElement>(null);
    const { isModalOpen, setModalOpen } = useNavContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const galleryItems = [Screenshot1, Screenshot2, DRGGroupVid];

    const resetScroll = () => {
        if (myDivRef.current) {
            myDivRef.current.scrollTop = 0; // Reset scroll to the top
        }
    };

    useEffect(() => {
        if (boxInView !== 7) {
            setTimeout(() => {
                resetScroll();
            }, 1000);
        }
    }, [boxInView]);

    const handleOpenModal = (index: number) => {
        setCurrentIndex(index);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
    }, [galleryItems.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryItems.length) % galleryItems.length);
    }, [galleryItems.length]);

    const handleBreadcrumbClick = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isModalOpen) {
                if (event.key === "ArrowRight") {
                    handleNext();
                } else if (event.key === "ArrowLeft") {
                    handlePrev();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isModalOpen, handleNext, handlePrev]);

    return (
        <Frame ref={myDivRef}>
            <Padded>
                {/* Modal for Image and Video Carousel */}
                <Modal isOpen={isModalOpen}>
                    <ModalContent>
                        <Arrow onClick={handlePrev}><RiArrowLeftSLine /></Arrow>
                        {currentIndex === 2 ? (
                            <ModalVideo src={galleryItems[currentIndex]} controls autoPlay />
                        ) : (
                            <ModalImage src={galleryItems[currentIndex]} />
                        )}
                        <Arrow onClick={handleNext}><RiArrowRightSLine /></Arrow>
                        {/* Breadcrumbs for Gallery Navigation */}
                        <Breadcrumbs>
                            {galleryItems.map((_, index) => (
                                <BreadcrumbDot
                                    key={index}
                                    isActive={index === currentIndex}
                                    onClick={() => handleBreadcrumbClick(index)}
                                />
                            ))}
                        </Breadcrumbs>
                    </ModalContent>
                    <Close onClick={handleCloseModal}><RiCloseLargeFill /></Close>
                </Modal>

                {/* Page Content */}
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
                        <H1>Designrun Group</H1>
                        <P>
                            To comply with my non-disclosure agreement, I have omitted and obfuscated confidential information in this case study. All information in this case study is my own and does not necessarily reflect the views of DesignRun Group.
                        </P>
                        <Caption>Summary</Caption>
                        <PBody>
                            DesignRun.org is a healthcare startup and non-profit organization that aims to establish a strong brand identity and digital presence to reach its target audience of current and future investors, clients, and partners.
                            <br />
                            The challenge was to create a minimalist and subtle brand identity, user-friendly interface, and smooth user experience with limited resources and time.
                            <br />
                            Despite these constraints, the team successfully delivered a website that effectively communicated the company's mission and provided a seamless experience for its users.
                        </PBody>
                    </Summary>
                </Heading>
                <Examples style={{ marginTop: '60px' }}>
                    <div>
                        <LogoOverlap>
                            <Logo1Div src={Logo1} />
                            <Logo2Div src={Logo2} />
                        </LogoOverlap>
                        <P style={{ paddingTop: "20px" }}>Wordmark.</P>
                        <PBody style={{ width: '400px' }}>
                            A dynamic wordmark that expertly balances professionalism and creativity, shifting tones between bold black and vibrant color to embody the essence of DesignRun Group.
                        </PBody>
                    </div>
                    <div>
                        <ImageOverlap onClick={() => handleOpenModal(0)}>
                            <Image1 src={Screenshot1} />
                            <Image2 src={Screenshot2} />
                        </ImageOverlap>
                        <P style={{ paddingTop: "20px" }}>Dual-view interactive slider.</P>
                        <PBody style={{ width: "400px" }}>
                            Explore the interactive dual-view slider, where content shifts dynamically between two dimensions. Sliding left or right reveals interconnected narratives, illustrating how DesignRun Group's design seamlessly integrates multiple perspectives into a cohesive user experience.
                        </PBody>
                    </div>
                </Examples>
                <div>
                    <VideoWrapper>
                        <Video onClick={() => handleOpenModal(2)} src={DRGGroupVid} autoPlay loop muted />
                        <HoverText><RiExpandDiagonalFill /></HoverText>
                    </VideoWrapper>
                    <P style={{ paddingTop: "20px" }}>
                        Experience the bold, innovative design of the DesignRun Group site in action.
                    </P>
                </div>
                <End>
                    <VerticalLine />
                    <SmallBlobAnimation />
                </End>
            </Padded>
        </Frame>
    );
};

export default DrgGroupDetails;
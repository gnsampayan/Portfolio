import styled from "styled-components";
import DrgOrg from '../../assets/designrun.mp4';
import Wordmard from '../../assets/drg_branding.png';
import Screenshot from '../../assets/drg_sample_page.png';
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavContext } from "../Contexts/NavContext";
import { RiArrowLeftSLine, RiArrowRightSLine, RiCloseLargeFill } from "react-icons/ri";

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
    align-items: flex-end;
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
    border: 1px solid black;
    z-index: 2;
    @media only screen and (max-width: 768px) {
        width: calc(100vw - 80px);
    }
`
const Image = styled.img`
    width: 100vw;
`
const End = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
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
`;

const ModalVideo = styled.video`
    width: 100%;
    height: auto;
    max-width: 1000px;
    box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
    z-index: 2;
`;

const ModalImage = styled.img`
    width: 100%;
    height: auto;
    max-width: 1000px;
    box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
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

const DrgOrgDetails = () => {
    const { boxInView } = useControlPanel();
    const myDivRef = useRef<HTMLDivElement>(null);
    const { isModalOpen, setModalOpen } = useNavContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const galleryItems = [Wordmard, DrgOrg, Screenshot];

    const resetScroll = () => {
        if (myDivRef.current) {
            myDivRef.current.scrollTop = 0; // Reset scroll to the top
        }
    };
    useEffect(() => {
        if (boxInView !== 9) {
            setTimeout(() => {
                resetScroll();
            }, 1000)
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
            {/* Modal for Image and Video Carousel */}
            <Modal isOpen={isModalOpen}>
                <ModalContent>
                    <Arrow onClick={handlePrev}><RiArrowLeftSLine /></Arrow>
                    {currentIndex === 1 ? (
                        <ModalVideo src={galleryItems[currentIndex]} controls autoPlay />
                    ) : (
                        <ModalImage src={galleryItems[currentIndex]} />
                    )}
                    <Arrow onClick={handleNext}><RiArrowRightSLine /></Arrow>
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
            <Padded>
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
                        <A href="https://www.designrun.org/" target="_blank">
                            Visit Site
                        </A>
                    </Scope>
                    <Summary>
                        <Top>
                            <Caption style={{ textTransform: "uppercase" }}>Website</Caption>
                            <Line />
                            <Caption>2019</Caption>
                        </Top>
                        <H1>Designrun.org</H1>
                        <P>
                            To comply with my non-disclosure agreement, I have omitted and
                            obfuscated confidential information in this case study. All
                            information in this case study is my own and does not necessarily
                            reflect the views of DesignRun.org.
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
                            experience with limited resources and time. Despite these
                            constraints, the team successfully delivered a website that
                            effectively communicated the company's mission and provided a
                            seamless experience for its users.
                        </PBody>
                    </Summary>
                </Heading>
            </Padded>
            <div style={{ width: '100vw', display: 'flex', justifyContent: 'flex-end', marginTop: '60px' }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: 'flex-start',
                        gap: "20px",
                        flexDirection: 'column',
                    }}
                >
                    <Image src={Screenshot} />
                    <div style={{ paddingLeft: '360px' }}>
                        <P style={{ paddingTop: '20px' }}>Screen Shot</P>
                        <PBody style={{ width: "600px" }}>
                            A glimpse of DesignRun.org’s website: Highlighting the strategic
                            layout, refined typography, and cohesive color palette that
                            together create a seamless and engaging user experience.
                        </PBody>
                    </div>
                </div>
            </div>
            <Padded>
                {/* // this image */}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "flex-start",
                        gap: "20px",
                        marginBottom: '60px',
                        marginTop: '60px',
                    }}
                >
                    <Image onClick={() => handleOpenModal(0)} style={{ width: "400px", border: '1px solid black' }} src={Wordmard} />
                    <div>
                        <P style={{ paddingTop: '20px' }}>Brand Guide</P>
                        <PBody style={{ width: "260px" }}>
                            DesignRun.org's brand guide: Showcasing the carefully selected
                            typography, color palette, and wordmark that define the brand’s
                            minimalist and impactful visual identity.
                        </PBody>
                    </div>
                </div>
                {/* // and this video */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Video onClick={() => handleOpenModal(1)} src={DrgOrg} autoPlay loop muted />
                        <P style={{ paddingTop: "20px", width: "540px" }}>
                            Explore DesignRun.org’s minimalist design, thoughtful typography,
                            and strategic layout, all crafted to communicate the brand’s
                            mission.
                        </P>
                    </div>
                </div>
                <End>
                    <VerticalLine />
                    <SmallBlobAnimation />
                </End>
            </Padded>
        </Frame>
    );
}

export default DrgOrgDetails
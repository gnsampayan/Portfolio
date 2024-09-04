import styled, { keyframes } from "styled-components";
import useTypingEffect from "../hooks/useTypingEffect";
import { useNavContext } from "./Contexts/NavContext";
import { useControlPanel } from "./Contexts/ControlPanelContext";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "./Contexts/WindowSizeContext";


// Keyframes
const rotateAnimation = keyframes`
    25% {
        transform: rotate(90deg);
    }
    50% {
        transform: rotate(90deg);
    }
    75% {
        transform: rotate(90deg);
    }
    100% {
        transform: rotate(90deg);
    }
`;

const colorChangeAnimation = (startColor: string, endColor: string) => keyframes`
    40% {
        background-color: ${startColor};
    }
    50% {
        background-color: ${endColor};
    }
    60% {
        background-color: ${startColor};
    }
    `;

const skewAnimation = keyframes`
    25% {
        transform: skew(25deg);
    }
    50% {
        transform: skew(0deg);
    }
    75% {
        transform: skew(-25deg);
    }
    100% {
        transform: skew(0deg);
    }
    `;
const NavButton = styled.button<{
    $isActive: boolean;
    $isAnyButtonClicked: boolean;
    $invertion: boolean;
}>`
    all: unset;
    clear: both;
    color: ${(props) =>
        props.$isAnyButtonClicked
            ? (
                props.$isActive
                    ? (
                        props.$invertion
                            ? "white"
                            : "black"
                    )
                    : (
                        props.$invertion
                            ? "#898989"
                            : "#707070"
                    )
            )
            : (
                props.$invertion
                    ? "white"
                    : "black"
            )};
    &:hover {
        color: ${(props) => (props.$invertion ? "white" : "black")};
    }
    &:disabled {
        pointer-events: none;
    }
    background-color: none;
    text-decoration: none;
    transition: color 1s ease;
    white-space: nowrap;
    padding: 2px 10px 4px 10px;
    border-radius: 3px;
    background: none;
`;
const NavBox = styled.div<{
    $invertion: boolean;
}>`
	position: relative;
	background-color: none;
	width: 320px;
    height: 400px;
	border: 1px solid ${(props) => (props.$invertion ? "white" : "black")};
	transition: all 1s ease;
	border-radius: 3px;
	overflow: hidden;
	z-index: 999;
        
    &:hover {
        background: ${(props) => (props.$invertion ? 'none' : 'rgba(255, 255, 255, 0.6)')};
    }
    @media only screen and (max-width: 1250px) {
        width: 220px;
        height: 300px;
    }
    @media only screen and (max-width: 768px) {
        height: 100%;
        position: sticky;
        top: 0;
        &:hover .hover-target {
            height: 230px;
        }
        &:hover .footer-target {
            border-top: 1px solid ${(props) => props.$invertion ? 'white' : 'black'};
        }
    }
`;
const Header = styled.div<{ $invertion: boolean }>`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid ${(props) => props.$invertion ? 'white' : 'black'};
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    @media only screen and (max-width: 1250px) {
        padding: 0px 10px;
        height: 40px;
    }
`;
const Name = styled.button<{ $invertion: boolean }>`
    all: unset;
    text-decoration: none;
    color: ${(props) => props.$invertion ? 'white' : '#3a3a3a'};
    font-size: 1.5rem;
    font-family: halyard-display, sans-serif;
    font-style: normal;
    font-weight: 400;
    white-space: nowrap;
    &:hover {
        opacity: 60%;
    }
    &:disabled {
        pointer-events: none;
    }
    @media only screen and (max-width: 1250px) {
        font-size: 1rem;
    }
`;
const OrnamentsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media only screen and (max-width: 1250px) {
        scale: 0.6;
    }
`;
const Ornament = styled.div`
    height: 10px;
    width: 10px;
    margin-right: 10px;
`;
const Blue = styled(Ornament)`
    background-color: #438dff;
    animation: 3s ease-in-out 0s infinite ${rotateAnimation}, 3s ease-in-out 0s infinite ${colorChangeAnimation("#438dff", "#40cd47")};
`;
const Yellow = styled(Ornament)`
    background-color: #ffd000;
    border-radius: 100%;
    animation: 3s ease-in-out 0.1s infinite ${colorChangeAnimation("#ffd000", "#40cd47")};
`;
const Red = styled(Ornament)`
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top: 0;
    border-bottom: 10px solid #f6543c;
    animation: 3s ease-in-out 0.2s infinite ${skewAnimation};
`;
const Nav = styled.div<{
    $translate: number;
}>`
    width: 318px;
    height: 310px;
    transition: all 1s ease;
    transform: ${(props) => `translateX(${props.$translate}px)`};
    @media only screen and (max-width: 1250px) {
        height: 230px;
    }
`;
const MiddleWrapper = styled.div<{ $toggle: boolean }>`
    width: auto;
    height: auto;
    transition: all 1s ease;
    @media only screen and (max-width: 768px) {
        height: ${(props) => props.$toggle ? '230px' : '0px'};
        overflow: hidden;
    }
`
const Main = styled.div<{
    $isJustifiedLeft: boolean;
}>`
    position: absolute;
    right: 20px;
    width: auto;
    top: calc(50% - 40px);
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: ${(props) => props.$isJustifiedLeft ? 'flex-start' : 'flex-end'};
    transition: all 1s ease;
    
    @media only screen and (max-width: 1250px) {
        transform: translateX(-100px);
    }
`;
const Secondary = styled.div`
    position: absolute;
    left: 280px;
    top: calc(50% - 80px);
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    transition: all 1s ease;
    @media only screen and (max-width: 1250px) {
        transform: translateX(-100px);
    }
`;
const Work = styled.div`
    position: absolute;
    width: auto;
    height: auto;
    left: 90px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
`;
const Footer = styled.div<{ $invertion: boolean }>`
    width: 100%;
    height: 30px;
    bottom: 0;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-top: 1px solid ${(props) => props.$invertion ? 'white' : 'black'};
    transition: border-top 1s ease;
    @media only screen and (max-width: 768px) {
        border-top: none;
    }
`;
const Stream = styled.div<{ $invertion: boolean }>`
    color: ${(props) => props.$invertion ? '#b5b5b5' : '#3a3a3a'};
    padding-left: 10px;
    font-size: small;
    padding-top: 4px;
    padding-right: 10px;
    overflow: hidden;
    transition: color 1s ease;
    position: relative;
`;
const StreamText = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    direction: rtl;
`;
// Wrapper for the actual text to correct punctuation order
const LtrTextWrapper = styled.span`
  direction: ltr; /* Corrects punctuation order */
  display: inline-block; /* Keep text on one line */
`;

const DynamicNav = () => {
    const {
        activeMainButton,
        setActiveMainButton,
        activeSecondaryBtn,
        setActiveSecondaryBtn,
        isAnyButtonClicked,
        setIsAnyButtonClicked,
        onMoveList,
        MainBtnData,
        SecondaryBtnData,
        listTranslation,
        highlightedSecondaryNav,
        setHighlightedSecondaryNav,
        setButtonDisabled,
        isButtonDisabled,
        invertNav,
        setInvertNav,
        isModalOpen,
        setModalOpen,
    } = useNavContext();
    const { handleMove, changeOpacity, toggleClickability, boxInView, setBoxInView, toggleAnimation, handleReset } = useControlPanel();
    const currentText = useTypingEffect(100, 6000);
    const { width } = useWindowSize();
    const prevWidth = useRef(width);
    const [isTouched, setIsTouched] = useState(false);
    const touchRef = useRef<HTMLDivElement | null>(null);

    // Handle touch start
    const handleTouchStart = () => {
        setIsTouched(true);
    };

    // Handle touch end
    const handleTouchEnd = () => {
        setIsTouched(false);
    };

    // Add event listeners on mount and cleanup on unmount
    useEffect(() => {
        const element = touchRef.current;

        if (element) {
            element.addEventListener('touchstart', handleTouchStart);
            element.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            if (element) {
                element.removeEventListener('touchstart', handleTouchStart);
                element.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, []);

    useEffect(() => {
        if (
            (prevWidth.current <= 1250 && width > 1250) || // Crossed the 1250 threshold going up
            (prevWidth.current > 1250 && width <= 1250) || // Crossed the 1250 threshold going down
            (prevWidth.current <= 768 && width > 768) ||   // Crossed the 768 threshold going up
            (prevWidth.current > 768 && width <= 768)      // Crossed the 768 threshold going down
        ) {
            handleReset();
            setInvertNav(false);
        }

        prevWidth.current = width;
    }, [width]);

    useEffect(() => {
        if (isModalOpen) {
            setInvertNav(true);
        } else {
            setInvertNav(false);
        }
    }, [isModalOpen])

    const slideLeftAndReset = () => {
        if (boxInView !== -1) {
            toggleClickability(boxInView, false);
            if (![6, 7, 8, 9, 10].includes(boxInView)) {
                handleMove(boxInView, '-200vw', '0vh');
            } else {
                handleMove(boxInView, '-200vw', '-100vh');
            }
            setTimeout(() => {
                toggleAnimation(boxInView, false);
                handleReset([boxInView]);
            }, 1000);
        }
    };

    const slideInBox = (id: number) => {
        toggleClickability(id, true);
        if (id !== boxInView) {
            toggleAnimation(id, true);
            changeOpacity(id, 1);
            handleMove(id, '-100vw', '0');
            setBoxInView(id);
        }
    };

    const handleMainButtonClick = (buttonName: string) => {
        setIsAnyButtonClicked(true);
        setActiveMainButton(buttonName);
        toggleAnimation(11, true);
        setButtonDisabled(true);
        if (isModalOpen) {
            setModalOpen(false);
        }

        if (buttonName === MainBtnData[0].name) {
            onMoveList('left');
            if (width <= 1250) {
                handleMove(11, 'calc(-50vw + 130px)', '0');
            } else {
                handleMove(11, 'calc(-50vw + 180px)', '0');
            }
            if (boxInView === -1) {
                slideInBox(1);
                setBoxInView(1);
                setHighlightedSecondaryNav(0);
                toggleAnimation(1, true);
            } else if (boxInView === 12) {
                slideInBox(1);
                setBoxInView(1);
                setHighlightedSecondaryNav(0);
                toggleAnimation(1, true);
                handleMove(12, '0', '0');
            }
            else {
                setHighlightedSecondaryNav(boxInView - 1);
            }
        } else {
            setBoxInView(12);
            toggleAnimation(12, true);
            onMoveList('origin');
            handleMove(12, '100vw', '0');
            changeOpacity(12, 1);
            if (width <= 1250) {
                handleMove(11, 'calc(50vw - 130px)', '0');
            } else {
                handleMove(11, 'calc(50vw - 180px)', '0');
            }
            toggleAnimation(boxInView, true);
            if (boxInView !== 12) {
                handleMove(boxInView, '0', '0');
                setHighlightedSecondaryNav(-1);
            }
            if ([6, 7, 8, 9, 10].includes(boxInView)) {
                handleMove(boxInView, '100vw', '-100vh');
                setTimeout(() => {
                    toggleAnimation(boxInView, false);
                    handleReset([boxInView]);
                }, 1000)
            }
        }
        setTimeout(() => {
            setButtonDisabled(false);
        }, 1000)
    };

    const handleSecondaryButtonClick = (buttonName: string) => {
        const buttonIndex = SecondaryBtnData.findIndex(button => button.name === buttonName);
        const foldId = buttonIndex + 1;
        toggleAnimation(11, true);
        if (width <= 1250) {
            handleMove(11, 'calc(-50vw + 130px)', '0');
        } else {
            handleMove(11, 'calc(-50vw + 180px)', '0');
        }
        setIsAnyButtonClicked(true);
        setActiveSecondaryBtn(buttonName);
        setActiveMainButton(MainBtnData[0].name);
        toggleAnimation(foldId, true);
        if (isModalOpen) {
            setModalOpen(false);
        }
        if (foldId !== boxInView) {
            slideLeftAndReset();
            slideInBox(foldId);
            setButtonDisabled(true);
        }
        setTimeout(() => {
            setButtonDisabled(false);
            toggleAnimation(11, false);
        }, 1000);
    };

    const handleHomeButtonClick = () => {
        setActiveMainButton('');
        setActiveSecondaryBtn('');
        setIsAnyButtonClicked(false);
        setHighlightedSecondaryNav(-1);
        onMoveList('origin');
        setButtonDisabled(true);
        if (isModalOpen) {
            setModalOpen(false);
        }
        setTimeout(() => {
            setButtonDisabled(false);
        }, 1000)
    };
    const combinedHandler = () => {
        handleHomeButtonClick();
        setBoxInView(-1);
        toggleAnimation(11, true);
        toggleAnimation(boxInView, true);
        handleMove(11, '0', '0');
        handleMove(boxInView, '0', '0');

        const boxMappings: { [key: number]: number } = {
            6: 1,
            7: 2,
            8: 3,
            9: 4,
            10: 5
        };
        const foldId = boxMappings[boxInView];

        if (foldId !== undefined) {
            toggleAnimation(foldId, false);
            handleMove(boxInView, '100vw', '-100vh');
            handleMove(foldId, '100vw', '-100vh');
        }

        setTimeout(() => {
            toggleAnimation(boxInView, false);
            handleReset();
        }, 1000);
    };

    return (

        <NavBox $invertion={invertNav} ref={touchRef}>
            <Header className="header-target"
                $invertion={invertNav}
            >
                <Name
                    $invertion={invertNav}
                    onClick={combinedHandler}
                    disabled={isButtonDisabled}
                >
                    Glenn Sampayan
                </Name>
                <OrnamentsContainer>
                    <Blue />
                    <Yellow />
                    <Red />
                </OrnamentsContainer>
            </Header>
            <MiddleWrapper $toggle={isTouched} className="hover-target">
                <Nav $translate={listTranslation}>
                    <Main $isJustifiedLeft={highlightedSecondaryNav !== -1}>
                        {MainBtnData.map(button => (
                            <NavButton
                                key={button.name}
                                $invertion={invertNav}
                                $isActive={activeMainButton === button.name}
                                $isAnyButtonClicked={isAnyButtonClicked}
                                onClick={() => { handleMainButtonClick(button.name) }}
                                disabled={isButtonDisabled}
                            >
                                {button.name}
                            </NavButton>
                        ))}
                    </Main>
                    <Secondary>
                        <Work>
                            {SecondaryBtnData.map(button => (
                                <NavButton
                                    key={button.name}
                                    $invertion={invertNav}
                                    $isActive={activeSecondaryBtn === button.name}
                                    $isAnyButtonClicked={isAnyButtonClicked}
                                    onClick={() => { handleSecondaryButtonClick(button.name) }}
                                    disabled={isButtonDisabled}
                                >
                                    {button.name}
                                </NavButton>
                            ))}
                        </Work>
                    </Secondary>
                </Nav>
            </MiddleWrapper>
            <Footer className="footer-target" $invertion={invertNav}>
                <Stream $invertion={invertNav}>
                    <StreamText>
                        <LtrTextWrapper>
                            {currentText}
                        </LtrTextWrapper>
                    </StreamText>
                </Stream>
            </Footer>
        </NavBox>
    );
};

export default DynamicNav;

import styled, { keyframes } from "styled-components";
import useTypingEffect from "../hooks/useTypingEffect";
import { useNavContext } from "./Contexts/NavContext";
import { useControlPanel } from "./Contexts/ControlPanelContext";
import { useEffect, useState } from "react";
import { useDeviceContext } from "../hooks/deviceDetector";


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
const NavBox = styled.div<{
    $invertion: boolean;
    $mobile: boolean;
    $toggleVis: boolean;
}>`
	position: relative;
	background-color: none;
	width: ${(props) => (props.$mobile ? "100vw" : "320px")};
    height: 400px;
    ${(props) =>
        (props.$mobile && props.$toggleVis) ? `
            height: 200px;
        ` : '60px'
    };
	border: 1px solid ${(props) => (props.$invertion ? "white" : "black")};
	transition: border 1s ease;
	border-radius: 3px;
	overflow: hidden;
	z-index: 999;
        
	${(props) =>
        props.$mobile &&
        `
        height: 60px;
        &:hover {
            height: 200px;
        }
    `}
`;
const Header = styled.div<{ $invertion: boolean }>`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid ${(props) => props.$invertion ? 'white' : 'black'};
    box-sizing: border-box;
`;
const Name = styled.button<{ $invertion: boolean }>`
    all: unset;
    text-decoration: none;
    color: ${(props) => props.$invertion ? 'white' : '#3a3a3a'};
    margin-top: 0;
    position: relative;
    font-size: 1.5rem;
    margin-left: 20px;
    top: 16px;
    font-family: halyard-display, sans-serif;
    font-style: normal;
    font-weight: 400;
    &:hover {
        opacity: 60%;
    }
    &:disabled {
        pointer-events: none;
	}
`;
const OrnamentsContainer = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 20px;
    height: 20px;
    width: 60px;
    right: 20px;
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
    $translate: string;
    $mobile: boolean;
}>`
    width: 318px;
    height: ${(props) => props.$mobile ? '110px' : '310px'};
    transition: all 1s ease;
    transform: ${(props) => props.$translate};
`;
const Main = styled.div<{
    $isJustifiedLeft: boolean;
    $mobile: boolean;
}>`
    position: absolute;
    right: ${(props) => props.$mobile ? 'unset' : '20px'};
    left: ${(props) => props.$mobile ? '20px' : 'unset'};
    width: auto;
    top: ${(props) => props.$mobile ? 'unset' : 'calc(50% - 40px)'};
    bottom: ${(props) => props.$mobile ? '20px' : 'unset'};
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: ${(props) => props.$isJustifiedLeft ? 'flex-start' : 'flex-end'};
`;
const Secondary = styled.div<{
    $mobile: boolean
}>`
    position: absolute;
    left: ${(props) => props.$mobile ? '20px' : '294px'};
    top: ${(props) => props.$mobile ? '20px' : 'calc(50% - 80px)'};
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
`;
const Work = styled.div<{
    $mobile: boolean;
}>`
    position: absolute;
    width: auto;
    height: auto;
    left: ${(props) => props.$mobile ? '0px' : '90px'};
    display: flex;
    flex-direction: ${(props) => props.$mobile ? 'row' : 'column'};
    align-items: flex-end;
    justify-content: flex-end;
    gap: ${(props) => props.$mobile ? '7px' : 'none'};
`;
const NavButton = styled.button<{
    $isActive: boolean;
    $isAnyButtonClicked: boolean;
    $invertion: boolean;
    $hiddenForMobile: boolean;
    $mobile: boolean;
}>`
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
                            ? "#979797"
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
	border: ${(props) => props.$mobile ? '1px solid black' : 'none'};
	text-decoration: none;
	background: none;
	transition: color 1s ease;
	display: ${(props) => (props.$hiddenForMobile ? "none" : "block")};
    pointer-events: ${(props) => (props.$hiddenForMobile ? "none" : "auto")};
	white-space: nowrap;
    padding: ${(props) => props.$mobile ? '2px 10px 4px 10px' : 'none'};
    border-radius: ${(props) => props.$mobile ? '3px' : 'none'};
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
`;
const Stream = styled.p<{ $invertion: boolean }>`
    color: ${(props) => props.$invertion ? '#b5b5b5' : '#3a3a3a'};
    padding-left: 10px;
    font-size: small;
    padding-top: 4px;
    transition: color 1s ease;
`;

const DynamicNav = () => {
    const { isMobile, windowResized } = useDeviceContext();
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
    const [mobileShowNav, setMobileShowNav] = useState<boolean>(false);
    const currentText = useTypingEffect(100, 6000);

    useEffect(() => {
        const resetAppStates = () => {
            if (windowResized) {
                combinedHandler();
            }
        }
        resetAppStates();
    }, [windowResized]);

    useEffect(() => {
        const handleNavColorOnModalView = () => {
            if (isModalOpen) {
                setInvertNav(true);
            } else {
                setInvertNav(false);
            }

        }
        handleNavColorOnModalView();
    }, [isModalOpen])

    const slideLeftAndReset = () => {
        if (boxInView !== -1) {
            if (![6, 7, 8, 9, 10].includes(boxInView)) {
                handleMove(boxInView, '-200vw', '0vh');
            } else {
                handleMove(boxInView, '-200vw', '-100vh');
            }
            toggleClickability(boxInView);
            setTimeout(() => {
                toggleAnimation(boxInView, false);
                handleReset([boxInView]);
            }, 1000);
        }
    };

    const slideInBox = (id: number) => {
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
            if (boxInView === -1) {
                slideInBox(1);
                setBoxInView(1);
                handleMove(11, 'calc(-50vw + 180px)', '0');
                setHighlightedSecondaryNav(0);
                toggleAnimation(1, true);
            } else if (boxInView === 12) {
                slideInBox(1);
                setBoxInView(1);
                handleMove(11, 'calc(-50vw + 180px)', '0');
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
            handleMove(11, 'calc(50vw - 180px)', '0');
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
        const foldId = buttonIndex + 1; // Add 2 to align with your box ID logic
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

    const handleTouchStart = () => {
        setMobileShowNav(true);
    };

    const handleTouchEnd = () => {
        setMobileShowNav(false);
    };

    return (

        <NavBox $toggleVis={mobileShowNav} $mobile={isMobile} $invertion={invertNav}>
            <Header
                $invertion={invertNav}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
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
            <Nav className="hover-target" $mobile={isMobile} $translate={listTranslation} >
                <Main $mobile={isMobile} $isJustifiedLeft={highlightedSecondaryNav !== -1}>
                    {MainBtnData.map(button => (
                        <NavButton
                            key={button.name}
                            $invertion={invertNav}
                            $isActive={activeMainButton === button.name}
                            $isAnyButtonClicked={isAnyButtonClicked}
                            onClick={() => { handleMainButtonClick(button.name) }}
                            disabled={isButtonDisabled}
                            $hiddenForMobile={isMobile && (button.name === MainBtnData[0].name)}
                            $mobile={isMobile}
                        >
                            {button.name}
                        </NavButton>
                    ))}
                </Main>
                <Secondary $mobile={isMobile}>
                    <Work $mobile={isMobile}>
                        {SecondaryBtnData.map(button => (
                            <NavButton
                                key={button.name}
                                $invertion={invertNav}
                                $isActive={activeSecondaryBtn === button.name}
                                $isAnyButtonClicked={isAnyButtonClicked}
                                onClick={() => { handleSecondaryButtonClick(button.name) }}
                                disabled={isButtonDisabled}
                                $hiddenForMobile={false}
                                $mobile={isMobile}
                            >
                                {button.name}
                            </NavButton>
                        ))}
                    </Work>
                </Secondary>
            </Nav>
            <Footer $invertion={invertNav}>
                <Stream $invertion={invertNav}>{currentText}</Stream>
            </Footer>
        </NavBox>
    );
};

export default DynamicNav;

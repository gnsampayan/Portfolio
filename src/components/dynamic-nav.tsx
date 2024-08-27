import styled, { keyframes } from "styled-components";
import useTypingEffect from "../hooks/useTypingEffect";
import { useNavContext } from "./Contexts/NavContext";
import { useControlPanel } from "./Contexts/ControlPanelContext";
import { useState } from "react";


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
const NavBox = styled.div`
    position: relative;
    background-color: none;
    width: 320px;
    height: 400px;
    border: 1px solid black;
    border-radius: 3px;
    overflow: hidden;
    z-index: 999;
`;
const Header = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid black;
    box-sizing: border-box;
`;
const Name = styled.a`
    text-decoration: none;
    color: #3a3a3a;
    cursor: pointer;
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
const Nav = styled.div<{ translate: string }>`
    width: 100%;
    height: 310px;
    transition: 1s ease;
    transform: ${(props) => props.translate};
`;
const Main = styled.div`
    position: absolute;
    right: 20px; // + 8 to edge
    top: calc(50% - 40px);
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;
const Secondary = styled.div`
    position: absolute;
    left: 268px; // 288 is visual edge
    top: calc(50% - 80px);
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
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
const NavButton = styled.button<{isActive: boolean, isAnyButtonClicked: boolean}>`
  clear: both;
  color: ${(props) => props.isAnyButtonClicked ? (props.isActive ? 'black' : '#707070') : 'black'}; 
  &:hover {
    color: black;
  }
  &:disabled {
    cursor: progress;
  }
  background-color: none;
  border: none;
  text-decoration: none;
  background: none;
`;
const Footer = styled.div`
    width: 100%;
    height: 30px;
    bottom: 0;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-top: 1px solid black;
`;
const Stream = styled.p`
    color: #3a3a3a;
    padding-left: 10px;
    font-size: small;
    padding-top: 4px;
`;

const DynamicNav = () => {
    const { handleMove, changeOpacity, toggleClickability, boxInView, setBoxInView, toggleAnimation, handleReset } = useControlPanel();
    const [isSecondaryDisabled, setIsSecondaryDisabled] = useState<boolean>(false);
    const currentText = useTypingEffect(100, 6000); // Typing speed and pause time


    const slideOutAndReset = () => {
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
        setHighlightedSecondaryNav,
      } = useNavContext();

    const handleHomeButtonClick = () => {
        setActiveMainButton(null);
        setActiveSecondaryBtn(null);
        setIsAnyButtonClicked(true);
        setHighlightedSecondaryNav(null);
        onMoveList('origin');
    };

    const handleMainButtonClick = ( buttonName: string) => {
        setIsAnyButtonClicked(true);
        setActiveMainButton(buttonName);
        toggleAnimation(11, true);
        
        if (buttonName === 'Works') {
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
            }
            if ([6, 7, 8, 9, 10].includes(boxInView)) {
                handleMove(boxInView, '100vw', '-100vh');
                setTimeout(() => {
                    toggleAnimation(boxInView, false);
                    handleReset([boxInView]);
                }, 1000)
            }
        }
    };

    const handleSecondaryButtonClick = (buttonName: string) => {
        const buttonIndex = SecondaryBtnData.findIndex(button => button.name === buttonName);
        const matchingBoxId = buttonIndex + 1; // Add 2 to align with your box ID logic
        setIsAnyButtonClicked(true);
        setActiveSecondaryBtn(buttonName);
    
        if (buttonIndex !== -1) {
            toggleAnimation(matchingBoxId, true);
            
            // Disable buttons for 1 second
            if (matchingBoxId !== boxInView) {
                slideOutAndReset();
                slideInBox(matchingBoxId); 
                setIsSecondaryDisabled(true);
            }
            setTimeout(() => {
                setIsSecondaryDisabled(false);
            }, 1000);
        }
    };

    
    const combinedHandler = () => {
        handleHomeButtonClick();
        setBoxInView(-1);
        toggleAnimation(11, true);
        toggleAnimation(boxInView, true);
        handleMove(11, '0', '0');
        handleMove(boxInView, '0', '0');
    
        setTimeout(() => {
            handleReset();
        }, 1000);
    
        const boxMappings: { [key: number]: number } = {
            6: 1,
            7: 2,
            8: 3,
            9: 4,
            10: 5
        };
    
        const targetBox = boxMappings[boxInView];
        
        if (targetBox !== undefined) {
            toggleAnimation(targetBox, false);
            handleMove(boxInView, '100vw', '-100vh');
            handleMove(targetBox, '100vw', '-100vh');
    
            setTimeout(() => {
                toggleAnimation(boxInView, false);
                handleReset();
            }, 1000);
        }
    };
    
    
    

    return (
        
            <NavBox>
                <Header>
                    <Name onClick={combinedHandler}>Glenn Sampayan</Name>
                    <OrnamentsContainer>
                        <Blue />
                        <Yellow />
                        <Red />
                    </OrnamentsContainer>
                </Header>
                <Nav translate={listTranslation}>
                    <Main>
                        {MainBtnData.map(button => (
                            <NavButton
                                key={button.name}
                                isActive={activeMainButton === button.name}
                                isAnyButtonClicked={isAnyButtonClicked}
                                onClick={() => {handleMainButtonClick(button.name)}} >
                                {button.name}
                            </NavButton>
                        ))}
                    </Main>
                    <Secondary>
                        <Work>
                            {SecondaryBtnData.map(button => (
                                <NavButton
                                    key={button.name}
                                    isActive={activeSecondaryBtn === button.name}
                                    isAnyButtonClicked={isAnyButtonClicked}
                                    onClick={() => {handleSecondaryButtonClick(button.name);}}
                                    disabled={isSecondaryDisabled}
                                >
                                    {button.name}
                                </NavButton>
                            ))}
                        </Work>
                    </Secondary>
                </Nav>
                <Footer>
                    <Stream>{currentText}</Stream>
                </Footer>
            </NavBox>
    );
};

export default DynamicNav;

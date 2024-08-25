import styled, { keyframes } from "styled-components";
import useTypingEffect from "../hooks/useTypingEffect";
import { useNavContext } from "./Contexts/NavContext";


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

// Styled Components
const NavBounderies = styled.div`
    width: calc(100vw - 40px);
    height: calc(100vh - 40px);
    position: relative;
    background-color: none;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const NavBox = styled.div<{ position: string }>`
    background-color: none;
    width: 320px;
    height: 400px;
    border: 1px solid black;
    border-radius: 3px;
    transform: ${(props) => props.position};
    overflow: hidden;
    transition: 1s ease;
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
    right: 12px; // + 8 to edge
    top: 0;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
`;
const Secondary = styled.div`
    position: absolute;
    left: 280px; // 368 is to edge
    top: 0;
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
    const {
        activeMainButton,
        setActiveMainButton,
        activeSecondaryBtn,
        setActiveSecondaryBtn,
        isAnyButtonClicked,
        setIsAnyButtonClicked,
        navTranslation,
        onMoveNav,
        onMoveFold,
        onMoveList,
        MainBtnData,
        SecondaryBtnData,
        listTranslation,
        setTouchedFolds,
        setHighlightedSecondaryNav,
        setFoldVis,
        foldTranslation,
        setIsScrollEnabled,
      } = useNavContext();
    const currentText = useTypingEffect(100, 1000); // Typing speed and pause time

    const handleHomeButtonClick = () => {
        setActiveMainButton(null);
        setActiveSecondaryBtn(null);
        setIsAnyButtonClicked(true);
        setTouchedFolds([0,1,2,3,4]);
        onMoveFold('origin');
        onMoveNav('origin');
        console.log('handleHomeButtonClick triggered');
        console.log(foldTranslation);
        onMoveList('origin');
    };

    const handleMainButtonClick = ( buttonName: string) => {
        setIsScrollEnabled(false);
        setIsAnyButtonClicked(true);
        setActiveMainButton(buttonName);
        onMoveNav('left');
        onMoveList('left');
        setFoldVis(true);
        if (buttonName === "Works") {
            setHighlightedSecondaryNav(0);
            setTouchedFolds([0,1,2,3,4]);
            onMoveFold('center');
        }
        // Re-enable scroll handling after a delay
        setTimeout(() => {
            setIsScrollEnabled(true);
        }, 1000);  // Adjust the delay to match your transition duration
    };

    const handleSecondaryButtonClick = (buttonName: string) => {
        setActiveSecondaryBtn(buttonName);
    };


    return (
        <NavBounderies>
            <NavBox position={navTranslation}>
                <Header>
                    <Name onClick={() => { 
                        handleHomeButtonClick();
                    }}>Glenn Sampayan</Name>
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
                                onClick={() => {
                                    handleMainButtonClick(button.name);
                                }}
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
                                    isActive={activeSecondaryBtn === button.name}
                                    isAnyButtonClicked={isAnyButtonClicked}
                                    onClick={() => {
                                        handleSecondaryButtonClick(button.name);
                                    }}
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
        </NavBounderies>
    );
};

export default DynamicNav;

import { useState } from "react";
import styled, { keyframes } from "styled-components";
import useTypingEffect from "../hooks/useTypingEffect";
import { BsArrowLeft } from "react-icons/bs";


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
    background-color: rgba(255, 255, 255, .3);
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
    animation: 3s ease-in-out 0.1s infinite ${colorChangeAnimation("rgb(255, 208, 0)", "#40cd47")};
`;
const Red = styled(Ornament)`
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top: 0;
    border-bottom: 10px solid #f6543c;
    animation: 3s ease-in-out 0.2s infinite ${skewAnimation};
`;
const Nav = styled.div<{ position: string }>`
    width: 100%;
    height: 310px;
    transform: ${(props) => props.position};
    transition: 1s ease;
`;
const Main = styled.div<{ navAlign: string}>`
    position: absolute;
    top: calc(50% - 40px);
    right: 20px;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: ${(props) => props.navAlign};
`;
const Secondary = styled.div`
    position: absolute;
    left: 320px;
    top: 50%;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
`;
const Work = styled.div`
    position: absolute;
    width: auto;
    height: auto;
    top: calc(50% - 95px);
    left: 90px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;
const Tertiary = styled.div`
    position: absolute;
    left: 480px;
    top: calc(50% - 78px);
    visibility: hidden;
`;
const Design = styled.div`
    background-color: aliceblue;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
const Other = styled.div`
    background-color: #4e7699;
    position: absolute;
    top: calc(50% - 38px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
const NavButton = styled.button<{isActive: boolean, isAnyButtonClicked: boolean}>`
  clear: both;
  color: ${(props) => props.isAnyButtonClicked ? (props.isActive ? 'black' : '#707070') : 'black'}; 
  &:hover {
    color: black;
  }
  background-color: none;
  border: none;
  margin-bottom: 12px;
  text-decoration: none;
  background: none;
`;
const Footer = styled.div`
    position: absolute;
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

interface Props {
    onMove: (direction: string) => void;
    activeButton: string | null;
    setActiveButton: React.Dispatch<React.SetStateAction<string | null>>;
}
const buttonData = [
    { name: 'Design', direction: 'left' },
    { name: 'Beyond', direction: 'left' },
    { name: 'Websites', direction: 'left' },
    { name: 'Print', direction: 'left' },
    { name: 'Logos', direction: 'left' },
    { name: 'Typography', direction: 'left' },
    { name: 'Gallery', direction: 'left' },
    { name: 'Back', direction: 'center', icon: <BsArrowLeft /> }
];

const DynamicNav = ({ onMove, setActiveButton, activeButton }: Props) => {
    const [locationNavBox, setLocationNavBox] = useState('translateX(0)');
    const [locationNav, setLocationNav] = useState('translateX(0)');
    const currentText = useTypingEffect(100, 1000); // Typing speed and pause time
    const [flexAlignDir, setFlexAlignDir] = useState('flex-end');
    const [isAnyButtonClicked, setIsAnyButtonClicked] = useState(false);

    const handleButtonClick = (direction: string, buttonName: string) => {
        setActiveButton(buttonName);
        setIsAnyButtonClicked(true);
        const directionTranslations: { [key: string]: string } = {
          left: 'translateX(calc(-50vw + 200px))',
          center: 'translateX(0)',
        };
    
        const translation = directionTranslations[direction] || 'translateX(0)';
        setLocationNavBox(translation);
        onMove(direction);

        const navAlignDetector = (name: string) => {
            const flexStartNames = buttonData
                .filter(button => button.name !== "Back")
                .map(button => button.name);
                
            if (flexStartNames.includes(name)) {
                setFlexAlignDir('flex-start');
            } else {
                setFlexAlignDir('flex-end');
            };
        };
        navAlignDetector(buttonName);
      };
    

    const moveNav = (direction: string) => {
        const directionTranslations: { [key: string]: string } = {
            left: 'translateX(-210px)',
            right: 'translateX(210px)',
            center: 'translateX(0)',
        };

        const translation = directionTranslations[direction] || 'translateX(0)';
        setLocationNav(translation);
        console.log(`you clicked ${direction}`);
    };

    return (
        <NavBounderies>
            <NavBox position={locationNavBox}>
                <Header>
                    <Name onClick={() => { 
                        handleButtonClick('center', 'Home');
                        moveNav('center'); 
                        setIsAnyButtonClicked(false);
                    }}>Glenn Sampayan</Name>
                    <OrnamentsContainer>
                        <Blue />
                        <Yellow />
                        <Red />
                    </OrnamentsContainer>
                </Header>
                <Nav position={locationNav}>
                    <Main navAlign={flexAlignDir}>
                        {buttonData.slice(0, 2).map(button => (
                            <NavButton
                                key={button.name}
                                isActive={activeButton === button.name}
                                isAnyButtonClicked={isAnyButtonClicked}
                                onClick={() => {
                                    moveNav(button.direction);
                                    handleButtonClick(button.direction, button.name);
                                }}
                            >
                                {button.icon || button.name}
                            </NavButton>
                        ))}
                    </Main>
                    <Secondary>
                        <Work>
                            {buttonData.slice(2, -1).map(button => (
                                <NavButton
                                    key={button.name}
                                    isActive={activeButton === button.name}
                                    isAnyButtonClicked={isAnyButtonClicked}
                                    onClick={() => {
                                        moveNav(button.direction);
                                        handleButtonClick(button.direction, button.name);
                                    }}
                                >
                                    {button.icon || button.name}
                                </NavButton>
                            ))}
                        </Work>
                    </Secondary>
                    <Tertiary>
                        <Design>
                            {['DesignRun.org', 'Spanning', 'Here'].map(name => (
                                <NavButton
                                    key={name}
                                    isActive={false}
                                    isAnyButtonClicked={isAnyButtonClicked}
                                >
                                    {name}
                                </NavButton>
                            ))}
                            <NavButton
                                isActive={false}
                                isAnyButtonClicked={isAnyButtonClicked}
                            >
                                <BsArrowLeft />
                            </NavButton>
                        </Design>
                        <Other>
                            {['Test'].map(name => (
                                <NavButton
                                    key={name}
                                    isActive={false}
                                    isAnyButtonClicked={isAnyButtonClicked}
                                >
                                    {name}
                                </NavButton>
                            ))}
                            <NavButton
                                isActive={false}
                                isAnyButtonClicked={isAnyButtonClicked}
                            >
                                <BsArrowLeft />
                            </NavButton>
                        </Other>
                    </Tertiary>
                </Nav>
                <Footer>
                    <Stream>{currentText}</Stream>
                </Footer>
            </NavBox>
        </NavBounderies>
    );
};

export default DynamicNav;

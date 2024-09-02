import styled from "styled-components";
import useTypingEffect from "../hooks/useTypingEffect";
import chatText from '../hooks/streamText';
import { useWindowSize } from "./Contexts/WindowSizeContext";
import { useControlPanel } from "./Contexts/ControlPanelContext";

const Frame = styled.div`
    width: 100vw;
    height: 100dvh;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding-left: 20px;
    padding-right: 360px;
    @media only screen and (max-width: 1250px) {
      padding-right: 260px;
	  }
    @media only screen and (max-width: 768px) {
      padding: 100px 20px 60px 20px;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      overflow: auto;
	  }
    /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
    &::-webkit-scrollbar {
      display: none;
    }
    /* Hide scrollbar for other browsers */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

const Introduction = styled.div<{ width: number }>`
  width: calc(100vw - 40px);
  max-width: ${(props) => (props.width >= 1150) ? '600px' : '400px'};
  position: relative;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
  margin: 0;
  @media only screen and (max-width: 768px) {
      align-items: flex-start;
	  }
`;

const Link = styled.a`
    all: unset;
    text-align: right;
    clear: both;
    font-family: halyard-text, sans-serif;
    font-size: 0.9rem;
    font-weight: 200;
    font-style: italic;
    max-width: 600px;
    line-height: 1.5rem;
    color: rgb(143, 143, 143);
    cursor: pointer;
`;
const Bubble = styled.div`
    background-color: white;
    width: auto;
    height: 40px;
    position: absolute;
    top: -16px;
    left: 80px;
    border-radius: 20px 20px 20px 0px;
    border: 1px solid #90e5ff;
    color: #4b4b4b;
    padding: 6px 20px 6px 20px;  
`
const Caption = styled.p`
	font-family: halyard-text, sans-serif;
	font-size: 1.1rem;
	font-weight: 200;
	color: rgb(143, 143, 143);
	float: left;
`;

const AboutMe: React.FC = () => {
  const { width } = useWindowSize();
  const { boxInView } = useControlPanel();
  const shouldRestart = boxInView === 12;
  const typedText = useTypingEffect(60, 1500, chatText, shouldRestart);
  const currentText = boxInView === 12 ? typedText : "";
  return (
    <Frame>
      <Links>
        <Caption>Links</Caption>
        <Link
          href="mailto:gnsampayan@gmail.com?subject=Hello there!&body=Hey Glenn,"
          id="email"
        >
          Email
        </Link>
        <Link
          target="_blank"
          href="https://github.com/gnsampayan"
          id="art"
        >
          Github
        </Link>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/glenn-sampayan-544807176/"
          id="social"
        >
          LinkedIn
        </Link>
      </Links>
      <Introduction width={width}>
        <Bubble>{currentText}</Bubble>
        Hi! 😊 <br />
        I'm Glenn. <br />
        <br />
        I'm a designer and engineer based in Austin Texas.
        I have a unique blend of skills that includes visual communication,
        mechatronics engineering, UX & UI design, and full stack web developer.
        I also have a strong background in fine arts.
        <br />
        <br />
        When I'm not working, I enjoy spending time outdoors
        and pursuing my passions. Whether it's camping withmy friends and my dog Alfie,
        building and flying drones, riding motorcycles, making art,
        or working on exciting projects, I always find a way to stay
        engaged and challenged.
        <br />
        <br />
        I'm always looking for opportunities to connect and
        collaborate, so feel free to get in touch if you'd like to chat.
        Let's see what we can create together!
      </Introduction>
    </Frame>
  );
};

export default AboutMe;

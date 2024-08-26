import styled from "styled-components";
import useTypingEffect from "../hooks/useTypingEffect";
import chatText from '../hooks/streamText';
import { useControlPanel } from "./Contexts/ControlPanelContext";

const Frame = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding-right: 360px;
`;

const Introduction = styled.p`
  width: 600px;
  position: relative;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
  margin: 0;
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
    border: 1px solid #ffa600;
    color: #4b4b4b;
    padding: 6px 20px 6px 20px;  
`

const AboutMe: React.FC = () => {
    const { boxInView } = useControlPanel();
    const currentText = boxInView === 12 ? useTypingEffect(60, 1500, chatText) : ""; // Only start typing when boxInView is 12
  return (
    <Frame>
      <Links>
        <Link 
          href="mailto:gnsampayan@gmail.com?subject=Hello there!&body=Hey Glenn,"
          id="email"
          className="green fl-l mb-12"
        >
          Message me
        </Link>
        <Link 
          target="_blank" 
          rel="noopener noreferrer"
          href="https://www.instagram.com/glenn_sampayan/"
          id="art"
          className="red fl-l mb-12"
        >
          Art stuff
        </Link>
        <Link 
          target="_blank" 
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/glenn-sampayan-544807176/"
          id="social"
          className="blue fl-l"
        >
          Let's connect
        </Link>
      </Links>
      <Introduction>
        <Bubble>{currentText}</Bubble>
        Hi! 😊 <br/>
        I'm Glenn. <br/>
        <br/>
        &nbsp;&nbsp;I'm an experienced Engineer and Designer based in Austin. 
        I have a unique blend of skills that includes product strategy, 
        problem-solving, research and development, prototyping, and usability 
        testing. I also have a strong background in interface design, fine 
        arts, communication design, and programming.
        <br/>
        &nbsp;&nbsp;When I'm not working, I enjoy spending time outdoors 
        and pursuing my passions. Whether it's camping with my dog Alfie, 
        building and flying racing drones, riding motorcycles, making art, 
        or working on exciting projects, I always find a way to stay 
        engaged and challenged.
        <br/>
        &nbsp;&nbsp;I'm always looking for opportunities to connect and 
        collaborate, so feel free to get in touch if you'd like to chat. 
        Let's see what we can create together!
      </Introduction>
    </Frame>
  );
};

export default AboutMe;

import styled from "styled-components";
import Image1 from '../assets/background.png';
import Image2 from '../assets/ocean.png';
import Image3 from '/Final v1.mp4';
import Image4 from '../assets/House - Small (2 rooms) v70.png';
import Image5 from '../assets/seaholm-front.jpeg';
import Image6 from '../assets/sunflower.png';
import Image7 from '../assets/seaholm-back.jpeg';
import Image8 from '/alfie.gif';
import { useControlPanel } from "./Contexts/ControlPanelContext";
import { useEffect, useState } from "react";

const Wrapper = styled.div<{ $pointerEvent: boolean; $opacity: boolean }>`
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
	&::-webkit-scrollbar {
		display: none;
	}
	/* Hide scrollbar for other browsers */
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 180px;
    opacity: ${(props) => props.$opacity ? '1' : '0'};
    transition: opacity ${(props) => props.$opacity ? '24s' : '1s'} ease;
    pointer-events: ${(props) => props.$pointerEvent ? 'auto' : 'none'};
`
const ImageZoom = styled.img`
    all: unset;
    background-image: url(${Image5});
    background-size: cover;
    background-position: center;
`
const OtherWorks = () => {
    const { boxInView } = useControlPanel();
    const [pointerEvent, setPointerEvent] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<boolean>(false);

    useEffect(() => {
        if (boxInView === -1) {
            setTimeout(() => {
                setPointerEvent(true);
                setOpacity(true);
            }, 6000)
        } else {
            setOpacity(false);
            setPointerEvent(false);
        }
    }, [boxInView]);

    return (
        <Wrapper $opacity={opacity} $pointerEvent={pointerEvent}>
            <video style={{ transform: 'translateX(-30vw)', width: '40vw', height: 'auto' }} src={Image3} autoPlay loop muted playsInline />
            <img style={{ transform: 'translateX(25vw)', width: '300px', height: '300px' }} src={Image2} />
            <img style={{ transform: 'translateX(calc(20vw)', width: '1200px', height: 'auto' }} src={Image4} />
            <img style={{ transform: 'translateX(calc(-50vw + 200px))', width: '300px', height: '300px' }} src={Image1} />
            <ImageZoom style={{ transform: 'translateX(calc(-50vw + 200px))', width: '400px', height: '400px' }} />
            <img style={{ transform: 'translateX(calc(50vw - 200px))', width: '400px', height: '400px' }} src={Image8} />
            <img style={{ width: '300px', height: '300px' }} src={Image6} />
            <img style={{ transform: 'translateX(calc(50vw - 200px))', width: '400px', height: '400px' }} src={Image7} />
        </Wrapper>
    )
}

export default OtherWorks
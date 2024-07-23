import styled from 'styled-components';
import Kaboom from './assets/Kaboom-site.png';
import drgLogov1 from './assets/drg_logo_v1.svg';
import drgLogov2 from './assets/drg_logo_v2.svg';
import drg1 from './assets/drg1.png';
import drg2 from './assets/drg2.png';

const Wrapper = styled.div<{visibility : string}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    overflow-x: hidden;
    overflow-y: auto;
    visibility: ${(props) => props.visibility};
`;
const Grid = styled.div<{ translation: string }>`
    display: grid;
    grid-template-columns: 1fr;
    max-width: calc(100vw - 400px);
    width: 100%;
    margin: 0 auto;
    position: relative;
    left: ${(props) => props.translation};
    transition: 1s ease;
    gap: 20px;
`;
const Object = styled.div`
    height: auto;  
    width: 100%;    
    color: black;
    clear: both;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImageWrapper = styled.div`
    position: relative;
    height: 600px;
    width: 400px;
    overflow: hidden;
    border-radius: 3px;

    &:hover .drg1 {
        opacity: 0;
    }

    &:hover .drg2 {
        opacity: 1;
    }
    &:hover {
      border: 1px solid black;
    }
`;

const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: opacity 0.5s ease-in-out;
`;

const Drg1 = styled(Image)`
    opacity: 1;
`;

const Drg2 = styled(Image)`
    opacity: 0;
`;

const FirstChild = styled.div`
  background-color: white;
  width: 300px;
  height: 152px;
  border-radius: 3px;
  position: relative;

  &:hover .logo1 {
    opacity: 0;
  }
  &:hover .logo2 {
    opacity: 1;
  }
  &:hover {
      border: 1px solid black;
    }
`;

const Logo = styled.img`
  width: 100%;
  padding: 60px 60px 60px 60px;
  border-radius: 3px;
  transition: opacity 0.5s ease-in-out;
  position: absolute;
`;

const Logo1 = styled(Logo)`
  opacity: 1;
`;

const Logo2 = styled(Logo)`
  opacity: 0;
`;

const SecondChild = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: flex-end;
  transform: translateY(-100px);
`;
const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;
const Centering = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
`

interface Props {
  translation: string;
  vis: string;
}

const Works = ({ translation, vis }: Props) => {
  return (
    <Wrapper visibility={vis}>
      <Grid translation={translation}>
        <Object style={{ marginTop: '20vh', marginBottom: '300px' }}>
          <Centering>
            <Heading>
              <h1 style={{marginBottom: '20px'}}>DesignRunGroup.</h1>
              <p>A mission-driven venture studio. Brings promising health 
                solutions to our most vulnerable communities.
              </p>
            </Heading>
            <FirstChild>
                <Logo1 src={drgLogov1} className="logo1" />
                <Logo2 src={drgLogov2} className="logo2" />
            </FirstChild>
            <p style={{color: 'rgba(0, 0, 0, .8)'}}>Main Wordmark</p>
            <SecondChild>
              <div>
                <ImageWrapper>
                  <Drg1 src={drg1} className="drg1" />
                  <Drg2 src={drg2} className="drg2" />
                </ImageWrapper>
                <p style={{color: 'rgba(0, 0, 0, .8)'}}>Interactive Website Screenshot</p>    
              </div>
            </SecondChild>
          </Centering>
        </Object>
        <Object>
          <Centering>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                marginBottom: '100px' 
              }} >
                <h1 style={{marginBottom: '20px'}}>NQ Hardware</h1>
                <p>put description here.
                </p>
              </div>
              <div style={{backgroundColor: 'lightblue', height: '400px', width: '720px'}}>test</div>
          </Centering>
        </Object>
        <Object style={{height: '400px'}}>
            <img src={Kaboom} style={{backgroundColor: 'lightblue', height: '400px', width: '720px'}}/>
        </Object>
        <Object style={{height: '400px'}}>
            <div style={{backgroundColor: 'lightblue', height: '400px', width: '720px'}}>test</div>
        </Object>
      </Grid>
    </Wrapper>
  );
};

export default Works;

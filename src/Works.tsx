import styled from 'styled-components';

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    overflow-x: hidden;
    overflow-y: auto;
`;
const Grid = styled.div<{ translation: string }>`
    display: grid;
    grid-template-columns: 1fr;
    gap: 400px;
    max-width: calc(100vw - 400px);
    width: 100%;
    margin: 0 auto;
    position: relative;
    left: ${(props) => props.translation};
    transition: 1s ease;
`;
const Object = styled.div`
    height: auto;  
    width: 100%;    
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    gap: 20px;
    /* border: 1px solid black; */
`;

interface Props {
    translation: string;
}

const Works = ({ translation }: Props) => {

  return (
    <Wrapper>
      <Grid translation={translation}>
        <Object>
            <div style={{backgroundColor: 'lightblue', height: '200px', width: '200px'}}>test</div>
            <div style={{backgroundColor: 'lightblue', height: '200px', width: '200px'}}>test</div>
            <div style={{backgroundColor: 'lightblue', height: '200px', width: '200px'}}>test</div>
        </Object>
        <Object>
            <div style={{backgroundColor: 'lightblue', height: '200px', width: '400px'}}>test</div>
        </Object>
        <Object>
            <div style={{backgroundColor: 'lightblue', height: '200px', width: '400px'}}>test</div>
        </Object>
        <Object>
            <div style={{backgroundColor: 'lightblue', height: '200px', width: '400px'}}>test</div>
        </Object>
      </Grid>
    </Wrapper>
  );
};

export default Works;

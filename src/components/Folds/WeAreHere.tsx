import WeAreHereVid from '/WeAreHere.mp4';
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import styles from './folds.module.css';

const WeAreHere = () => {
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
    const { setButtonDisabled } = useNavContext();

    const handleViewDetailsClick = () => {
        setButtonDisabled(true);
        setBoxInView(8);
        handleMove(8, '0', '-100dvh');
        handleMove(3, '-100vw', '-100dvh');
        changeOpacity(8, 1);
        toggleAnimation(8, true);
        setTimeout(() => {
            setButtonDisabled(false);
            toggleAnimation(3, false);
            handleReset([3]);
        }, 1000);
    };

    return (
        <div className={styles.fold}>
            <div className={styles.frame}>
                <div className={styles.videoWrapper}>
                    <div className={styles.videoContainer}>
                        <video className={styles.video} src={WeAreHereVid} controls loop playsInline muted />
                    </div>
                </div>
                <div className={styles.project}>
                    <div className={styles.title}>We Are Here</div>
                    <div className={styles.subtitle}>User-Driven Service Platform</div>
                    <div className={styles.date}>2021</div>
                    <a className={styles.customLink} onClick={handleViewDetailsClick}>Project Details</a>
                </div>
            </div>
        </div>
    );
};

export default WeAreHere;

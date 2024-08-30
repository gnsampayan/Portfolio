import NQVid from '/nqhardware-sequence.mp4';
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import styles from './folds.module.css';

const NQHardware = () => {
    const { setButtonDisabled } = useNavContext();
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();

    const handleViewDetailsClick = () => {
        setButtonDisabled(true);
        setBoxInView(6);
        handleMove(6, '0', '-100vh');
        handleMove(1, '-100vw', '-100vh');
        changeOpacity(6, 1);
        toggleAnimation(6, true);
        setTimeout(() => {
            toggleAnimation(1, false);
            handleReset([1]);
            setButtonDisabled(false);
        }, 1000);
    };

    return (
        <div className={styles.fold}>
            <div className={styles.container}>
                <div className={styles.frame}>
                    <div className={styles.videoWrapper}>
                        <video className={styles.video} src={NQVid} controls loop playsInline muted />
                    </div>
                    <div className={styles.project}>
                        <div className={styles.title}>NQ Hardware</div>
                        <div className={styles.subtitle}>WEB APP, E-COMMERCE</div>
                        <div className={styles.date}>2024</div>
                        <a className={styles.customLink} onClick={handleViewDetailsClick}>Project Details</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NQHardware;

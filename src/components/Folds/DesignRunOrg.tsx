import DrgOrg from '/designrun.mp4';
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import styles from './folds.module.css';

const DesignRunOrg = () => {
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
    const { setButtonDisabled } = useNavContext();

    const handleViewDetailsClick = () => {
        setButtonDisabled(true);
        setBoxInView(9);
        handleMove(9, '0', '-100dvh');
        handleMove(4, '-100vw', '-100dvh');
        changeOpacity(9, 1);
        toggleAnimation(9, true);
        setTimeout(() => {
            setButtonDisabled(false);
            toggleAnimation(4, false);
            handleReset([4]);
        }, 1000);
    };

    return (
        <div className={styles.fold}>
            <div className={styles.frame}>
                <div className={styles.videoWrapper}>
                    <div className={styles.videoContainer}>
                        <video className={styles.video} src={DrgOrg} controls loop playsInline muted />
                    </div>
                </div>
                <div className={styles.project}>
                    <div className={styles.title}>Designrun<br />.org</div>
                    <div className={styles.subtitle}>WEBSITE</div>
                    <div className={styles.date}>2024</div>
                    <a className={styles.customLink} onClick={handleViewDetailsClick}>Project Details</a>
                </div>
            </div>
        </div>
    );
}

export default DesignRunOrg;

import DrgGroup from '/DrgGroupVid.mp4';
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import styles from './folds.module.css';

const DesignRunGroup = () => {
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
    const { setButtonDisabled } = useNavContext();

    const handleViewDetailsClick = () => {
        setButtonDisabled(true);
        setBoxInView(7);
        handleMove(7, '0', '-100dvh');
        handleMove(2, '-100vw', '-100dvh');
        changeOpacity(7, 1);
        toggleAnimation(7, true);
        setTimeout(() => {
            setButtonDisabled(false);
            toggleAnimation(2, false);
            handleReset([2]);
        }, 1000);
    };

    return (
        <div className={styles.fold}>
            <div className={styles.frame}>
                <div className={styles.videoWrapper}>
                    <div className={styles.videoContainer}>
                        <video className={styles.video} src={DrgGroup} controls loop playsInline muted />
                    </div>
                </div>
                <div className={styles.project}>
                    <div className={styles.title}>DesignRun<br />Group</div>
                    <div className={styles.subtitle}>WEBSITE</div>
                    <div className={styles.date}>2023</div>
                    <a className={styles.customLink} onClick={handleViewDetailsClick}>Project Details</a>
                </div>
            </div>
        </div>
    );
};

export default DesignRunGroup;

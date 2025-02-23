import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import styles from './folds.module.css';
import DesignRunOrgImage from '../../assets/drg_sample_page.png';

import ReactGA from 'react-ga4';

const DesignRunOrg = () => {
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
    const { setButtonDisabled } = useNavContext();

    const handleViewDetailsClick = () => {
        // Google Analytics
        ReactGA.event({
            category: 'Designrun.org Fold',
            action: 'View Details Button Clicked',
            label: 'View Details'
        });
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
                <div className={styles.project}>
                    <div className={styles.title}>Designrun<br />.org</div>
                    <div className={styles.subtitle}>WEBSITE</div>
                    <div className={styles.date}>2024</div>
                    <a className={styles.customLink} onClick={handleViewDetailsClick}>Project Details</a>
                </div>
                <div className={styles.imageContainer} onClick={handleViewDetailsClick}>
                    <img className={styles.image} src={DesignRunOrgImage} alt="DesignRunOrg" />
                </div>
            </div>
        </div>
    );
}

export default DesignRunOrg;

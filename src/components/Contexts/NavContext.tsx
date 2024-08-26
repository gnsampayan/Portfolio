import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of your context
interface NavContextProps {
  activeMainButton: string | null;
  setActiveMainButton: React.Dispatch<React.SetStateAction<string | null>>;
  activeSecondaryBtn: string | null;
  setActiveSecondaryBtn: React.Dispatch<React.SetStateAction<string | null>>;
  isAnyButtonClicked: boolean;
  setIsAnyButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  foldTranslation: string;
  onMoveFold: (direction: string) => void;
  navTranslation: string;
  onMoveNav: (direction: string) => void;
  listTranslation: string;
  onMoveList: (direction: string) => void;
  MainBtnData: ButtonData[];
  SecondaryBtnData: ButtonData[];
  highlightedSecondaryNav: number | null;
  setHighlightedSecondaryNav: React.Dispatch<React.SetStateAction<number | null>>;
  handleProjectDetails: (index: number) => void;
  visibleProjectDetails: number | null;
  setVisibleProjectDetails: React.Dispatch<React.SetStateAction<number | null>>;
  foldVis: boolean;
  setFoldVis: React.Dispatch<React.SetStateAction<boolean>>;
  detailsTranslation: string;
  onMoveDetails: (direction: string) => void;
  foldItemTranslationNQHardware: string;
  foldItemTranslationDesignRunGroup: string;
  foldItemTranslationWeAreHere: string;
  foldItemTranslationDesignRunOrg: string;
  foldItemTranslationSpanning: string;
  onMoveNQ: (direction: string) => void;
  onMoveDrg: (direction: string) => void;
  onMoveHere: (direction: string) => void;
  onMoveDrgOrg: (direction: string) => void;
  onMoveSpanning: (direction: string) => void;
  handleSecondaryButtonClick: (buttonName: string) => void;
}
interface ButtonData {
    name: string;
  }

const MainBtnData = [
    { name: 'Works' },
    { name: 'About Me' },
];
const SecondaryBtnData = [
    { name: 'E-commerce' },
    { name: 'Venture Studio' },
    { name: 'Healthcare' },
    { name: 'Non-profit' },
    { name: 'SaaS' },
]

// Create the context with default values
const NavContext = createContext<NavContextProps | undefined>(undefined);

// Provider component
export const NavProvider = ({ children }: { children: ReactNode }) => {
    const [isAnyButtonClicked, setIsAnyButtonClicked] = useState<boolean>(false);
    const [activeMainButton, setActiveMainButton] = useState<string | null>(null);
    const [activeSecondaryBtn, setActiveSecondaryBtn] = useState<string | null>(null);
    const [foldTranslation, setFoldTranslation] = useState<string>('translate(0 , 0)');
    const [navTranslation, setNavTranslation] = useState<string>('translateX(0)');
    const [listTranslation, setListTranslation] = useState<string>('translateX(0)');
    const [highlightedSecondaryNav, setHighlightedSecondaryNav] = useState<number | null>(null);
    const [visibleProjectDetails, setVisibleProjectDetails] = useState<number | null>(null);
    const [foldVis, setFoldVis] = useState<boolean>(false);
    const [detailsTranslation, setDetailsTranslation] = useState<string>('translateX(0)');
    const [foldItemTranslationNQHardware, setFoldItemTranslationNQHardware] = useState<string>('translateX(0)');
    const [foldItemTranslationDesignRunGroup, setFoldItemTranslationDesignRunGroup] = useState<string>('translateX(0)');
    const [foldItemTranslationWeAreHere, setFoldItemTranslationWeAreHere] = useState<string>('translateX(0)');
    const [foldItemTranslationDesignRunOrg, setFoldItemTranslationDesignRunOrg] = useState<string>('translateX(0)');
    const [foldItemTranslationSpanning, setFoldItemTranslationSpanning] = useState<string>('translateX(0)');

    const onMoveNav = (direction: string) => {
        const directionTranslations: { [key: string]: string } = {
            left: 'translateX(calc(-50vw + 200px))',
            origin: 'translateX(0)',
        };
        setNavTranslation(directionTranslations[direction] || 'translateX(0)');
    }
    const onMoveList = (direction: string) => {
        const directionTranslations: { [key: string]: string } = {
            left: 'translateX(-170px)', // to edge
            right: 'translateX(210px)',
            origin: 'translateX(0)',
        };
        setListTranslation(directionTranslations[direction] || 'translateX(0)');
    }
    const onMoveFold = (direction: string) => {
      const directionTranslations: { [key: string]: string } = {
        center: 'translateX(-100vw)',
        origin: 'translate(0, 0)',
        left: 'translateX(-200vw)',
        up: 'translate(-100vw, -100vh)',
      };
        setFoldTranslation(directionTranslations[direction] || 'translateX(0)');
    };
    const onMoveNQ = (direction: string) => {
      const directionTranslations: { [key: string]: string } = {
        center: 'translateX(-100vw)',
        left: 'translateX(-200vw)',
        right: 'translateX(100vw)',
        origin: 'translateX(0)',
      };
        setFoldItemTranslationNQHardware(directionTranslations[direction] || 'translateX(0)');
    };
    const onMoveDrg = (direction: string) => {
      const directionTranslations: { [key: string]: string } = {
        center: 'translateX(-100vw)',
        left: 'translateX(-200vw)',
        right: 'translateX(100vw)',
        origin: 'translateX(0)',
      };
      setFoldItemTranslationDesignRunGroup(directionTranslations[direction] || 'translateX(0)');
    };
    const onMoveHere = (direction: string) => {
      const directionTranslations: { [key: string]: string } = {
        center: 'translateX(-100vw)',
        left: 'translateX(-200vw)',
        right: 'translateX(100vw)',
        origin: 'translateX(0)',
      };
      setFoldItemTranslationWeAreHere(directionTranslations[direction] || 'translateX(0)');
    };
    const onMoveDrgOrg = (direction: string) => {
      const directionTranslations: { [key: string]: string } = {
        center: 'translateX(-100vw)',
        left: 'translateX(-200vw)',
        right: 'translateX(100vw)',
        origin: 'translateX(0)',
      };
      setFoldItemTranslationDesignRunOrg(directionTranslations[direction] || 'translateX(0)');
    };
    const onMoveSpanning = (direction: string) => {
      const directionTranslations: { [key: string]: string } = {
        center: 'translateX(-100vw)',
        left: 'translateX(-200vw)',
        right: 'translateX(100vw)',
        origin: 'translateX(0)',
      };
      setFoldItemTranslationSpanning(directionTranslations[direction] || 'translateX(0)');
    };

    const onMoveDetails = (direction: string) => {
      const directionTranslations: { [key: string]: string } = {
        center: 'translateY(-100vh)',
        origin: 'translate(0 , 0)',
        left: 'translateX(-100vw)',
        right: 'translate(100vw, -100vh)',
      };
      setDetailsTranslation(directionTranslations[direction] || 'translateX(0)');
    }

    useEffect(() => {
        if (highlightedSecondaryNav !== null) {
            const secondaryBtnName = SecondaryBtnData[highlightedSecondaryNav]?.name || '';
            setActiveSecondaryBtn(secondaryBtnName);
            setActiveMainButton(MainBtnData[0].name);
        }
    }, [highlightedSecondaryNav, setActiveSecondaryBtn, setActiveMainButton]);
    
    useEffect(() => {
        if (activeSecondaryBtn) {
            const navIndex = SecondaryBtnData.findIndex(btn => btn.name === activeSecondaryBtn);
            setHighlightedSecondaryNav(navIndex !== -1 ? navIndex : null);
            setActiveMainButton(MainBtnData[0].name);
        }
    }, [activeSecondaryBtn, setHighlightedSecondaryNav, setActiveMainButton]);
    
    const handleProjectDetails = (index: number) => {
      setVisibleProjectDetails(index);
      onMoveFold('up');
      onMoveDetails('center');
        setTimeout(() => {
            setFoldVis(false);
        }, 1000);
    }

      const handleSecondaryButtonClick = (buttonName: string) => {
        const buttonIndex = SecondaryBtnData.findIndex(btn => btn.name === buttonName);
        
        setIsAnyButtonClicked(true);
        setActiveSecondaryBtn(buttonName);
        onMoveNav('left');
        onMoveFold('center');

        if (buttonIndex !== -1 && buttonIndex !== highlightedSecondaryNav) {
            // Move the current fold out to the left
            if (highlightedSecondaryNav === 0) {
                onMoveNQ('left');
                setTimeout(() => {
                    onMoveNQ('origin');
                }, 1000);
            } else if (highlightedSecondaryNav === 1) {
                onMoveDrg('left');
                setTimeout(() => {
                    onMoveDrg('origin');
                }, 1000);
            } else if (highlightedSecondaryNav === 2) {
                onMoveHere('left');
                setTimeout(() => {
                    onMoveHere('origin');
                }, 1000);
            } else if (highlightedSecondaryNav === 3) {
                onMoveDrgOrg('left');
                setTimeout(() => {
                    onMoveDrgOrg('origin');
                }, 1000);
            } else if (highlightedSecondaryNav === 4) {
                onMoveSpanning('left');
                setTimeout(() => {
                    onMoveSpanning('origin');
                }, 1000);
            }            
            // Slide the current fold out to the left
            setHighlightedSecondaryNav(buttonIndex);
            
            // Move the selected fold to the center
            if (buttonIndex === 0) onMoveNQ('center');
            if (buttonIndex === 1) onMoveDrg('center');
            if (buttonIndex === 2) onMoveHere('center');
            if (buttonIndex === 3) onMoveDrgOrg('center');
            if (buttonIndex === 4) onMoveSpanning('center');
        }
    };

  return (
    <NavContext.Provider
      value={{
        activeMainButton,
        setActiveMainButton,
        activeSecondaryBtn,
        setActiveSecondaryBtn,
        isAnyButtonClicked,
        setIsAnyButtonClicked,
        foldTranslation,
        onMoveFold,
        navTranslation,
        onMoveNav,
        listTranslation,
        onMoveList,
        MainBtnData,
        SecondaryBtnData,
        highlightedSecondaryNav,
        setHighlightedSecondaryNav,
        handleProjectDetails,
        visibleProjectDetails,
        foldVis,
        setFoldVis,
        detailsTranslation,
        onMoveDetails,
        setVisibleProjectDetails,
        foldItemTranslationNQHardware,
        foldItemTranslationDesignRunGroup,
        foldItemTranslationWeAreHere,
        foldItemTranslationDesignRunOrg,
        foldItemTranslationSpanning,
        onMoveNQ,
        onMoveDrg,
        onMoveHere,
        onMoveDrgOrg,
        onMoveSpanning,
        handleSecondaryButtonClick,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

// Custom hook to use the NavContext
export const useNavContext = () => {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error('useNavContext must be used within a NavProvider');
  }
  return context;
};

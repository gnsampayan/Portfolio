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
  setHighlightedSecondaryNav: (index: number | null) => void;
  handleProjectDetails: (index: number) => void;
  visibleProject: number | null;
  touchedFolds: number[] | null;
  setTouchedFolds: React.Dispatch<React.SetStateAction<number[] | null>>;
  foldVis: boolean;
  setFoldVis: React.Dispatch<React.SetStateAction<boolean>>;
  isScrollEnabled: boolean;
  setIsScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [foldTranslation, setFoldTranslation] = useState<string>('100vw');
    const [navTranslation, setNavTranslation] = useState<string>('translateX(0)');
    const [listTranslation, setListTranslation] = useState<string>('translateX(0)');
    const [highlightedSecondaryNav, setHighlightedSecondaryNav] = useState<number | null>(null);
    const [visibleProject, setVisibleProject] = useState<number | null>(null);
    const [touchedFolds, setTouchedFolds] = useState<number[] | null>([]);
    const [foldVis, setFoldVis] = useState<boolean>(false);
    const [isScrollEnabled, setIsScrollEnabled] = useState<boolean>(true);

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
        center: '0px',
        origin: '100vw',
        left: '-100vw',
      };
        setFoldTranslation(directionTranslations[direction] || '100vw');
    };

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
      setVisibleProject(index);
      setTouchedFolds([0,1,2,3,4]);
      onMoveFold('left');
    }

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
        visibleProject,
        setTouchedFolds,
        touchedFolds,
        foldVis,
        setFoldVis,
        isScrollEnabled,
        setIsScrollEnabled,
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

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of your context
interface NavContextProps {
  activeMainButton: string | null;
  setActiveMainButton: React.Dispatch<React.SetStateAction<string | null>>;
  activeSecondaryBtn: string | null;
  setActiveSecondaryBtn: React.Dispatch<React.SetStateAction<string | null>>;
  isAnyButtonClicked: boolean;
  setIsAnyButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  listTranslation: string;
  onMoveList: (direction: string) => void;
  MainBtnData: ButtonData[];
  SecondaryBtnData: ButtonData[];
  highlightedSecondaryNav: number | null;
  setHighlightedSecondaryNav: React.Dispatch<React.SetStateAction<number | null>>;
  handleSecondaryButtonClick: (buttonName: string) => void;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isButtonDisabled: boolean;
  setInvertNav: React.Dispatch<React.SetStateAction<boolean>>;
  invertNav: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}
interface ButtonData {
  name: string;
}

const MainBtnData = [
  { name: 'Works' },
  { name: 'About Me' },
];
const SecondaryBtnData = [
  { name: 'NQ Hardware' },
  { name: 'Designrun' },
  { name: 'Here' },
  { name: 'Designrun.org' },
  { name: 'Spanning' },
]

// Create the context with default values
const NavContext = createContext<NavContextProps | undefined>(undefined);

// Provider component
export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [isAnyButtonClicked, setIsAnyButtonClicked] = useState<boolean>(false);
  const [activeMainButton, setActiveMainButton] = useState<string | null>(null);
  const [activeSecondaryBtn, setActiveSecondaryBtn] = useState<string | null>(null);
  const [listTranslation, setListTranslation] = useState<string>('translateX(0)');
  const [highlightedSecondaryNav, setHighlightedSecondaryNav] = useState<number | null>(-1);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [invertNav, setInvertNav] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const onMoveList = (direction: string) => {
    const directionTranslations: { [key: string]: string } = {
      left: 'translateX(-196px)', // to edge
      right: 'translateX(210px)',
      origin: 'translateX(0)',
    };
    setListTranslation(directionTranslations[direction] || 'translateX(0)');
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

  const handleSecondaryButtonClick = (buttonName: string) => {
    setIsAnyButtonClicked(true);
    setActiveSecondaryBtn(buttonName);
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
        listTranslation,
        onMoveList,
        MainBtnData,
        SecondaryBtnData,
        highlightedSecondaryNav,
        setHighlightedSecondaryNav,
        handleSecondaryButtonClick,
        setButtonDisabled,
        isButtonDisabled,
        setInvertNav,
        invertNav,
        setModalOpen,
        isModalOpen,
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

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of your context
interface NavContextProps {
  activeMainButton: string | null;
  setActiveMainButton: React.Dispatch<React.SetStateAction<string>>;
  activeSecondaryBtn: string | null;
  setActiveSecondaryBtn: React.Dispatch<React.SetStateAction<string>>;
  isAnyButtonClicked: boolean;
  setIsAnyButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  listTranslation: number;
  onMoveList: (direction: string) => void;
  MainBtnData: ButtonData[];
  SecondaryBtnData: ButtonData[];
  highlightedSecondaryNav: number;
  setHighlightedSecondaryNav: React.Dispatch<React.SetStateAction<number>>;
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
  const [activeMainButton, setActiveMainButton] = useState<string>('');
  const [activeSecondaryBtn, setActiveSecondaryBtn] = useState<string>('');
  const [listTranslation, setListTranslation] = useState<number>(0);
  const [highlightedSecondaryNav, setHighlightedSecondaryNav] = useState<number>(-1);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [invertNav, setInvertNav] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const onMoveList = (direction: string) => {
    const directionTranslations: { [key: string]: number } = {
      left: -190, // to edge
      right: 210,
      origin: 0,
    };
    setListTranslation(directionTranslations[direction] || 0);
  }
  useEffect(() => {
    if (highlightedSecondaryNav !== -1) {
      const secondaryBtnName = SecondaryBtnData[highlightedSecondaryNav]?.name || '';
      setActiveSecondaryBtn(secondaryBtnName);
      setActiveMainButton(MainBtnData[0].name);
    }
  }, [highlightedSecondaryNav, setActiveSecondaryBtn, setActiveMainButton]);

  useEffect(() => {
    if (activeSecondaryBtn !== '') {
      const navIndex = SecondaryBtnData.findIndex(btn => btn.name === activeSecondaryBtn);
      setHighlightedSecondaryNav(navIndex !== -1 ? navIndex : -1);
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

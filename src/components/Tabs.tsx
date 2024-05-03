import { ReactNode, useState, useEffect } from "react";

import Button from "./Button";

interface TabData {
  title: string;
  id: number;
  content: ReactNode;
}

const Tabs = ({ tabs }: { tabs: TabData[] }) => {
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTab]);

  function handleTabClick(index: number) {
    setCurrentTab(index);
  }

  return (
    <>
      <div className="w-full flex overflow-auto no-scrollbar">
        {tabs.map((tab, index) => {
          return (
            <Tab
              key={tab.id}
              onClick={() => handleTabClick(index)}
              title={tab.title}
              active={index === currentTab}
            />
          );
        })}
      </div>

      {tabs.map((tab, index) => {
        if (index === currentTab) {
          return (
            <div className="px-4 md:px-0" key={tab.id}>
              {tab.content}
            </div>
          );
        }
      })}

      <Button
        onClick={() => setCurrentTab(currentTab - 1)}
        disabled={currentTab === 0}
      >
        Previous
      </Button>
      <Button
        onClick={() => setCurrentTab(currentTab + 1)}
        disabled={currentTab === tabs.length - 1}
      >
        Next
      </Button>
    </>
  );
};

export default Tabs;

const Tab = ({
  title,
  onClick,
  active,
}: {
  title: string;
  onClick: () => void;
  active: boolean;
}) => {
  const classes = active
    ? "text-pink-600 border-pink-500"
    : "text-gray-500 border-gray-200 hover:text-gray-900 hover:border-gray-400";
  return (
    <button
      className={`${classes} transition-color duration-100 text-sm border-b w-[38%] sm:w-[22%] md:w-full font-medium pb-3 grow-0 shrink-0 md:grow md:shrink`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

import { ReactNode, useState, useEffect } from "react";

import Button from "./Button";

interface TabData {
  title: string;
  id: number;
  content: ReactNode;
  lock: boolean;
}

const Tabs = ({ tabs }: { tabs: TabData[] }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const isFirstPage = currentTab === 0;
  const isLastPage = currentTab === tabs.length - 1;
  const nextPageIsLocked = !isLastPage && tabs[currentTab + 1].lock;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTab]);

  function handleTabClick(index: number) {
    setCurrentTab(index);
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="w-full flex overflow-auto no-scrollbar px-4 md:px-0">
        {tabs.map((tab, index) => {
          return (
            <Tab
              key={tab.id}
              onClick={() => handleTabClick(index)}
              title={tab.title}
              active={index === currentTab}
              disabled={tab.lock}
            />
          );
        })}
      </div>

      {tabs.map((tab, index) => {
        if (index === currentTab) {
          return (
            <form
              className="px-4 md:px-0 max-w-[500px] flex flex-col gap-6"
              key={tab.id}
            >
              {tab.content}
            </form>
          );
        }
      })}

      <div className="px-4 md:px-0">
        <div className="h-[1px] bg-gray-200 w-full"></div>
      </div>

      <div
        className={`flex ${
          isFirstPage ? "justify-end" : "justify-between"
        } px-4 md:px-0`}
      >
        {!isFirstPage && (
          <Button onClick={() => setCurrentTab(currentTab - 1)}>
            Previous
          </Button>
        )}

        {currentTab !== tabs.length - 1 && (
          <Button
            color="gray-dark"
            size="sm"
            override="w-[80px] "
            onClick={() => setCurrentTab(currentTab + 1)}
            disabled={nextPageIsLocked}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Tabs;

const Tab = ({
  title,
  onClick,
  active,
  disabled,
}: {
  title: string;
  onClick: () => void;
  active: boolean;
  disabled: boolean;
}) => {
  const classes = active
    ? "text-pink-600 border-pink-500"
    : "text-gray-500 border-gray-200 hover:text-gray-900 hover:border-gray-300";
  return (
    <button
      disabled={disabled}
      className={`${classes} ${
        disabled && "opacity-50"
      } transition-colors duration-100 text-sm border-b w-[38%] sm:w-[22%] md:w-full font-medium pb-3 grow-0 shrink-0 md:grow md:shrink disabled:pointer-events-none`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

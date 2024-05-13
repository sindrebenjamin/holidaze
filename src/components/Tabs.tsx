import { ReactNode, useState, useEffect } from "react";

import Button from "./Button";
import Tab from "./Tab";

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
              sizing="w-[38%] sm:w-[22%] md:w-full"
            />
          );
        })}
      </div>

      {tabs.map((tab, index) => {
        if (index === currentTab) {
          return (
            <div
              className="px-4 md:px-0 max-w-[500px] flex flex-col gap-6"
              key={tab.id}
            >
              {tab.content}
            </div>
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
          <Button type="button" onClick={() => setCurrentTab(currentTab - 1)}>
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
            type="button"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Tabs;

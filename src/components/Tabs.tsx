import { ReactNode, useState, useEffect } from "react";

import Button from "./Button";
import Tab from "./Tab";
import Bookings from "./modules/EditPage/Bookings";
import { Venue } from "../interfaces";

interface TabData {
  title: string;
  id: number;
  content: ReactNode;
  lock: boolean;
  lockMessage?: string;
  errorFlag?: boolean;
}

const Tabs = ({ tabs, venue }: { tabs: TabData[]; venue: Venue }) => {
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
    <div className="flex flex-col gap-6 md:gap-8 px-4 sm:px-6 md:px-0">
      <div className="w-full flex overflow-auto no-scrollbar">
        {tabs.map((tab, index) => {
          return (
            <Tab
              key={tab.id}
              onClick={() => handleTabClick(index)}
              title={tab.title}
              active={index === currentTab}
              disabled={tab.lock}
              sizing="w-[38%] sm:w-[22%] md:w-full"
              error={tab.errorFlag}
            />
          );
        })}
      </div>

      {tabs.map((tab, index) => {
        if (index === currentTab) {
          return (
            <div key={index} className="flex items-start justify-between gap-6">
              <div
                className="w-full max-w-[500px] flex flex-col gap-6"
                key={tab.id}
              >
                {tab.content}
              </div>
              {venue && (
                <div className="hidden lg:block">
                  <Bookings venue={venue} />
                </div>
              )}
            </div>
          );
        }
      })}

      <div className="h-[1px] bg-gray-200 w-full"></div>

      <div
        className={`flex ${isFirstPage ? "justify-end" : "justify-between"}`}
      >
        {!isFirstPage && (
          <Button type="button" onClick={() => setCurrentTab(currentTab - 1)}>
            Previous
          </Button>
        )}

        {!isLastPage && (
          <Button
            color="gray-dark"
            size="sm"
            override="w-[80px]"
            onClick={() => setCurrentTab(currentTab + 1)}
            disabled={nextPageIsLocked}
            type="button"
          >
            Next
          </Button>
        )}
        {isLastPage && tabs[currentTab].errorFlag && (
          <p className="text-gray-500 text-sm">
            {tabs[currentTab].lockMessage}
          </p>
        )}
      </div>
      {nextPageIsLocked && (
        <p className="text-gray-500 text-sm self-end mt-[-12px]">
          {tabs[currentTab].lockMessage}
        </p>
      )}
    </div>
  );
};

export default Tabs;

import { ReactNode, useState, useEffect } from "react";

import Button from "./Button";
import Tab from "./Tab";
import Bookings from "./modules/EditPage/Bookings";
import { BookingData } from "../interfaces";

interface TabData {
  title: string;
  id: number;
  content: ReactNode;
  lock: boolean;
}

const Tabs = ({
  tabs,
  bookings,
}: {
  tabs: TabData[];
  bookings?: BookingData[];
}) => {
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
            <div className="flex items-start justify-between gap-6">
              <div
                className="px-4 sm:px-6 md:px-0 w-full max-w-[500px] flex flex-col gap-6"
                key={tab.id}
              >
                {tab.content}
              </div>
              {bookings && (
                <div className="hidden lg:block">
                  <Bookings bookings={bookings} />
                </div>
              )}
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

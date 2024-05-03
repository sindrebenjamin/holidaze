import { ReactNode, useState } from "react";

import Button from "./Button";

interface TabData {
  title: string;
  id: number;
  content: ReactNode;
}

const Tabs = ({ tabs }: { tabs: TabData[] }) => {
  const [currentTab, setCurrentTab] = useState(0);

  function handleTabClick(index: number) {
    setCurrentTab(index);
  }

  return (
    <>
      {tabs.map((tab, index) => {
        return (
          <Tab
            key={tab.id}
            onClick={() => handleTabClick(index)}
            title={tab.title}
          />
        );
      })}

      {tabs.map((tab, index) => {
        if (index === currentTab) {
          return tab.content;
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

const Tab = ({ title, onClick }: { title: string; onClick: () => void }) => {
  return <button onClick={onClick}>{title}</button>;
};

import React, { createContext, ReactNode, useContext } from "react";

interface BreadcrumbInfo {
  label: string;
  href?: string;
}

interface BreadcrumbContextType {
  currentPathInfo: BreadcrumbInfo;
  setCurrentPathInfo: (info: BreadcrumbInfo) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined,
);

export const BreadcrumbProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentPathInfo, setCurrentPathInfo] = React.useState<BreadcrumbInfo>({
    label: "",
  });

  return (
    <BreadcrumbContext.Provider value={{ currentPathInfo, setCurrentPathInfo }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};

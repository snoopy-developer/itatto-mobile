import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context
interface CalendarContextProps {
  focusedDate: Date;
  setFocusedDate: (date: Date) => void;
}

// Create the context
const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined,
);

// Custom hook to use the CalendarContext
export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

// CalendarProvider component
export const CalendarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [focusedDate, setFocusedDate] = useState(new Date());

  return (
    <CalendarContext.Provider value={{ focusedDate, setFocusedDate }}>
      {children}
    </CalendarContext.Provider>
  );
};

import React from 'react';

interface ThemeIconProps {
  darkMode: boolean;
}

const ThemeIcon: React.FC<ThemeIconProps> = ({ darkMode }) => {
  const darkIconClasses = `absolute transition-all duration-500 ${darkMode ? 'scale-110 opacity-100' : 'scale-90 opacity-0'}`;
  const lightIconClasses = `absolute transition-all duration-500 ${darkMode ? 'scale-90 opacity-0' : 'scale-110 opacity-100'}`;

  return (
    <div className='relative h-8 w-8'>
      <img
        src='/dark.svg'
        alt='Темная тема'
        className={darkIconClasses}
        width={32}
        height={32}
      />
      <img
        src='/light.svg'
        alt='Светлая тема'
        className={lightIconClasses}
        width={32}
        height={32}
      />
    </div>
  );
};

export default ThemeIcon;
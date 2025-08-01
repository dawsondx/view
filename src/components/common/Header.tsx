import React, { useEffect } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { navigationItems } from '../../data/navigationData';
import { NavItem } from '../ui/NavItem';
import { MenuButton } from '../ui/MenuButton';
import { BackToTop } from '../ui/BackToTop';

export const Header: React.FC = () => {
  const { 
    navigationState, 
    scrollToSection, 
    scrollToTop, 
    toggleMenu, 
    closeMenu 
  } = useNavigation();

  const { activeSection, isMenuOpen, isScrolled } = navigationState;

  // 点击外部区域关闭移动菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const header = document.getElementById('main-header');
      
      if (isMenuOpen && header && !header.contains(target)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  // 阻止移动菜单打开时的背景滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* 主导航栏 */}
      <header
        id="main-header"
        className={`
          fixed top-0 left-0 right-0 z-40
          transition-all duration-300 ease-in-out
          ${isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md' 
            : 'bg-transparent'
          }
        `}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo/品牌名称 */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors duration-200"
              >
                段翔
              </button>
            </div>

            {/* 桌面端导航菜单 */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                {navigationItems.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    isActive={activeSection === item.id}
                    onClick={scrollToSection}
                  />
                ))}
              </div>
            </div>

            {/* 移动端菜单按钮 */}
            <div className="md:hidden">
              <MenuButton
                isOpen={isMenuOpen}
                onClick={toggleMenu}
              />
            </div>
          </div>
        </nav>

        {/* 移动端导航菜单 */}
        <div
          className={`
            md:hidden absolute top-full left-0 right-0
            bg-white dark:bg-gray-900 shadow-lg
            transform transition-all duration-300 ease-in-out origin-top
            ${isMenuOpen 
              ? 'scale-y-100 opacity-100' 
              : 'scale-y-0 opacity-0 pointer-events-none'
            }
          `}
        >
          <div className="py-2 border-t border-gray-200 dark:border-gray-700">
            {navigationItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeSection === item.id}
                onClick={scrollToSection}
                isMobile={true}
              />
            ))}
          </div>
        </div>
      </header>

      {/* 移动端菜单遮罩 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* 返回顶部按钮 */}
      <BackToTop
        isVisible={isScrolled}
        onClick={scrollToTop}
      />
    </>
  );
};
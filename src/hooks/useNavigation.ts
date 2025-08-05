import { useState, useEffect, useCallback } from 'react';
import { NavigationState } from '../types/navigation';

export const useNavigation = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    activeSection: 'hero',
    isMenuOpen: false,
    isScrolled: false
  });

  // 平滑滚动到指定元素
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // 导航栏高度
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // 关闭移动端菜单
      setNavigationState(prev => ({
        ...prev,
        isMenuOpen: false,
        activeSection: sectionId
      }));
    }
  }, []);

  // 返回顶部
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    setNavigationState(prev => ({
      ...prev,
      activeSection: 'hero'
    }));
  }, []);

  // 切换移动端菜单
  const toggleMenu = useCallback(() => {
    setNavigationState(prev => ({
      ...prev,
      isMenuOpen: !prev.isMenuOpen
    }));
  }, []);

  // 关闭移动端菜单
  const closeMenu = useCallback(() => {
    setNavigationState(prev => ({
      ...prev,
      isMenuOpen: false
    }));
  }, []);

  // 监听滚动事件，更新当前激活的章节和滚动状态
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrolled = scrollY > 50;
      
      // 获取所有章节元素
      const sections = [
        'hero', 'skills', 'services', 'achievements', 
        'portfolio', 'contact'
      ];
      
      let activeSection = 'hero';
      const headerHeight = 80;
      
      // 找到当前可见的章节
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          
          if (scrollY >= elementTop - headerHeight - 100) {
            activeSection = sectionId;
          }
        }
      }
      
      setNavigationState(prev => ({
        ...prev,
        activeSection,
        isScrolled
      }));
    };

    // 初始检查
    handleScroll();
    
    // 添加滚动监听器
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 清理函数
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 监听窗口大小变化，在桌面端自动关闭移动菜单
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && navigationState.isMenuOpen) {
        setNavigationState(prev => ({
          ...prev,
          isMenuOpen: false
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigationState.isMenuOpen]);

  return {
    navigationState,
    scrollToSection,
    scrollToTop,
    toggleMenu,
    closeMenu
  };
};
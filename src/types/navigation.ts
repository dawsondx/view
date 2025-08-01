// 导航菜单项接口
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

// 导航状态接口
export interface NavigationState {
  activeSection: string;
  isMenuOpen: boolean;
  isScrolled: boolean;
}
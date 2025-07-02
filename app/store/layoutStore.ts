import { create } from 'zustand';
import { produce } from 'immer';

interface SubMenuItem {
  menucode: string;
  menuName: string;
  menuUrl: string;
}

interface MenuItem {
  menucode: string;
  menuName: string;
  menuUrl: string;
  subMenu: SubMenuItem[];
}

interface LayoutState {
  topMenu: string;
  subMenu: string;
  isHydrated: boolean;
  sidebarOpen: boolean;
  setTopMenu: (menu: string) => void;
  setSubMenu: (menu: string) => void;
  setHydrated: (hydrated: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  menuData: MenuItem[];
}

const menuData: MenuItem[] = [
  {
    menucode: 'A1',
    menuName: '상단메뉴1',
    menuUrl: '',
    subMenu: [
      {
        menucode: 'A1_1',
        menuName: '상단메뉴1_좌측메뉴1',
        menuUrl: './pages/menu1sub1.ts'
      },
      {
        menucode: 'A1_2',
        menuName: '상단메뉴1_좌측메뉴2',
        menuUrl: './pages/menu1sub2.ts'
      }
    ]
  },
  {
    menucode: 'A2',
    menuName: '상단메뉴2',
    menuUrl: '',
    subMenu: [
      {
        menucode: 'A2_1',
        menuName: '상단메뉴2_좌측메뉴1',
        menuUrl: './pages/menu2sub1.ts'
      },
      {
        menucode: 'A2_2',
        menuName: '상단메뉴2_좌측메뉴2',
        menuUrl: './pages/menu2sub2.ts'
      }
    ]
  }
];

export const useLayoutStore = create<LayoutState>((set) => ({
  topMenu: 'A1',
  subMenu: 'A1_1',
  isHydrated: false,
  sidebarOpen: true,
  setTopMenu: (menu) =>
    set(
      produce((state: LayoutState) => {
        state.topMenu = menu;
        // 상단메뉴 변경 시 첫 번째 subMenu로 자동 설정
        const currentTopMenu = menuData.find(item => item.menucode === menu);
        const firstSubMenu = currentTopMenu?.subMenu?.[0]?.menucode || 'A1_1';
        state.subMenu = firstSubMenu;
      })
    ),
  setSubMenu: (menu) =>
    set(
      produce((state: LayoutState) => {
        state.subMenu = menu;
      })
    ),
  setHydrated: (hydrated) =>
    set(
      produce((state: LayoutState) => {
        state.isHydrated = hydrated;
      })
    ),
  setSidebarOpen: (open) =>
    set(
      produce((state: LayoutState) => {
        state.sidebarOpen = open;
      })
    ),
  menuData,
}));

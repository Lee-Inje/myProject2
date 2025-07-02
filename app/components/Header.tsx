'use client';

import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { useLayoutStore } from '../store/layoutStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

export default function Header() {
  const router = useRouter();
  const { topMenu, setTopMenu, menuData, isHydrated, setHydrated, sidebarOpen } = useLayoutStore();

  // 클라이언트 사이드에서 hydration 완료 표시
  useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  // 디버깅을 위한 useEffect
  useEffect(() => {
    console.log('Header - menuData:', menuData);
    console.log('Header - topMenu:', topMenu);
    console.log('Header - isHydrated:', isHydrated);
    console.log('Header - sidebarOpen:', sidebarOpen);
  }, [menuData, topMenu, isHydrated, sidebarOpen]);

  const handleMenuClick = (menuCode: string) => {
    setTopMenu(menuCode);
    // 상단메뉴 변경 시 첫 번째 subMenu로 이동
    const currentTopMenu = menuData.find(item => item.menucode === menuCode);
    const firstSubMenu = currentTopMenu?.subMenu?.[0]?.menucode || 'A1_1';
    router.push(`/${menuCode}/${firstSubMenu}`);
  };

  // hydration이 완료되지 않았거나 menuData가 비어있는 경우 처리
  if (!isHydrated || !menuData || menuData.length === 0) {
    return (
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH}px)`,
          ml: `${sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH}px`,
          transition: 'width 0.3s ease, margin-left 0.3s ease',
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit">
            메뉴 로딩 중...
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH}px)`,
        ml: `${sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH}px`,
        transition: 'width 0.3s ease, margin-left 0.3s ease',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {menuData.map((item) => (
            <Button
              key={item.menucode}
              color="inherit"
              variant={topMenu === item.menucode ? 'contained' : 'text'}
              sx={{
                backgroundColor: topMenu === item.menucode ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                '&:hover': {
                  backgroundColor: topMenu === item.menucode 
                    ? 'rgba(255, 255, 255, 0.3)' 
                    : 'rgba(255, 255, 255, 0.1)',
                },
              }}
              onClick={() => handleMenuClick(item.menucode)}
            >
              {item.menuName}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

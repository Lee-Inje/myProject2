'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, Paper, Breadcrumbs, Link } from '@mui/material';
import LayoutView from '../../layout/LayoutView';
import { useLayoutStore } from '../../store/layoutStore';
import dynamic from 'next/dynamic';

// 동적 컴포넌트들
const Menu1Sub1 = dynamic(() => import('../../components/pages/menu1sub1'), { ssr: false });
const Menu1Sub2 = dynamic(() => import('../../components/pages/menu1sub2'), { ssr: false });
const Menu2Sub1 = dynamic(() => import('../../components/pages/menu2sub1'), { ssr: false });
const Menu2Sub2 = dynamic(() => import('../../components/pages/menu2sub2'), { ssr: false });

// 컴포넌트 매핑
const componentMap: { [key: string]: React.ComponentType } = {
  './pages/menu1sub1.ts': Menu1Sub1,
  './pages/menu1sub2.ts': Menu1Sub2,
  './pages/menu2sub1.ts': Menu2Sub1,
  './pages/menu2sub2.ts': Menu2Sub2,
};

export default function SubPage() {
  const params = useParams();
  const { topMenu, subMenu } = params as { topMenu: string; subMenu: string };
  const { setTopMenu, setSubMenu, menuData } = useLayoutStore();

  // URL 파라미터와 store 상태 동기화
  useEffect(() => {
    setTopMenu(topMenu);
    setSubMenu(subMenu);
  }, [topMenu, subMenu, setTopMenu, setSubMenu]);

  const currentTopMenu = menuData.find(item => item.menucode === topMenu);
  const currentSubMenu = currentTopMenu?.subMenu.find(item => item.menucode === subMenu);
  
  // 동적 컴포넌트 결정
  const DynamicComponent = currentSubMenu?.menuUrl ? componentMap[currentSubMenu.menuUrl] : null;

  return (
    <LayoutView>
      <Box sx={{ p: 3 }}>
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link color="inherit" href="#" underline="hover">
            홈
          </Link>
          <Link color="inherit" href="#" underline="hover">
            {currentTopMenu?.menuName || topMenu}
          </Link>
          <Typography color="text.primary">
            {currentSubMenu?.menuName || subMenu}
          </Typography>
        </Breadcrumbs>

        {/* Page Title */}
        <Typography variant="h4" component="h1" gutterBottom>
          {currentSubMenu?.menuName || subMenu}
        </Typography>

        {/* Content */}
        <Paper sx={{ p: 3, mt: 2 }}>
          {DynamicComponent ? (
            <DynamicComponent />
          ) : (
            <>
              <Typography variant="body1" paragraph>
                {currentSubMenu?.menuUrl ? 
                  `이 페이지는 ${currentSubMenu.menuName}입니다. (${currentSubMenu.menuUrl})` : 
                  '컨텐츠가 준비되지 않았습니다.'
                }
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  현재 메뉴 정보:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  상단메뉴: {currentTopMenu?.menuName} ({topMenu}) | 우측메뉴: {currentSubMenu?.menuName} ({subMenu})
                </Typography>
                {currentSubMenu?.menuUrl && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    메뉴 URL: {currentSubMenu.menuUrl}
                  </Typography>
                )}
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </LayoutView>
  );
} 
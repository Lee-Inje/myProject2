'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutView from './layout/LayoutView';
import { useLayoutStore } from './store/layoutStore';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { AccountTree } from '@mui/icons-material';

export default function Home() {
  const router = useRouter();
  const { menuData } = useLayoutStore();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // 2초 후에 첫 번째 메뉴로 리다이렉트
    const timer = setTimeout(() => {
      setRedirecting(true);
      const defaultTopMenu = menuData[0]?.menucode || 'A1';
      const defaultSubMenu = menuData[0]?.subMenu?.[0]?.menucode || 'A1_1';
      router.replace(`/${defaultTopMenu}/${defaultSubMenu}`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [router, menuData]);

  const handleManualRedirect = () => {
    setRedirecting(true);
    const defaultTopMenu = menuData[0]?.menucode || 'A1';
    const defaultSubMenu = menuData[0]?.subMenu?.[0]?.menucode || 'A1_1';
    router.replace(`/${defaultTopMenu}/${defaultSubMenu}`);
  };

  const handleGoToTree = () => {
    router.push('/tree');
  };

  return (
    <LayoutView>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 'calc(100vh - 64px)',
        flexDirection: 'column',
        gap: 3
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          메뉴 시스템
        </Typography>
        
        <Typography variant="body1" color="text.secondary" textAlign="center">
          상단메뉴를 클릭하여 원하는 페이지로 이동하세요.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            onClick={handleGoToTree}
            startIcon={<AccountTree />}
            sx={{ mt: 2 }}
          >
            트리 컴포넌트 보기
          </Button>
        </Box>

        {redirecting ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">
              첫 번째 메뉴로 이동 중...
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              2초 후 자동으로 첫 번째 메뉴로 이동합니다.
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleManualRedirect}
              sx={{ mt: 2 }}
            >
              지금 이동하기
            </Button>
          </Box>
        )}
      </Box>
    </LayoutView>
  );
}


// import Image from "next/image";
// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol>
//           <li>
//             Get started by editing <code>app/page.tsx</code>.
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.secondary}
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

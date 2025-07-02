import { useLayoutStore } from '../store/layoutStore';

export function useLayoutViewModel() {
  const topMenu = useLayoutStore((state) => state.topMenu);
  const setTopMenu = useLayoutStore((state) => state.setTopMenu);

  return {
    topMenu,
    setTopMenu,
  };
}

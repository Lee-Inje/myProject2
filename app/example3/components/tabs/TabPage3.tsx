import UsersGridPage from "@/app/example5/page";
import { useTabStore } from "../../store/tabStore";

// /components/tabs/TabPage3.tsx
export default function TabPage3() {

  const selectedTab = useTabStore((state) => state.selectedTab);

    
  return <div><UsersGridPage/></div>;
}
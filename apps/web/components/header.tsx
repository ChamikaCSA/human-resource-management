
import { Button } from "@/components/ui/button";
import { signOut } from "../lib/auth";

const Header = ({ title }: { title: string }) => {
  const handleSignOut = () => {
    signOut();
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h4 className="text-2xl font-bold text-teal-700">{title}</h4>
      <Button
        onClick={handleSignOut}
        variant="default"
        color="destructive"
        className="bg-teal-500 hover:bg-teal-600 text-white"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Header;
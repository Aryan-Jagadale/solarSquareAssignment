import { Info } from "lucide-react";
const Text = () => {
  return (
    <div className="flex bg-blue-200 gap-2 border-2 items-center p-4 mt-6 rounded">
      <Info height={20}/>
      <p className="text-sm">
        {
          "You don't need to hit enter, just start typing!"
        }
      </p>
    </div>
  );
};

export default Text;

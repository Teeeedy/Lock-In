import TextAnimation from "@/components/TextAnimation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <TextAnimation></TextAnimation>
      <p className=" font-medium w-200 text-center text-lg">
        Studying just got fun — track your hours, challenge your friends, and
        stay locked in
      </p>

      <Button
        className="w-50 inline-flex items-center justify-center h-16 px-10 py-0 text-xl font-semibold text-center text-gray-800 dark:text-gray-200 no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-400 dark:border-gray-600 border-solid rounded-full cursor-pointer select-none hover:text-white dark:hover:text-black hover:border-black dark:hover:border-white focus:shadow-xs focus:no-underline"
        asChild>
        <Link to="/login">GET STARTED</Link>
      </Button>
    </div>
  );
};

export default HomePage;

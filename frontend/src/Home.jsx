import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="my-10">
      <h1 className="text-center font-bold text-xl text-[#333]">
        Hey! Let&apos;s manage the expense together...
      </h1>
      <div className="w-3/4 flex flex-col gap-4 mx-auto my-10">
        <Button
          variant="text"
          size="sm"
          className="bg-orange-300 hover:bg-orange-400 rounded-lg"
          onClick={()=> navigate('/log-data')}
        >
          <span>Log Data</span>
        </Button>
        <Button
          variant="text"
          size="sm"
          className="bg-green-300 hover:bg-green-400 rounded-lg"
          onClick={()=> navigate('/view-data')}
        >
          <span>View Data</span>
        </Button>
      </div>
    </div>
  );
}

export default Home;

import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";

export default function Index() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white to-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Canvas />
      </div>
    </div>
  );
}

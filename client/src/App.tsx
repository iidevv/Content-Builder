import { Outlet } from "react-router-dom";
import Sidebar from './components/common/Sidebar';

import './App.css'

function App() {

  return (
    <div>
      <main className="relative h-screen overflow-hidden bg-gray-100 rounded-2xl">
        <div className="flex items-start justify-between">
          <Sidebar />
          <div className="flex flex-col w-full pl-0 md:py-4 md:space-y-4">
            <div className="h-screen m-4 mt-0 rounded-2xl shadow-lg bg-white p-6 overflow-y-auto scroll-smooth scroll-container">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

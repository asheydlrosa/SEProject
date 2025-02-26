import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaUser, FaChalkboardTeacher, FaBook, FaClock } from 'react-icons/fa';

interface ClassItem {
  title: string;
  hours?: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [joinedClasses, setJoinedClasses] = useState<ClassItem[]>([]);

  useEffect(() => {
    // Fetch classes from localStorage instead of backend
    const storedClasses = localStorage.getItem('joinedClasses');
    if (storedClasses) {
      setJoinedClasses(JSON.parse(storedClasses));
    }
  }, []);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const menuItems = [
    { name: 'My Classes', icon: <FaChalkboardTeacher /> },
    { name: 'Appointments', icon: <FaBook /> },
    { name: 'Search', icon: <FaClock />, action: () => router.push('/St_search') }
  ];

  const handleLogout = () => {
    localStorage.removeItem('authUser'); // Clear session
    router.push('/'); // Redirect to login page
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav>
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center p-3 hover:bg-gray-700 rounded cursor-pointer" 
              onClick={item.action ? item.action : undefined}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-maroon text-white">
        {/* Header */}
        <div className="flex justify-between items-center bg-white text-black p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">My Classes</h2>
          <div className="flex items-center">
            <FaUser className="text-gray-500 mr-2" />
            <span>Hello, Student!</span>
            <button onClick={handleLogout} className="ml-4 bg-red-500 px-3 py-1 rounded text-white">Logout</button>
          </div>
        </div>

        {/* Joined Classes Section */}
        <div className="mt-6">
          {joinedClasses.length > 0 ? (
            joinedClasses.map((item, index) => (
              <div key={index} className="mb-4">
                <button
                  className="w-full bg-white text-black p-4 rounded-lg shadow-md flex justify-between items-center"
                  onClick={() => toggleExpand(index)}
                >
                  {item.title}
                  <span>{expanded === index ? '▲' : '▼'}</span>
                </button>
                {expanded === index && item.hours && (
                  <div className="p-4 bg-gray-100 text-black rounded-lg mt-2">Office Hours: {item.hours}</div>
                )}
              </div>
            ))
          ) : (
            <p className="text-black mt-4 text-center">No joined classes yet. Search and join a class!</p>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface ClassItem {
  title: string;
  hours?: string;
}

export default function StSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<ClassItem[]>([
    { title: 'CSCE 4301, Babatunde Oladejo', hours: '1:00pm to 5:00pm' },
    { title: 'CSCE 4321, Dr. Smith', hours: '2:00pm to 6:00pm' },
    { title: 'MATH 2413, Prof. Doe', hours: '10:00am to 12:00pm' }
  ]);
  const [joinedClasses, setJoinedClasses] = useState<ClassItem[]>([]);

  useEffect(() => {
    const storedClasses = localStorage.getItem('joinedClasses');
    if (storedClasses) {
      setJoinedClasses(JSON.parse(storedClasses));
    }
  }, []);

  const handleBack = () => {
    router.push('/Student_dashboard'); // Redirect back to student dashboard
  };

  const handleJoinClass = (item: ClassItem) => {
    if (!joinedClasses.some(classItem => classItem.title === item.title)) {
      const updatedClasses = [...joinedClasses, item];
      setJoinedClasses(updatedClasses);
      localStorage.setItem('joinedClasses', JSON.stringify(updatedClasses));
    }
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Search Office Hours</h2>
        <p className="mb-4">Find your Class</p>
        
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 w-full border rounded-lg"
        />
        
        <ul className="text-left w-full">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li key={index} className="p-2 border-b flex justify-between items-center">
                {item.title}
                <button
                  onClick={() => handleJoinClass(item)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                  Join
                </button>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
        
        <button
          onClick={handleBack}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mt-4"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UsersAnalytics = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<any[]>("http://localhost:3000/onboardUser/getUsers");
        
        if (response.data) {
          setUsers(response.data);
          setLoading(false);
          return response.data;
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "Failed to fetch users");
        } else {
          setError("An unexpected error occurred");
        }
        return null;
      }
    };

    fetchUsers();
  }, []);

  const handleViewUser = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <button
            onClick={() => navigate("/users")}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">            
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/users")}
                className="mr-4 text-primary-600 hover:text-primary-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Users Analytics</h1>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {users.map((user, index) => (
                <div key={index} className="flex flex-col">
                  <div className="bg-[#DCF8C6] rounded-xl p-6 flex-1">
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      {user.email}
                    </div>
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      {user.phoneNumber}
                    </div>
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      Created at: {user.createdAt}
                    </div>
                    <button
                      onClick={() => handleViewUser(user.id)}
                      className="bg-[#25D366] text-white px-4 py-2.5 rounded-full text-center font-medium text-sm hover:bg-[#1ea952] transition-colors cursor-pointer"
                    >
                      View User
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};  

export default UsersAnalytics;
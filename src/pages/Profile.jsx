import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

    return 
      <div>
        <h1>User Profile</h1>
        <p>Welcome, <strong>{user?.username}</strong></p>
        </div>
  }
   


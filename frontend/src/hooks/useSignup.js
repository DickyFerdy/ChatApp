import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ full_name, username, password, confirm_password, gender }) => {
    const success = handleInputErrors({ full_name, username, password, confirm_password, gender });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, username, password, confirm_password, gender })
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, signup };
};

export default useSignup;

const handleInputErrors = ({ full_name, username, password, confirm_password, gender }) => {
  if (!full_name || !username || !password || !confirm_password || !gender) {
    toast.error('Please fill in all the fields');
    return false;
  }

  if (password !== confirm_password) {
    toast.error('Passwords do not match');
    return false;
  }

  if (password.length < 6) {
    toast.error('Passwords must be at least 6 characters');
    return false;
  }

  return true;
};

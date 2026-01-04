import { User } from "lucide-react";

function ProfileButton() {
  return (
    <button
      aria-label="Profile"
      className="p-2 rounded-full hover:bg-gray-100 transition"
    >
      <User className="w-6 h-6 text-gray-700" />
    </button>
  );
}

export default ProfileButton;

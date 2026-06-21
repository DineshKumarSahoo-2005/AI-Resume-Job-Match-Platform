import { useEffect, useState } from "react";
import { getUserProfile } from "../services/userService";
import { updateProfile } from "../services/profileService";
import RecruiterLayout from "../layouts/RecruiterLayout";
import { changePassword } from "../services/profileService";

function RecruiterSettings() {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [bio, setBio] = useState("");

  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const data = await getUserProfile();

      setUser(data.user);

      setName(data.user.name || "");
      setLinkedin(data.user.linkedin || "");
      setGithub(data.user.github || "");
      setBio(data.user.bio || "");
    } catch (error) {
      return;
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        name,
        linkedin,
        github,
        bio,
      });

      setMessage("Profile Updated Successfully ✅");

      const updatedUser = {
        ...user,
        name,
        linkedin,
        github,
        bio,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      fetchUser();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage("Update Failed ❌");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await changePassword({
        currentPassword,
        newPassword,
      });

      alert("Password Updated Successfully ✅");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  if (!user) {
    return (
      <RecruiterLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <h1 className="text-2xl font-bold dark:text-white">
            Loading Settings...
          </h1>
        </div>
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold dark:text-white">
          ⚙️ Recruiter Settings
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Manage recruiter profile, company links and security settings
        </p>
      </div>

      {/* Account Info */}

      <div
        className="
        bg-neutral-100
        dark:bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
        mb-8
        backdrop-blur-xl
      "
      >
        <h2 className="text-2xl font-bold dark:text-white mb-6">
          👤 Account Information
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-slate-400">Name</p>
            <p className="dark:text-white mt-1 font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-slate-400">Email</p>
            <p className="dark:text-white mt-1 font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-slate-400">Role</p>
            <p className="text-blue-400 mt-1 font-medium">Recruiter</p>
          </div>
        </div>
      </div>

      {/* Edit Profile */}

      <div
        className="
        bg-neutral-200
        dark:bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
        mb-8
      "
      >
        <h2 className="text-2xl font-bold dark:text-white mb-8">
          ✏️ Edit Profile
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-slate-400 mb-2">Full Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
              w-full
              bg-neutral-100
              dark:bg-white/5
              border
              border-white/10
              rounded-xl
              px-4
              py-3
              dark:text-white
              focus:outline-none
              focus:border-purple-500
              "
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-2">LinkedIn URL</label>

            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="
              w-full
              bg-neutral-100
              dark:bg-white/5
              border
              border-white/10
              rounded-xl
              px-4
              py-3
              dark:text-white
              focus:outline-none
              focus:border-blue-500
              "
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-2">GitHub URL</label>

            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="
              w-full
              bg-neutral-100
              dark:bg-white/5
              border
              border-white/10
              rounded-xl
              px-4
              py-3
              dark:text-white
              focus:outline-none
              focus:border-green-500
              "
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-2">Bio</label>

            <textarea
              rows="5"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell recruiters about yourself..."
              className="
              w-full
              bg-neutral-100
              dark:bg-white/5
              border
              border-white/10
              rounded-xl
              px-4
              py-3
              dark:text-white
              focus:outline-none
              focus:border-purple-500
              resize-none
              "
            />
          </div>

          <button
            onClick={handleSave}
            className="
            cursor-pointer
            px-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-purple-600
            to-blue-600
            hover:from-purple-700
            hover:to-blue-700
            dark:text-white
            font-semibold
            transition
            "
          >
            💾 Save Changes
          </button>

          {message && (
            <div
              className="
              mt-4
              bg-green-500/10
              border
              border-green-500/20
              text-green-400
              px-4
              py-3
              rounded-xl
              "
            >
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Security */}

      <div
        className="
        bg-neutral-100
        dark:bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
      "
      >
        <h2 className="text-2xl font-bold dark:text-white mb-6">🔒 Security</h2>

        <p className="text-slate-400 mb-6">
          Manage your account security and password settings.
        </p>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="
    w-full
    bg-white/5
    border
    border-white/10
    rounded-xl
    px-4
    py-3
    dark:text-white
    "
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="
    w-full
    bg-white/5
    border
    border-white/10
    rounded-xl
    px-4
    py-3
    dark:text-white
    "
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="
    w-full
    bg-white/5
    border
    border-white/10
    rounded-xl
    px-4
    py-3
    dark:text-white
    "
          />

          <button
            onClick={handleChangePassword}
            className="
    cursor-pointer
    bg-red-600
    hover:bg-red-700
    text-white
    px-6
    py-3
    rounded-xl
    "
          >
            Change Password
          </button>
        </div>
      </div>
    </RecruiterLayout>
  );
}

export default RecruiterSettings;

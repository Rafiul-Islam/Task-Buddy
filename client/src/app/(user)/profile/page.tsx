import ProfileHeader from "@/app/(user)/profile/components/ProfileHeader";
import ProfileForm from "@/app/(user)/profile/components/ProfileForm";

const ProfilePage = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto px-4">
        <ProfileHeader />
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
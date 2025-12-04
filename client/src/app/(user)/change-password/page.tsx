import ChangePasswordHeader from "@/app/(user)/change-password/components/ChangePasswordHeader";
import ChangePasswordForm from "@/app/(user)/change-password/components/ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto px-4">
        <ChangePasswordHeader/>
        <ChangePasswordForm/>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
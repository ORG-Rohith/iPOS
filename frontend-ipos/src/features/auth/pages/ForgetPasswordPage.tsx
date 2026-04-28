import BrandPanel from "../../../shared/components/ui/BrandPanel";
import ForgetPasswordForm from "../components/ForgetPasswordForm";

const ForgetPasswordPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, var(--tw-color-brand-dark, #1a1a2e) 0%, var(--tw-color-brand-medium, #16213e) 50%, var(--tw-color-brand-light, #0f3460) 100%)",
      }}
    >
      <div className="flex w-full max-w-[900px] min-h-[520px] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        <BrandPanel />
        <ForgetPasswordForm />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;

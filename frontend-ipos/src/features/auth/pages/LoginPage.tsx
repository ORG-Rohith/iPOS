import BrandPanel from "../../../shared/components/ui/BrandPanel";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <div
        className="
        flex flex-col md:flex-row   // 🔥 key change
        w-full max-w-[900px]
        min-h-[520px]
        rounded-2xl overflow-hidden
        shadow-[0_30px_80px_rgba(0,0,0,0.5)]
      "
      >
        <BrandPanel />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

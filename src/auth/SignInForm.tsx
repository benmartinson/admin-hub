import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import SignUpForm from "./SignUpForm";
import ResetPasswordForm from "./ResetPasswordForm";

const SignInForm = () => {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp" | "resetPassword">(
    "signIn",
  );
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8 w-96 mx-auto pt-16">
      {flow === "resetPassword" ? (
        <ResetPasswordForm setFlow={setFlow} />
      ) : flow === "signUp" ? (
        <SignUpForm setFlow={setFlow} />
      ) : (
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            formData.set("flow", flow);
            void signIn("password", formData).catch((error) => {
              setError(error.message);
            });
          }}
        >
          <input
            className="bg-white rounded-md p-2 border-2 border-slate-200"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="bg-white rounded-md p-2 border-2 border-slate-200"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button
            className="bg-slate-700 rounded-md py-2 text-white"
            type="submit"
          >
            {flow === "signIn" ? "Sign in" : "Sign up"}
          </button>
          {/* <div className="flex flex-row gap-2">
            <span>
              {flow === "signIn"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <span
              className=" underline hover:no-underline cursor-pointer text-white"
              onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
            >
              {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
            </span>
          </div> */}
          <span
            className=" underline hover:no-underline cursor-pointer mt-2"
            onClick={() => setFlow("resetPassword")}
          >
            Forgot password?
          </span>
          {error && (
            <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2">
              <p className=" font-mono text-xs">Error signing in: {error}</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default SignInForm;

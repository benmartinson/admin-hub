import { useAuthActions } from "@convex-dev/auth/react";
import { useEffect, useState } from "react";

const SignInForm = () => {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp" | "resetPassword">(
    "signIn",
  );
  const [error, setError] = useState<string | null>(null);
  const [resetStep, setResetStep] = useState<"request" | "verify">("request");
  const [resetEmail, setResetEmail] = useState<string>("");
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetInfo, setResetInfo] = useState<string | null>(null);

  useEffect(() => {
    setResetError(null);
    setResetInfo(null);
    setError(null);
  }, [flow, resetStep]);

  return (
    <div className="flex flex-col gap-8 w-96 mx-auto pt-16">
      {flow === "resetPassword" ? (
        resetStep === "request" ? (
          <form
            className="flex flex-col gap-2"
            onSubmit={async (e) => {
              e.preventDefault();
              setResetError(null);
              setResetInfo(null);
              const form = e.target as HTMLFormElement;
              const email = (
                form.elements.namedItem("email") as HTMLInputElement
              ).value;
              const formData = new FormData();
              formData.set("email", email);
              formData.set("flow", "reset");
              try {
                await signIn("password", formData);
                setResetEmail(email);
                setResetStep("verify");
                setResetInfo(
                  "Check your email for a code and enter it below with your new password.",
                );
              } catch (err: any) {
                setResetError(err.message || "Failed to send reset code.");
              }
            }}
          >
            <input
              className="bg-light dark:bg-dark text-dark dark:text-light rounded-md p-2 border-2 border-slate-200 dark:border-slate-800"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <button
              className="bg-slate-700 dark:bg-light text-light dark:text-dark rounded-md py-2"
              type="submit"
            >
              Send password reset code
            </button>
            <span
              className="text-dark dark:text-light underline hover:no-underline cursor-pointer mt-2"
              onClick={() => setFlow("signIn")}
            >
              Back to sign in
            </span>
            {resetError && (
              <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2">
                <p className="text-dark dark:text-light font-mono text-xs">
                  {resetError}
                </p>
              </div>
            )}
            {resetInfo && (
              <div className="bg-green-500/20 border-2 border-green-500/50 rounded-md p-2">
                <p className="text-dark dark:text-light font-mono text-xs">
                  {resetInfo}
                </p>
              </div>
            )}
          </form>
        ) : (
          <form
            className="flex flex-col gap-2"
            onSubmit={async (e) => {
              e.preventDefault();
              setResetError(null);
              setResetInfo(null);
              const form = e.target as HTMLFormElement;
              const code = (
                form.elements.namedItem("verification_code") as HTMLInputElement
              ).value;
              const newPassword = (
                form.elements.namedItem("newPassword") as HTMLInputElement
              ).value;
              const formData = new FormData();
              formData.set("email", resetEmail);
              formData.set("code", code);
              formData.set("newPassword", newPassword);
              formData.set("flow", "reset-verification");
              formData.delete("emailVerificationTime");
              try {
                await signIn("password", formData);
                setResetInfo("Password reset successful! You can now sign in.");
                setTimeout(() => {
                  setFlow("signIn");
                  setResetStep("request");
                  setResetEmail("");
                  setResetInfo(null);
                }, 2000);
              } catch (err: any) {
                setResetError(err.message || "Failed to reset password.");
              }
            }}
            autoComplete="off"
          >
            {/* Hidden field to catch any email autofill */}
            <input
              type="text"
              name="email"
              style={{ display: "none" }}
              aria-hidden="true"
              tabIndex={-1}
            />

            <div>
              <input
                id="verification_code"
                className="bg-light dark:bg-dark text-dark dark:text-light rounded-md p-2 border-2 border-slate-200 dark:border-slate-800 w-full"
                type="text"
                name="verification_code"
                defaultValue=""
                placeholder="Enter the code from your email"
                autoComplete="off"
                required
              />
            </div>

            <div>
              <input
                id="newPassword"
                className="bg-light dark:bg-dark text-dark dark:text-light rounded-md p-2 border-2 border-slate-200 dark:border-slate-800 w-full"
                type="password"
                name="newPassword"
                placeholder="New password"
                autoComplete="new-password"
                required
              />
            </div>
            <button
              className="bg-slate-700 dark:bg-light text-light dark:text-dark rounded-md py-2"
              type="submit"
            >
              Reset password
            </button>
            <span
              className="text-dark dark:text-light underline hover:no-underline cursor-pointer mt-2"
              onClick={() => {
                setResetStep("request");
                setResetEmail("");
              }}
            >
              Back
            </span>
            {resetError && (
              <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2">
                <p className="text-dark dark:text-light font-mono text-xs">
                  {resetError}
                </p>
              </div>
            )}
            {resetInfo && (
              <div className="bg-green-500/20 border-2 border-green-500/50 rounded-md p-2">
                <p className="text-dark dark:text-light font-mono text-xs">
                  {resetInfo}
                </p>
              </div>
            )}
          </form>
        )
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
            className="bg-light dark:bg-dark text-dark dark:text-light rounded-md p-2 border-2 border-slate-200 dark:border-slate-800"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="bg-light dark:bg-dark text-dark dark:text-light rounded-md p-2 border-2 border-slate-200 dark:border-slate-800"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button
            className="bg-slate-700 dark:bg-light text-light dark:text-dark rounded-md py-2"
            type="submit"
          >
            {flow === "signIn" ? "Sign in" : "Sign up"}
          </button>
          <div className="flex flex-row gap-2">
            <span>
              {flow === "signIn"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <span
              className="text-dark dark:text-light underline hover:no-underline cursor-pointer"
              onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
            >
              {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
            </span>
          </div>
          <span
            className="text-dark dark:text-light underline hover:no-underline cursor-pointer mt-2"
            onClick={() => setFlow("resetPassword")}
          >
            Forgot password?
          </span>
          {error && (
            <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2">
              <p className="text-dark dark:text-light font-mono text-xs">
                Error signing in: {error}
              </p>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default SignInForm;

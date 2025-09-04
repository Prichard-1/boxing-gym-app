import { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

/**
 * Production‑ready Register component with:
 * - Name, Email, Password, Confirm Password
 * - Role & Plan selection (editable lists)
 * - Robust client‑side validation & server error handling
 * - Loading states, toasts, and graceful navigation
 * - Works with a deployed backend via VITE_API_BASE_URL or prop override
 *
 * Usage:
 *   <Register />
 *
 * Backend expectations (adjust paths/shape as needed):
 *   POST /auth/register  { name, email, password, role, plan }
 *   → { message, user, token }  (token optional)
 */
export default function Register({ apiBaseUrl }) {
  const navigate = useNavigate();

  // --- Configurable lists (make sure these align with your backend) ---
  const ROLE_OPTIONS = useMemo(
    () => [
      { value: "member", label: "Member" },
      { value: "trainer", label: "Trainer" },
      { value: "manager", label: "Manager" },
    ],
    []
  );

  const PLAN_OPTIONS = useMemo(
    () => [
      { value: "basic", label: "Basic" },
      { value: "standard", label: "Standard" },
      { value: "premium", label: "Premium" },
    ],
    []
  );

  // Prefer prop → env → fallback
  const API_BASE_URL =
    apiBaseUrl || import.meta?.env?.VITE_API_BASE_URL || "http://localhost:5000";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ROLE_OPTIONS[0].value,
    plan: PLAN_OPTIONS[0].value,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- Validation ---
  const validate = () => {
    const errors = {};

    if (!form.name.trim()) errors.name = "Name is required";

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!emailRegex.test(form.email)) errors.email = "Enter a valid email";
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else {
      // 8+ chars, at least 1 letter and 1 number (tweak as needed)
      const strong = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-={}\[\]:;"'`~<>,.?/]{8,}$/;
      if (!strong.test(form.password)) {
        errors.password = "Min 8 chars with letters & numbers";
      }
    }

    if (form.confirmPassword !== form.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!form.role) errors.role = "Select a role";
    if (!form.plan) errors.plan = "Select a plan";

    return errors;
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
        plan: form.plan,
      };

      const { data } = await axios.post(`${API_BASE_URL}/auth/register`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        timeout: 20000,
      });

      // Flexible handling of different backend shapes
      const serverMsg = data?.message || "Registration successful";
      const token = data?.token || null;

      toast.success(serverMsg);

      if (token) {
        // Store securely; localStorage shown for simplicity.
        localStorage.setItem("token", token);
      }

      // Navigate after register. Adjust as desired.
      navigate("/userprofile", { replace: true });
    } catch (err) {
      // Normalize Axios error
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.message;

      if (status === 409) {
        toast.error(serverMsg || "Email already registered");
        setErrors((prev) => ({ ...prev, email: "Email already registered" }));
      } else if (status === 400) {
        toast.error(serverMsg || "Invalid form data");
      } else if (status === 422 && Array.isArray(err?.response?.data?.errors)) {
        // If backend returns field errors array
        const mapped = {};
        for (const fe of err.response.data.errors) {
          if (fe?.path) mapped[fe.path] = fe?.msg || "Invalid";
        }
        setErrors((prev) => ({ ...prev, ...mapped }));
        toast.error(serverMsg || "Please correct the highlighted fields");
      } else if (serverMsg) {
        toast.error(serverMsg);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      {/* Keep Toaster here in case it isn't mounted globally */}
      <Toaster position="top-right" />

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-semibold mb-1">Create your account</h1>
        <p className="text-sm text-gray-600 mb-6">
          Join the gym platform in seconds. Choose your role and plan to get started.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${
                errors.name ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-indigo-200"
              }`}
              autoComplete="name"
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${
                errors.email ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-indigo-200"
              }`}
              autoComplete="email"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border px-3 py-2 pr-10 outline-none focus:ring-2 ${
                    errors.password ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-indigo-200"
                  }`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-2 my-auto text-sm text-gray-600 hover:text-gray-900"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${
                  errors.confirmPassword ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-indigo-200"
                }`}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className={`w-full rounded-xl border px-3 py-2 bg-white outline-none focus:ring-2 ${
                  errors.role ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-indigo-200"
                }`}
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="plan">
                Plan
              </label>
              <select
                id="plan"
                name="plan"
                value={form.plan}
                onChange={handleChange}
                className={`w-full rounded-xl border px-3 py-2 bg-white outline-none focus:ring-2 ${
                  errors.plan ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-indigo-200"
                }`}
              >
                {PLAN_OPTIONS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              {errors.plan && <p className="mt-1 text-xs text-red-600">{errors.plan}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl px-4 py-2 font-medium text-white transition ${
              loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

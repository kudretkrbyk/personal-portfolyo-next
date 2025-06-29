"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../services/auth/authSlice";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      router.push("/admin");
    }

    dispatch(reset());
  }, [isSuccess, user, router, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!userName || !userPassword) {
      setLocalError("Lütfen tüm alanları doldurun.");
      return;
    }

    dispatch(login({ userName, userPassword }));
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen dark:bg-dark/95 flex items-center justify-center p-4">
      <div className=" bg-card-dark  rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary dark:text-white">
              Only Admin!
            </h2>
          </div>

          {(localError || isError) && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm dark:bg-red-100">
              {localError || message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Kullanıcı adı
              </label>
              <input
                id="text"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full px-4 py-2 border-primary  bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                placeholder="Kullanıcı adı girin"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Şifre
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="Şifrenizi girin"
                />
                <button
                  aria-label="Şifreyi göster/gizle"
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
                ></button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 dark:text-indigo-400 border-gray-300 rounded mr-2"
                />
                Beni hatırla
              </label>
            </div>

            <div>
              <button
                aria-label="Giriş Yap"
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

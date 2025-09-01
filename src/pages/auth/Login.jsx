import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { route } from "preact-router";
import logo from "../../assets/img/logo-pddikti.svg";
import bgCover from "../../assets/img/bg-kemdiktisaintek.jpg";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordMinLength = 6;

// Simple captcha generator (sum of two numbers)
function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { question: `${a} + ${b} = ?`, answer: a + b };
}

export default function Login({ onLogin, isAuthenticated }) {

    useEffect(() => {
    if (isAuthenticated) {
      route("/", true);
    }
  }, [isAuthenticated]);

  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaValid, setCaptchaValid] = useState(true);

  const [formError, setFormError] = useState('');

  function validateEmail(value) {
    setEmailValid(emailRegex.test(value));
  }

  function validatePassword(value) {
    setPasswordValid(value.length >= passwordMinLength);
  }

  function validateCaptcha(value) {
    setCaptchaValid(parseInt(value, 10) === captcha.answer);
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);
    validateCaptcha(captchaInput);

    if (
      emailRegex.test(email) &&
      password.length >= passwordMinLength &&
      parseInt(captchaInput, 10) === captcha.answer
    ) {
      setFormError('');
      onLogin();
      route("/", true);
    } else {
      setFormError('Mohon periksa kembali input Anda.');
      if (parseInt(captchaInput, 10) !== captcha.answer) {
        setCaptcha(generateCaptcha());
        setCaptchaInput('');
      }
    }
  }

  return (
    <div class="min-h-screen flex flex-col items-center justify-center bg-white px-4 relative">
    {/* Background */}
    <div class="absolute inset-0 z-0">
        <img 
        src={bgCover}
        alt="Gedung D, Kemdiktisaintek. Jakarta"
        class="w-full h-screen object-cover object-center"
        onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
        }}
        />
        <div class="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
    </div>

  {/* Logo Header */}
  <div class="absolute top-4 left-4 z-10 w-full">
    <div class="flex items-center space-x-3 p-1 md:justify-start justify-center">
      <img
        src={logo}
        alt="Logo Universitas Modern"
        class="h-10 w-auto object-contain"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div class="h-8 w-32 bg-blue-800 font-bold text-xs flex items-center justify-center rounded hidden">
        PDDIKTI LOGO
      </div>
      <span class="text-blue-900 font-semibold text-2xl md:text-3xl text-center">
        PDDikti
      </span>
    </div>
  </div>

  {/* Container Login */}
  <div class="relative z-10 max-w-md w-full space-y-8 p-8 rounded-lg shadow-xl border border-white bg-white backdrop-blur-sm mt-20 md:mt-0">
    <div class="text-center">
      <h1 class="text-1xl font-bold text-blue-900 mb-2 uppercase">
        Pangkalan Data Pendidikan Tinggi
      </h1>
      <p class="text-gray-600">Kementerian Pendidikan Tinggi, Sains, Dan Teknologi</p>
    </div>

    <form class="mt-6 space-y-6" onSubmit={handleSubmit} noValidate>
      {/* Email */}
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              class={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                emailValid ? 'border-gray-300' : 'border-red-500'
              } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm`}
              placeholder="email@universitas.ac.id"
              value={email}
              onInput={(e) => {
                setEmail(e.currentTarget.value);
                validateEmail(e.currentTarget.value);
              }}
            />
            {!emailValid && (
              <p class="mt-1 text-xs text-red-600">Format email tidak valid.</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Password
            </label>

            <div class="relative">
                <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                class={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    passwordValid ? 'border-gray-300' : 'border-red-500'
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm`}
                placeholder="Minimal 6 karakter"
                value={password}
                onInput={(e) => {
                    setPassword(e.currentTarget.value);
                    validatePassword(e.currentTarget.value);
                }}
                />

                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-blue-900 hover:text-blue-800 focus:outline-none"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                {showPassword ? (
                    <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.175-6.125M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 3l18 18"
                    ></path>
                    </svg>
                ) : (
                    <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                    </svg>
                )}
                </button>
            </div>

            {!passwordValid && (
                <p class="mt-1 text-xs text-red-600">Password minimal 6 karakter.</p>
            )}
            </div>


          {/* Captcha */}
          <div>
            <label for="captcha" class="block text-sm font-medium text-gray-700 mb-1">
              Captcha: <span class="font-semibold">{captcha.question}</span>
            </label>
            <input
              id="captcha"
              name="captcha"
              type="text"
              required
              class={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                captchaValid ? 'border-gray-300' : 'border-red-500'
              } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm`}
              placeholder="Jawaban captcha"
              value={captchaInput}
              onInput={(e) => {
                setCaptchaInput(e.currentTarget.value);
                setCaptchaValid(true);
              }}
            />
            {!captchaValid && (
              <p class="mt-1 text-xs text-red-600">Jawaban captcha salah.</p>
            )}
          </div>

          {/* Error message */}
          {formError && (
            <p class="text-red-600 text-sm text-center">{formError}</p>
          )}

          {/* Buttons */}
          <div class="w-full">
            <div class="flex gap-4 w-full">
                <button
                type="submit"
                class="flex-1 py-2 px-4 text-white font-semibold rounded-lg shadow-md
                        bg-gradient-to-r from-[#6317c3] to-[#d942c0]
                        hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#6317c3] focus:ring-offset-2"
                >
                Sign In
                </button>

                <button
                type="button"
                onClick={() => alert('Redirect ke halaman register (simulasi)')}
                class="flex-1 py-2 px-4 border border-[#41048e] rounded-lg text-[#41048e]
                        hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#41048e]
                        font-semibold transition"
                >
                Register
                </button>
            </div>

            <button
                type="button"
                onClick={() => alert('Login with SSO (simulasi)')}
                class="w-full mt-4 py-2 px-4 bg-[#41048e] text-white font-semibold rounded-lg shadow-md
                    hover:bg-purple-50 hover:text-[#41048e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition"
            >
                Login with SSO
            </button>
            </div>

          {/* Forgot password */}
          <div class="text-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Redirect ke halaman lupa password (simulasi)');
              }}
              class="text-sm text-[#41048e] hover:underline"
            >
              Lupa password?
            </a>
          </div>
    </form>
  </div>

    {/* Footer */}
    <footer class="relative z-10 mt-6 text-center text-sm text-gray-600">
        <p>
        Copyright © 2013 - 2024 Kementerian Pendidikan Tinggi, Sains, dan Teknologi
        </p>
        <p class="text-xs mt-1">v3.0.0</p>
    </footer>
    </div>

  );
}
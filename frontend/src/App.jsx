import React from 'react';
import { useAuth } from './context/AuthContext';
import ChatWindow from './components/Chat/ChatWindow';
import { LogIn, LogOut, CheckCircle2, User, MapPin, Calendar, ShieldCheck } from 'lucide-react';

function App() {
  const { user, login, loginAsGuest, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent/20">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-white p-2 rounded-lg shadow-sm">
                <CheckCircle2 size={24} />
              </div>
              <span className="text-xl font-bold text-secondary tracking-tight">Electra AI</span>
            </div>
            
            <div>
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    <User size={14} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {user.displayName || 'Guest Citizen'}
                    </span>
                  </div>
                  <button 
                    onClick={logout}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors bg-white hover:bg-red-50 border border-gray-200 hover:border-red-100 px-3 py-2 rounded-lg shadow-sm"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={loginAsGuest}
                    className="hidden sm:flex items-center gap-2 text-sm font-medium text-textMain hover:text-primary transition-colors px-3 py-2"
                  >
                    Continue as Guest
                  </button>
                  <button 
                    onClick={login}
                    className="flex items-center gap-2 text-sm font-semibold bg-primary text-white hover:bg-primary/90 px-4 py-2.5 rounded-lg transition-all shadow-sm hover:shadow"
                  >
                    <LogIn size={18} />
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user ? (
          <div className="flex flex-col items-center justify-center min-h-[75vh] text-center max-w-4xl mx-auto">
            <div className="bg-blue-50 text-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-8 shadow-sm border border-blue-100 animate-in fade-in slide-in-from-bottom-2 duration-700">
              Your Personal Civic Tech Guide
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-secondary mb-6 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Elections made <span className="text-accent relative inline-block">
                simple
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/30" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 C 20 20, 80 0, 100 10" fill="none" stroke="currentColor" strokeWidth="4"/></svg>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-textMuted mb-12 leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Navigate the electoral process with ease. Ask questions about your eligibility, find your nearest polling location, and get reminders for important election dates.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 mb-16">
              <button 
                onClick={login}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center gap-2">
                  <LogIn size={20} />
                  Sign In with Google
                </span>
              </button>
              <button 
                onClick={loginAsGuest}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-secondary bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
              >
                <User size={20} />
                Continue as Guest
              </button>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck size={24} className="text-primary" />
                </div>
                <h3 className="font-bold text-secondary mb-2">Check Eligibility</h3>
                <p className="text-sm text-textMuted leading-relaxed">Not sure if you can vote? Ask Electra AI to verify the basic requirements for your state.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <MapPin size={24} className="text-accent" />
                </div>
                <h3 className="font-bold text-secondary mb-2">Find Polling Stations</h3>
                <p className="text-sm text-textMuted leading-relaxed">Provide your ZIP code to get instant, mapped directions to your nearest polling booth.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Calendar size={24} className="text-primary" />
                </div>
                <h3 className="font-bold text-secondary mb-2">Never Miss a Date</h3>
                <p className="text-sm text-textMuted leading-relaxed">Instantly add major election deadlines and voting days directly to your Google Calendar.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ChatWindow />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

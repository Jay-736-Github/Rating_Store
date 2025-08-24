import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "../features/auth/Login";
import SignupForm from "../features/auth/Signup";

function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Tabs
        defaultValue="login"
        className="w-full max-w-md bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden transition-all duration-500"
      >
        {/* Tabs Header */}
        <TabsList className="grid w-full grid-cols-2 bg-gray-50">
          <TabsTrigger
            value="login"
            className="text-gray-700 font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-tl-xl transition-colors duration-300"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="text-gray-700 font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-tr-xl transition-colors duration-300"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        {/* Tabs Content */}
        <div className="p-6 transition-all duration-500">
          <TabsContent value="login">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-center text-sm">
                Enter your credentials to access your account
              </p>
              <LoginForm />
            </div>
          </TabsContent>
          <TabsContent value="signup">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Create Account
              </h2>
              <p className="text-gray-500 text-center text-sm">
                Fill in your details to sign up
              </p>
              <SignupForm />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default AuthPage;

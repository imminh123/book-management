import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./context/user.context";
import { useEffect, useState } from "react";
import { UserProfile } from "./interface/users.interface";
import ky from "ky";
import { Spinner } from "./components/Spinner/Spinner";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { QueryClient, QueryClientProvider } from "react-query";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState<UserProfile>();
  const [loading, setLoading] = useState(true);
  const queryClient = new QueryClient();
  let params = window.location.search.substring(1);
  const access_token = params.split("=")[1];
  const navigate = useNavigate();

  function signout() {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);

      if (access_token) {
        const { access_token: discordToken }: any = jwt_decode(access_token);
        const res = await ky.get("https://discord.com/api/users/@me", {
          headers: {
            Authorization: `Bearer ${discordToken}`,
          },
        });
        const user: any = await res.json();
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("access_token", JSON.stringify(access_token));
          setUser({
            avatar: user.avatar,
            username: user.username,
            discriminator: user.discriminator,
            email: user.email,
            userId: user.id,
          });
        }
        navigate("/");
      }

      try {
        const storedValue: any = localStorage.getItem("user");
        const user = JSON.parse(storedValue);
        if (user.id) {
          setUser({
            avatar: user.avatar,
            username: user.username,
            discriminator: user.discriminator,
            email: user.email,
            userId: user.id,
          });
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }

      setLoading(false);
    };
    checkUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-ignore */}
      <UserContext.Provider value={{ user, setUser, signout, loading }}>
        {loading ? (
          <section
            style={{
              position: "absolute",
              left: "50%",
              top: "40%",
              transform: "translate(-50%, 0)",
            }}
          >
            <Spinner />
          </section>
        ) : (
          <Routes>
            <Route path="login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

import Banner from "../assets/banner.jpg";
import DiscordLogo from "../assets/discord.png";

export const Login = () => {
  const handleLogin = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/api/book/auth/login`,
      "_self"
    );
  };

  return (
    <div className="flex max-h-screen h-screen">
      <img className="w-1/2 object-cover h-screen" src={Banner} alt="Socotec" />

      <div className="w-3/5 h-full relative bg-white ">
        <div
          onClick={handleLogin}
          className="flex items-center justify-center p-2 w-1/2 rounded-md  bg-discord-100 text-white cursor-pointer absolute top-1/2 -translate-y-1/2 m-auto left-0 right-0"
        >
          <img className="w-5 h-4 mr-2 " src={DiscordLogo} alt="discord logo" />
          <p>Sign in with Discord</p>
        </div>
      </div>
    </div>
  );
};

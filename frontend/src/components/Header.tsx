import { SearchBar } from "./SearchBar";
import UploadIcon from "../assets/upload.png";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

interface IProps {
  onClick: () => void;
}
export const Header = ({ onClick }: IProps) => {
  return (
    <header className="flex items-center justify-between mb-10">
      <section className="flex items-center gap-5 w-1/2">
        <SearchBar />
        <button
          onClick={onClick}
          className="flex text-white justify-center items-center text-sm rounded-full   w-52 h-10 hover:bg-opacity-90 transition-all bg-violet-500"
        >
          <img className="w-4 mr-2" src={UploadIcon} alt="upload button" />
          Upload
        </button>
      </section>
    </header>
  );
};

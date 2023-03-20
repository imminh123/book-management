import { IBook } from "../../interface/book.interface";
import DefaultCover from "../../assets/defaultCover.jpg";

interface IProps {
  data: IBook;
  onClick: () => void;
}
function Book({ data, onClick }: IProps) {
  return (
    <figure
      className="cursor-pointer hover:scale-105 transition-all"
      onClick={onClick}
    >
      <picture>
        <img
          className="h-72 w-48 object-cover"
          style={{
            boxShadow: "-5px 5px 12px 0px rgba(0, 0, 0, 0.5)",
          }}
          src={data.cover || DefaultCover}
          alt={data.title}
        />
      </picture>
      <figcaption className="mt-4 text-sm">{data.title}</figcaption>
    </figure>
  );
}

export default Book;

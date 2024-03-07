import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CloseIcon = () => (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-red-500"
  >
    <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313" />
  </svg>
);

const SliderBio: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <aside
      className={`${
        isOpen ? "block" : "hidden"
      } fixed top-0 left-0 bg-yellow-100 pl-12 pr-3 md:pt-4 lg:pl-16 lg:pr-7 border-r border-red-500 w-[85vw] md:w-1/2 lg:w-1/3 h-screen cursor-pointer`}
    >
      <header
        className="flex justify-between items-center mb-12"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <span>Mira</span> <CloseIcon />
      </header>
      <p className="mb-12">
        Pellentesque dapibus suscipit ligula. Donec posuere augue in quam. Etiam
        vel tortor sodales tellus ultricies commodo. Suspendisse potenti. Aenean
        in sem ac leo mollis blandit. Donec neque quam, dignissim in, mollis
        nec, sagittis eu, wisi. Phasellus lacus. Etiam laoreet quam sed arcu.
        Phasellus at dui in ligula mollis ultricies. Integer placerat tristique
        nisl. Praesent augue. Fusce commodo. Vestibulum convallis, lorem a
        tempus semper, dui dui euismod elit, vitae placerat urna tortor vitae
        lacus. Nullam libero mauris, consequat quis, varius et, dictum id, arcu.
        Mauris mollis tincidunt felis.
      </p>
      <p>Sed id ligula quis est convallis tempor.</p>
      <a href="mailto:mira@mira.etc.br">mira@mira.etc.br</a>
    </aside>
  );
};

export default SliderBio;

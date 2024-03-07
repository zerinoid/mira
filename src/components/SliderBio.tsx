import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SliderBio: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <aside
      className={`${
        isOpen ? "block" : "hidden"
      } fixed top-0 left-0 bg-yellow-100 pl-8 pr-3 border-r border-red-500 w-[85vw] lg:w-1/5 h-screen`}
    >
      <header className="mb-12" onClick={() => setIsOpen((isOpen) => !isOpen)}>
        Mira
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

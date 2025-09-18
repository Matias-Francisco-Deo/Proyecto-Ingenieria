interface Props {
  sectionName: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  activeSection: string;
  onClick: () => void;
}

export default function SectionSelectButton({
  sectionName,
  setActive,
  activeSection,
  onClick,
}: Props) {
  return (
    <button
      onClick={() => {
        onClick();
        if (sectionName == activeSection) return;
        setActive(sectionName);
      }}
      className={`flex flex-col items-center min-w-[80px] px-6 py-3 rounded-lg transition-colors ${
        activeSection == sectionName
          ? "bg-amber-500 text-white font-bold"
          : "bg-gray-800 hover:bg-gray-700"
      }`}
      style={{ cursor: "pointer", scrollSnapAlign: "center" }}
    >
      <span className="text-lg">{sectionName}</span>
    </button>
  );
}

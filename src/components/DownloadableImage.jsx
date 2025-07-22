import { FaSave, FaDownload } from "react-icons/fa";

//  das Bild  & zwei Buttons anziegen und direkt exportieren
export default function DownloadableImage({
  imageUrl,
  alt,
  downloadName,
  onSave,
}) {
  //runterladen des Bilds ohne Formular-Submit
  const handleDownload = () => {
    // muss temporären Link
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = downloadName;
    //  Link zum DOM hinzufügen
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Bild anzeigen hier --> */}
      <img
        src={imageUrl}
        alt={alt}
        className="max-w-full max-h-[400px] rounded-md object-contain"
      />

      {/* zwei Buttons unter dem Bild anzeigen lassen*/}
      <div className="flex gap-6 mt-2">
        {/* Link ---> muss so bleiben  */}
        <button
          onClick={handleDownload}
          className="mt-2 flex items-center gap-2 font-medium
           text-orange-300 hover:text-[#00ffff] transition"
          aria-label="Download image"
        >
          <FaDownload className="text-2xl" />
          <span>Download</span>
        </button>

        {/* Funktion Saven beim Speichern */}
        <button
          onClick={onSave}
          className="mt-2 flex items-center gap-2 font-medium text-orange-300 hover:text-[#00ffff] transition"
          aria-label="Save image"
        >
          <FaSave className="text-2xl" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}

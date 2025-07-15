import Button from "./button";
// constants

export default function SuccessPage({
  image,
  title,
  content,
  button,
  onclick,
}) {
  return (
    <div className="flex flex-col justify-center items-center h-screen overflow-hidden w-screen bg-white px-4">
      <img
        src={image}
        alt={title}
        className="object-contain w-full max-h-[60%]"
      />

      <div className="mx-5 my-5">
        <h2 className="text-font_primary text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
      {button && (
        <div className="w-full absolute bottom-10 left-0 px-6">
          <Button onClick={onclick} label={button} />
        </div>
      )}
    </div>
  );
}

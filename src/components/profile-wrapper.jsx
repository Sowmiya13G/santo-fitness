import ScreenHeader from "./screen-header";

export default function ProfileWrapper({
  title,
  image,
  isBack = true,
  children,
  bgColor = "bg-primary-gradient",
  imgClass,
}) {
  return (
    <div className={`flex flex-col h-full ${bgColor} relative`}>
      <div className="h-10" />
      <ScreenHeader title={title} isBack={isBack} titleColor="text-white" />

      {image && (
        <div className="flex justify-center">
          <img
            src={image}
            alt="profile"
            className={` ${imgClass} w-44 min-h-44 object-cover my-4 rounded-full`}
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-4 bg-white rounded-t-3xl z-10">
        <div className="flex justify-center pt-2">
          <div className="bg-border_secondary h-1.5 w-28 rounded-full" />
        </div>

        {children}
      </div>
    </div>
  );
}

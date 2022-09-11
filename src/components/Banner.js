import { BsCardChecklist } from 'react-icons/bs';

export default function Banner({ title, description, icon }) {
  return (
    <div className="flex justify-between relative text-white p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-0">{title}</h1>
        <p className="text-sm mb-0">{description}</p>
      </div>
      <div className="absolute -bottom-4 right-3 text-6xl md:text-8xl md:-bottom-5 text-neutral-100">
        {icon ? icon : <BsCardChecklist />}
      </div>
    </div>
  );
}

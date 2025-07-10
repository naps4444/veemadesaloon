// components/ServiceCard.tsx
import { Service } from '@/types/service';

interface Props {
  service: Service;
  selected: boolean;
  toggle: (id: string) => void;
}

export default function ServiceCard({ service, selected, toggle }: Props) {
  return (
    <div
      onClick={() => toggle(service.id)}
      className={`border p-4 rounded flex justify-between items-center cursor-pointer transition 
        ${selected ? 'bg-[#223728]' : 'bg-black'} hover:bg-[#291F19]`}
    >
      <div>
        <h2 className="font-medium">{service.name}</h2>
        <p>₦{service.price}</p>
      </div>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => {}} // prevent double toggle
        className="accent-[#e13100] w-5 h-5"
        onClick={(e) => e.stopPropagation()} // prevent parent div toggle when checkbox clicked
      />
    </div>
  );
}

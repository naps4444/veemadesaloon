// src/components/ServiceCard.tsx

import { FaCheck } from 'react-icons/fa';
// Import all types from the central types file
import type { Service, Variation, CartItem } from '@/types/service';

interface ServiceCardProps {
  service: Service;
  selectedServices: CartItem[]; // Correctly typed as CartItem[]
  toggleVariation: (service: Service, variation: Variation) => void;
  isSelected: (variationId: string) => boolean; // The missing prop
}

export default function ServiceCard({
  service,
  selectedServices,
  toggleVariation,
  isSelected, // Destructure the new prop
}: ServiceCardProps) {
  return (
    <div className="bg-[#223728] text-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-cinzel-decorative mb-2">{service.name}</h3>
      <div className="space-y-2">
        {service.variations.length > 0 ? (
          service.variations.map((variation) => (
            <div
              key={variation.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleVariation(service, variation)}
            >
              <div className="flex-1">
                <p className="text-sm">{variation.name}</p>
                <p className="text-xs text-gray-400">
                  ₦{variation.price.toLocaleString()}
                </p>
              </div>
              <div
                className={`w-6 h-6 rounded border-2 border-white flex items-center justify-center transition-colors duration-200 ${
                  // Use the new isSelected prop here
                  isSelected(variation.id) ? 'bg-white' : 'bg-transparent'
                }`}
              >
                {/* Use the new isSelected prop here */}
                {isSelected(variation.id) && (
                  <FaCheck
                    className="text-[#223728]"
                    size={14}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400">
            Price not available for this service.
          </p>
        )}
      </div>
    </div>
  );
}
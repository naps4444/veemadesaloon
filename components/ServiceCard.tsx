// src/components/ServiceCard.tsx

import { FaCheck } from 'react-icons/fa';
// Import all types from the central types file
import type { Service, Variation, CartItem } from '@/types/service';

interface ServiceCardProps {
  service: Service;
  selectedServices: CartItem[]; // Correctly typed as CartItem[]
  toggleVariation: (service: Service, variation: Variation) => void;
  isSelected: (variationId: string) => boolean; // The prop's argument will now be variation._id
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
              key={variation._id} // Using _id for the key
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleVariation(service, variation)}
            >
              <div className="flex-1">
                <p className="text-sm">{variation.name}</p>
                <p className="text-xs text-gray-400">
                  {/* Display "Ask for price on WhatsApp" if price is 0 */}
                  {variation.price === 0 ? (
                    <span className="text-yellow-400">Ask for price on WhatsApp</span>
                  ) : (
                    `₦${variation.price.toLocaleString()}`
                  )}
                </p>
              </div>
              <div
                className={`w-6 h-6 rounded border-2 border-white flex items-center justify-center transition-colors duration-200 ${
                  isSelected(variation._id) ? 'bg-white' : 'bg-transparent' // Using variation._id
                }`}
              >
                {isSelected(variation._id) && ( // Using variation._id
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

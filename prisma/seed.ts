// prisma/seed.ts

// Import the singleton Prisma client instance from your lib/prisma.ts file
// This ensures you are using the same instance as the rest of your application.
import prisma from '../lib/prisma';

async function main() {
  console.log('Starting the database seeding process...');

  // The structured data you provided for the salon services.
  const salonServicesData = {
    categories: [
      {
        category: "Braids and Extensions",
        services: [
          {
            name: "Feed In (seamless look with hair extensions)",
            variations: [
              { name: "Bum length", price: 50000 },
              { name: "Waist length", price: 40000 },
              { name: "Bra length", price: 30000 }
            ]
          },
          {
            name: "Feed In Shuku",
            variations: [
              { name: "Bra length", price: 38000 },
              { name: "Shoulder L", price: 35000 },
              { name: "Bum L", price: 50000 },
              { name: "Waist L", price: 50000 }
            ]
          },
          {
            name: "Feed In All Back",
            variations: [
              { name: "Bra L", price: 35000 },
              { name: "Shoulder L", price: 30000 },
              { name: "Waist L", price: 38000 }
            ]
          },
          {
            name: "Shuku Stitch",
            variations: [
              { name: "Shoulder L", price: 35000 },
              { name: "Bra L", price: 38000 },
              { name: "Waist L", price: 48000 }
            ]
          },
          {
            name: "All Back Stitch",
            variations: [
              { name: "2 to 5 lines", price: 15000 },
              { name: "6 to 10 lines", price: 20000 }
            ]
          },
          {
            name: "Braids",
            variations: [
              { name: "Over bum length", price: 55000 }
            ]
          },
          {
            name: "Island Boho Twist Braids",
            variations: [
              { name: "Shoulder L", price: 35000 },
              { name: "Bra L", price: 38000 },
              { name: "Waist L", price: 50000 }
            ]
          },
          {
            name: "Boho Braids",
            variations: [
              { name: "Shoulder L", price: 35000 },
              { name: "Bra L", price: 38000 },
              { name: "Waist L", price: 50000 }
            ]
          },
          {
            name: "Lemonade 2 Step Braids",
            variations: [
              { name: "Shoulder L", price: 35000 },
              { name: "Bra L", price: 38000 },
              { name: "Waist", price: 50000 },
              { name: "Bum", price: 55000 }
            ]
          },
          {
            name: "Goddess Braids",
            variations: [
              { name: "Waist L", price: 56000 }
            ]
          },
          {
            name: "Alicia Keys Feed In Braids",
            variations: [
              { name: "Bra L", price: 40500 },
              { name: "Shoulder L", price: 35000 },
              { name: "Waist L", price: 48500 }
            ]
          },
          {
            name: "Kids Braids with Attachment",
            variations: [
              { name: "Default", price: 15500 }
            ]
          },
          {
            name: "Kids Knotless Braids",
            variations: [
              { name: "Default", price: 20000 }
            ]
          },
          {
            name: "Kids Ordinary Weaving",
            variations: [
              { name: "Default", price: 10000 }
            ]
          },
          {
            name: "Braids Maintenance",
            variations: [
              { name: "Default", price: 11500 }
            ]
          }
        ]
      },
      {
        category: "Natural Hair",
        services: [
          {
            name: "Wash and Dry",
            variations: [
              { name: "Default", price: 8000 }
            ]
          },
          {
            name: "Natural Hair Trim",
            variations: [
              { name: "Default", price: 10000 }
            ]
          },
          {
            name: "Relax Hair with Regular Kit",
            variations: []
          },
          {
            name: "Cornrows on Natural Hair",
            variations: [
              { name: "Per line", price: 1000 }
            ]
          },
          {
            name: "Designs Cornrows",
            variations: [
              { name: "Per line", price: 1500 }
            ]
          },
          {
            name: "Cornrows Didi",
            variations: [
              { name: "Default", price: 1500 }
            ]
          },
          {
            name: "Natural Hair Twist",
            variations: [
              { name: "Default", price: 15000 },
              { name: "Extra volume", price: 18000 }
            ]
          },
          {
            name: "Natural Hair Flat Ironing",
            variations: [
              { name: "Short hair", price: 3000 },
              { name: "Medium full hair", price: 5000 },
              { name: "Full hair", price: 7000 }
            ]
          }
        ]
      },
      {
        category: "Take Out",
        services: [
          {
            name: "Cornrows Take Out",
            variations: [
              { name: "Default", price: 2000 }
            ]
          },
          {
            name: "Installation Take Out",
            variations: [
              { name: "Default", price: 6000 }
            ]
          },
          {
            name: "Braids Take Out",
            variations: [
              { name: "Small", price: 7500 },
              { name: "Medium", price: 5000 },
              { name: "Large", price: 4000 }
            ]
          },
          {
            name: "Sew In Take Out",
            variations: [
              { name: "Default", price: 4000 }
            ]
          }
        ]
      },
      {
        category: "Wigging/Installation/Sewin",
        services: [
          {
            name: "Wigging",
            variations: [
              { name: "Default", price: 25000 }
            ]
          },
          {
            name: "Sew In Per Track",
            variations: [
              { name: "Per track", price: 2500 }
            ]
          },
          {
            name: "Blow Dry to Curly (wig/sew in)",
            variations: [
              { name: "Default", price: 20000 }
            ]
          },
          {
            name: "Flat Ironing (wig/sew in)",
            variations: [
              { name: "Short wig", price: 10000 },
              { name: "Medium", price: 13000 },
              { name: "Long", price: 15000 }
            ]
          },
          {
            name: "Curly Hair Extension Styling",
            variations: [
              { name: "Default", price: 15000 }
            ]
          },
          {
            name: "Hair Revamp Without Styling",
            variations: [
              { name: "Default", price: 12000 }
            ]
          },
          {
            name: "Hair Revamp with Styling",
            variations: [
              { name: "Default", price: 15000 }
            ]
          },
          {
            name: "Sew In Wash & Style",
            variations: [
              { name: "Default", price: 12000 }
            ]
          },
          {
            name: "Sew In Bundles/Leaveout",
            variations: [
              { name: "Default", price: 25000 }
            ]
          },
          {
            name: "Sew In with Closure",
            variations: [
              { name: "Default", price: 27000 }
            ]
          },
          {
            name: "Sew In with Frontal",
            variations: [
              { name: "Default", price: 30000 }
            ]
          },
          {
            name: "Sew In Versatile Style",
            variations: [
              { name: "5x5/4x5", price: 27000 }
            ]
          },
          {
            name: "Take Out Wig Without Re-wigging",
            variations: [
              { name: "Default", price: 3000 }
            ]
          }
        ]
      },
      {
        category: "Nails",
        services: [
          {
            name: "Gel Polish",
            variations: [
              { name: "Default", price: 6000 }
            ]
          },
          {
            name: "Regular Polish",
            variations: [
              { name: "Default", price: 4000 }
            ]
          },
          {
            name: "Poly Gel",
            variations: [
              { name: "Default", price: 20000 }
            ]
          },
          {
            name: "Nail Wrap with Powder/Acrylic",
            variations: [
              { name: "Default", price: 20000 }
            ]
          },
          {
            name: "File and Buff (nail bed care)",
            variations: [
              { name: "Default", price: 4000 }
            ]
          },
          {
            name: "Kids Nail Polish",
            variations: [
              { name: "Default", price: 4500 }
            ]
          },
          {
            name: "Full Set Acrylic & Gel Polish",
            variations: [
              { name: "Default", price: 25000 }
            ]
          },
          {
            name: "Full Set Acrylic & Regular Polish",
            variations: [
              { name: "Default", price: 22000 }
            ]
          },
          {
            name: "Acrylic Colored Powder",
            variations: [
              { name: "Default", price: 25000 }
            ]
          },
          {
            name: "Acrylic and French Tip",
            variations: [
              { name: "Default", price: 25000 }
            ]
          },
          {
            name: "Ombré Acrylic",
            variations: [
              { name: "Default", price: 25000 }
            ]
          },
          {
            name: "Acrylic & Chrome",
            variations: [
              { name: "Default", price: 25000 }
            ]
          },
          {
            name: "Acrylic & Airbrush Design",
            variations: [
              { name: "Default", price: 25000 }
            ]
          },
          {
            name: "Acrylic & Cateye",
            variations: [
              { name: "Default", price: 25000 }
            ]
          },
          {
            name: "Acrylic & Blooming Gel",
            variations: [
              { name: "Default", price: 25000 }
            ]
          },
          {
            name: "Acrylic & Matt Polish",
            variations: [
              { name: "Default", price: 25000 }
            ]
          },
          {
            name: "Full Set Acrylic Refill",
            variations: [
              { name: "Default", price: 22000 }
            ]
          },
          {
            name: "Stick On Full Set with Gel Polish",
            variations: [
              { name: "Default", price: 18000 }
            ]
          },
          {
            name: "Stick On Full Set & Regular Polish",
            variations: [
              { name: "Default", price: 15000 }
            ]
          },
          {
            name: "Full Toe Set and Gel Polish",
            variations: [
              { name: "Default", price: 20000 }
            ]
          },
          {
            name: "Full Toe Set and Regular Polish",
            variations: [
              { name: "Default", price: 20000 }
            ]
          },
          {
            name: "French Tip on Natural Nail Toe",
            variations: [
              { name: "Default", price: 10000 }
            ]
          },
          {
            name: "Gel Polish (Toes)",
            variations: [
              { name: "Default", price: 6000 }
            ]
          },
          {
            name: "Regular Polish (Toes)",
            variations: [
              { name: "Default", price: 5000 }
            ]
          },
          {
            name: "Stick On & Gel Polish on Toes",
            variations: [
              { name: "Default", price: 14000 }
            ]
          },
          {
            name: "Stick On & Regular Polish (Toes)",
            variations: [
              { name: "Default", price: 12000 }
            ]
          },
          {
            name: "Acrylic on Toes",
            variations: [
              { name: "Per toe", price: 2000 }
            ]
          },
          {
            name: "Stick On per toe",
            variations: [
              { name: "Per toe", price: 1500 }
            ]
          },
          {
            name: "Gel Polish",
            variations: [
              { name: "Per nail", price: 1000 }
            ]
          },
          {
            name: "Art on Nail",
            variations: [
              { name: "Per nail", price: 1000 }
            ]
          },
          {
            name: "Refill",
            variations: [
              { name: "Per nail", price: 2000 }
            ]
          },
          {
            name: "Stick On Nails",
            variations: [
              { name: "Per nail", price: 1500 }
            ]
          },
          {
            name: "Acrylic",
            variations: [
              { name: "Per nail", price: 1500 }
            ]
          },
          {
            name: "PolyGel",
            variations: [
              { name: "Per nail", price: 1500 }
            ]
          },
          {
            name: "Soak Off / Dissolving Nails",
            variations: [
              { name: "Default", price: 5000 }
            ]
          },
          {
            name: "Regular Polish Removal",
            variations: [
              { name: "Default", price: 2000 }
            ]
          },
          {
            name: "Gel Polish Removal",
            variations: [
              { name: "Default", price: 2500 }
            ]
          }
        ]
      },
      {
        category: "Pedicure and Manicure",
        services: [
          {
            name: "Herbal Detox Pedicure & Feet Massage",
            variations: [
              { name: "Default", price: 15000 }
            ]
          },
          {
            name: "Gel Pedicure & Feet Massage",
            variations: [
              { name: "Default", price: 12000 }
            ]
          },
          {
            name: "Paraffin Wax Pedicure & Massage (spa pedicure)",
            variations: [
              { name: "Default", price: 20000 }
            ]
          },
          {
            name: "Basic/Classic Pedicure & Massage",
            variations: [
              { name: "Default", price: 10000 }
            ]
          },
          {
            name: "Basic Manicure & Hand Massage",
            variations: [
              { name: "Default", price: 8000 }
            ]
          },
          {
            name: "Paraffin Wax Manicure & Massage (spa manicure)",
            variations: [
              { name: "Default", price: 15000 }
            ]
          }
        ]
      },
      {
        category: "Facial",
        services: [
          {
            name: "Hydrating Facial",
            variations: [
              { name: "Default", price: 8000 }
            ]
          },
          {
            name: "Rejuvenating Facials",
            variations: [
              { name: "Default", price: 8000 }
            ]
          }
        ]
      },
      {
        category: "Teeth Whitening",
        services: [
          {
            name: "Teeth Whitening",
            variations: []
          }
        ]
      },
      {
        category: "Massage",
        services: [
          {
            name: "Massage Chair",
            variations: [
              { name: "30min", price: 25000 },
              { name: "1hour", price: 50000 }
            ]
          },
          {
            name: "Scalp Massage",
            variations: [
              { name: "30min", price: 10000 },
              { name: "1hour", price: 20000 }
            ]
          }
        ]
      },
      {
        category: "Men Hair Cut",
        services: [
          {
            name: "Hair cut",
            variations: [
              { name: "Default", price: 8000 }
            ]
          },
          {
            name: "Children haircut",
            variations: [
              { name: "Default", price: 6000 }
            ]
          },
          {
            name: "Hair cut and styling",
            variations: [
              { name: "Default", price: 10000 },
              { name: "Complex styling", price: 15000 }
            ]
          },
          {
            name: "Fade hair cut",
            variations: [
              { name: "Default", price: 15000 }
            ]
          },
          {
            name: "Men hair styling",
            variations: [
              { name: "Default", price: 5000 }
            ]
          },
          {
            name: "Highlight and retouch (light hair shaving and hair shaping)",
            variations: [
              { name: "Default", price: 8000 }
            ]
          },
          {
            name: "Bread hair shave",
            variations: [
              { name: "Default", price: 5000 }
            ]
          },
          {
            name: "Men Hair wash",
            variations: [
              { name: "Default", price: 5000 }
            ]
          },
          {
            name: "Keratin treatment",
            variations: [
              { name: "Default", price: 20000 }
            ]
          },
          {
            name: "Relaxer",
            variations: [
              { name: "Default", price: 10000 }
            ]
          },
          {
            name: "Beard trim",
            variations: [
              { name: "Default", price: 8000 }
            ]
          },
          {
            name: "Sporting waves",
            variations: []
          }
        ]
      },
      {
        category: "Hair Coloring",
        services: [
          {
            name: "Full hair coloring (root to ends)",
            variations: [
              { name: "Default", price: 20000 }
            ]
          },
          {
            name: "Half hair coloring (ends of hair)",
            variations: [
              { name: "Default", price: 15000 }
            ]
          },
          {
            name: "Black coloring/black hair dye",
            variations: [
              { name: "Default", price: 10000 }
            ]
          }
        ]
      },
      {
        category: "Dreadlock",
        services: [
          {
            name: "Re-lock dread",
            variations: [
              { name: "Small hair dread", price: 10000 },
              { name: "Medium hair dread", price: 20000 },
              { name: "Full hair dread", price: 30000 }
            ]
          },
          {
            name: "Starter dreadlocks",
            variations: [
              { name: "Small hair", price: 20000 },
              { name: "Medium hair", price: 30000 },
              { name: "Full hair", price: 45000 }
            ]
          }
        ]
      },
      {
        category: "Men Hair Plait",
        services: [
          {
            name: "Stich All Back",
            variations: [
              { name: "2 to 5 lines", price: 15000 },
              { name: "6 to 10lines", price: 20000 }
            ]
          },
          {
            name: "Natural Hair Plait",
            variations: [
              { name: "Weaving (corn rows) per line", price: 1000 },
              { name: "Design (cornrows) per line", price: 1500 },
              { name: "Cornrows didi per line", price: 1500 }
            ]
          }
        ]
      },
      {
        category: "Extension Hair Plait for Men",
        services: [
          {
            name: "Feed In (men’s length)",
            variations: [
              { name: "Per line", price: 2000 }
            ]
          },
          {
            name: "Design Feed In (men’s length)",
            variations: [
              { name: "Per line", price: 2500 }
            ]
          }
        ]
      }
    ]
  };
 // Clear existing data to prevent duplicates on re-seeding
  console.log('Deleting existing services, categories, and variations...');
  await prisma.variation.deleteMany();
  await prisma.service.deleteMany();
  await prisma.category.deleteMany();
  console.log('Existing data deleted.');

  for (const categoryData of salonServicesData.categories) {
    // Create Category entry
    const category = await prisma.category.create({
      data: {
        name: categoryData.category,
      },
    });
    console.log(`Created category: ${category.name}`);

    for (const serviceData of categoryData.services) {
      // Create Service entry, connecting it to the created category
      const service = await prisma.service.create({
        data: {
          name: serviceData.name,
          categoryId: category.id, // Correctly assign categoryId
          // subcategory: serviceData.subcategory, // Uncomment if you add subcategory to your data
        },
      });
      console.log(`--> Created service: ${service.name}`);

      // Create Variation entries, connecting them to the created service
      for (const variationData of serviceData.variations) {
        await prisma.variation.create({
          data: {
            name: variationData.name,
            price: variationData.price,
            serviceId: service.id,
          },
        });
        console.log(`----> Created variation: ${variationData.name} with price: ${variationData.price}`);
      }
    }
  }

  console.log('Database seeding process completed successfully.');
}

// Run the seed function and handle disconnection
main()
  .catch((error) => {
    console.error('Error seeding the database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Database connection closed.');
  });
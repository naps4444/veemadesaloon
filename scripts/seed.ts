// seed.ts
import 'dotenv/config';
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models/Category";
import { Service } from "@/lib/models/Service";
import { Variation } from "@/lib/models/Variation";

async function seed() {
  try {
    // 1. Connect to MongoDB using your existing helper
    await connectDB();
    console.log("Starting database seeding...");

    // 2. Clear existing data in the correct order (children first)
    console.log("Deleting existing services, categories, and variations...");
    await Variation.deleteMany({});
    await Service.deleteMany({});
    await Category.deleteMany({});
    console.log("Existing data deleted.");

    const salonServicesData = {
      categories: [
        {
          category: "Braids and Extensions", // ✨ Prices removed for this category
          services: [
            {
              name: "Feed In (seamless look with hair extensions)",
              variations: [
                { name: "Bum length", price: 0 }, // Set to 0
                { name: "Waist length", price: 0 }, // Set to 0
                { name: "Bra length", price: 0 } // Set to 0
              ]
            },
            {
              name: "Feed In Shuku",
              variations: [
                { name: "Bra length", price: 0 },
                { name: "Shoulder L", price: 0 },
                { name: "Bum L", price: 0 },
                { name: "Waist L", price: 0 }
              ]
            },
            {
              name: "Feed In All Back",
              variations: [
                { name: "Bra L", price: 0 },
                { name: "Shoulder L", price: 0 },
                { name: "Waist L", price: 0 }
              ]
            },
            {
              name: "Shuku Stitch",
              variations: [
                { name: "Shoulder L", price: 0 },
                { name: "Bra L", price: 0 },
                { name: "Waist L", price: 0 }
              ]
            },
            {
              name: "All Back Stitch",
              variations: [
                { name: "2 to 5 lines", price: 0 },
                { name: "6 to 10 lines", price: 0 }
              ]
            },
            {
              name: "Braids",
              variations: [
                { name: "Over bum length", price: 0 }
              ]
            },
            {
              name: "Island Boho Twist Braids",
              variations: [
                { name: "Shoulder L", price: 0 },
                { name: "Bra L", price: 0 },
                { name: "Waist L", price: 0 }
              ]
            },
            {
              name: "Boho Braids",
              variations: [
                { name: "Shoulder L", price: 0 },
                { name: "Bra L", price: 0 },
                { name: "Waist L", price: 0 }
              ]
            },
            {
              name: "Lemonade 2 Step Braids",
              variations: [
                { name: "Shoulder L", price: 0 },
                { name: "Bra L", price: 0 },
                { name: "Waist", price: 0 },
                { name: "Bum", price: 0 }
              ]
            },
            {
              name: "Goddess Braids",
              variations: [
                { name: "Waist L", price: 0 }
              ]
            },
            {
              name: "Alicia Keys Feed In Braids",
              variations: [
                { name: "Bra L", price: 0 },
                { name: "Shoulder L", price: 0 },
                { name: "Waist L", price: 0 }
              ]
            },
            {
              name: "Kids Braids with Attachment",
              variations: [
                { name: "Default", price: 0 }
              ]
            },
            {
              name: "Kids Knotless Braids",
              variations: [
                { name: "Default", price: 0 }
              ]
            },
            {
              name: "Kids Ordinary Weaving",
              variations: [
                { name: "Default", price: 0 }
              ]
            },
            {
              name: "Braids Maintenance",
              variations: [
                { name: "Default", price: 0 }
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
              variations: [ // Previously empty, now implicitly price 0
                { name: "Default", price: 0 }
              ]
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
          category: "Wigging/Installation/Sewin", // ✨ Prices removed for this category
          services: [
            {
              name: "Wigging",
              variations: [
                { name: "Default", price: 0 } // Set to 0
              ]
            },
            {
              name: "Sew In Per Track",
              variations: [
                { name: "Per track", price: 0 }
              ]
            },
            {
              name: "Blow Dry to Curly (wig/sew in)",
              variations: [
                { name: "Default", price: 0 }
              ]
            },
            {
              name: "Flat Ironing (wig/sew in)",
              variations: [
                { name: "Short wig", price: 0 },
                { name: "Medium", price: 0 },
                { name: "Long", price: 0 }
              ]
            },
            {
              name: "Curly Hair Extension Styling",
              variations: [
                { name: "Default", price: 0 }
              ]
            },
            {
              name: "Hair Revamp Without Styling",
              variations: [
                { name: "Default", price: 0 }
              ]
            },
            {
              name: "Hair Revamp with Styling",
              variations: [
                { name: "Default", price: 0 }
              ]
            },
            {
              name: "Sew In Wash & Style",
              variations: [
                { name: "Default", price: 0 }
              ]
            },
            {
              name: "Sew In Bundles/Leaveout",
              variations: [
                { name: "Default", price: 0 }
              ]
            },
            {
              name: "Sew In with Closure",
              variations: [
                { name: "Default", price: 0 }
              ]
            },
            {
              name: "Sew In with Frontal",
              variations: [
                { name: "Default", price: 0 }
              ]
            },
            {
              name: "Sew In Versatile Style",
              variations: [
                { name: "5x5/4x5", price: 0 }
              ]
            },
            {
              name: "Take Out Wig Without Re-wigging",
              variations: [
                { name: "Default", price: 0 }
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
              variations: [
                { name: "Default", price: 0 } // Previously empty, now implicitly price 0
              ]
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
              variations: [ // Previously empty, now implicitly price 0
                { name: "Default", price: 0 }
              ]
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

    // 3. Iterate through the data and insert into the database using Mongoose
    for (const categoryData of salonServicesData.categories) {
      const category = await Category.create({ name: categoryData.category });
      console.log(`Created category: ${category.name} (ID: ${category._id})`);

      for (const serviceData of categoryData.services) {
        const service = await Service.create({
          name: serviceData.name,
          categoryId: category._id, // Link to the created category's _id
        });
        console.log(`--> Created service: ${service.name} (ID: ${service._id})`);

        for (const variationData of serviceData.variations) {
          const variation = await Variation.create({
            name: variationData.name,
            price: variationData.price, // Will be 0 for unpriced services
            serviceId: service._id, // Link to the created service's _id
          });
          console.log(`----> Created variation: ${variation.name} with price: ${variation.price} (ID: ${variation._id})`);
        }
      }
    }

    console.log("Database seeding completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding the database:", err);
    process.exit(1);
  } finally {
    // 4. Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Database connection closed.");
  }
}

seed();

export type Service = {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  variations?: {
    name: string;
    price: number;
  }[];
};

// PART 1 — Braids, Kids, Natural Hair, Take Out, Wigging/Installation/Sew-in

export const servicesPart1: Service[] = [
  // Braids & Extensions
  {
    id: 'braids-01',
    name: 'Feed In Braids (Seamless) – Bum Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 50000 }]
  },
  {
    id: 'braids-02',
    name: 'Feed In Braids – Waist Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 40000 }]
  },
  {
    id: 'braids-03',
    name: 'Feed In Braids – Bra Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 30000 }]
  },
  {
    id: 'braids-04',
    name: 'Feed In Shuku – Bra Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 38000 }]
  },
  {
    id: 'braids-05',
    name: 'Feed In Shuku – Shoulder Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 35000 }]
  },
  {
    id: 'braids-06',
    name: 'Feed In Shuku – Bum Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 50000 }]
  },
  {
    id: 'braids-07',
    name: 'Feed In Shuku – Waist Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 50000 }]
  },
  {
    id: 'braids-08',
    name: 'Feed In All Back – Bra Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 35000 }]
  },
  {
    id: 'braids-09',
    name: 'Feed In All Back – Shoulder Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 30000 }]
  },
  {
    id: 'braids-10',
    name: 'Feed In All Back – Waist Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 38000 }]
  },
  {
    id: 'braids-11',
    name: 'Shuku Stitch – Shoulder Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 35000 }]
  },
  {
    id: 'braids-12',
    name: 'Shuku Stitch – Bra Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 38000 }]
  },
  {
    id: 'braids-13',
    name: 'Shuku Stitch – Waist Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 48000 }]
  },
  {
    id: 'braids-14',
    name: 'All Back Stitch (2–5 lines)',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 15000 }]
  },
  {
    id: 'braids-15',
    name: 'All Back Stitch (6–10 lines)',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 20000 }]
  },
  {
    id: 'braids-16',
    name: 'Braids – Over Bum Length',
    category: 'Braids & Extensions',
    variations: [{ name: 'Default', price: 55000 }]
  },
  // [... more Braids services ...]

  // Kids
  {
    id: 'kids-01',
    name: 'Kids Braids with Attachment',
    category: 'Kids',
    variations: [{ name: 'Default', price: 15500 }]
  },
  {
    id: 'kids-02',
    name: 'Kids Knotless Braids',
    category: 'Kids',
    variations: [{ name: 'Default', price: 20000 }]
  },
  {
    id: 'kids-03',
    name: 'Kids Ordinary Weaving',
    category: 'Kids',
    variations: [{ name: 'Default', price: 10000 }]
  },

  // Natural Hair
  {
    id: 'natural-01',
    name: 'Wash and Dry',
    category: 'Natural Hair',
    variations: [{ name: 'Default', price: 8000 }]
  },
  {
    id: 'natural-02',
    name: 'Natural Hair Trim',
    category: 'Natural Hair',
    variations: [{ name: 'Default', price: 10000 }]
  },
  {
    id: 'natural-03',
    name: 'Relax Hair with Regular Kit',
    category: 'Natural Hair'
  },
  {
    id: 'natural-04',
    name: 'Cornrows on Natural Hair (per line)',
    category: 'Natural Hair',
    variations: [{ name: 'Default', price: 1000 }]
  },
  {
    id: 'natural-05',
    name: 'Designs Cornrows (per line)',
    category: 'Natural Hair',
    variations: [{ name: 'Default', price: 1500 }]
  },
  {
    id: 'natural-06',
    name: 'Cornrows Didi',
    category: 'Natural Hair',
    variations: [{ name: 'Default', price: 1500 }]
  },
  {
    id: 'natural-07',
    name: 'Natural Hair Twist',
    category: 'Natural Hair',
    variations: [
      { name: 'Standard', price: 15000 },
      { name: 'Extra Volume', price: 18000 }
    ]
  },
  {
    id: 'natural-08',
    name: 'Natural Hair Flat Ironing',
    category: 'Natural Hair',
    variations: [
      { name: 'Short', price: 3000 },
      { name: 'Medium Full Hair', price: 5000 },
      { name: 'Full Hair', price: 7000 }
    ]
  },

  // Take Out
  {
    id: 'takeout-01',
    name: 'Cornrows Take Out',
    category: 'Take Out',
    variations: [{ name: 'Default', price: 2000 }]
  },
  {
    id: 'takeout-02',
    name: 'Installation Take Out',
    category: 'Take Out',
    variations: [{ name: 'Default', price: 6000 }]
  },
  {
    id: 'takeout-03',
    name: 'Braids Take Out',
    category: 'Take Out',
    variations: [
      { name: 'Small', price: 7500 },
      { name: 'Medium', price: 5000 },
      { name: 'Large', price: 4000 }
    ]
  },
  {
    id: 'takeout-04',
    name: 'Sew In Take Out',
    category: 'Take Out',
    variations: [{ name: 'Default', price: 4000 }]
  },


  // Wigging / Installation / Sew-in
  { id: 'wig-01', name: 'Wigging', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 25000 }] },
  { id: 'wig-02', name: 'Sew In per Track', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 2500 }] },
  { id: 'wig-03', name: 'Blow Dry to Curly (Wig/Sew-in)', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 20000 }] },
  { id: 'wig-04', name: 'Flat Ironing – Short Wig', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 10000 }] },
  { id: 'wig-05', name: 'Flat Ironing – Medium', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 13000 }] },
  { id: 'wig-06', name: 'Flat Ironing – Long', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 15000 }] },
  { id: 'wig-07', name: 'Curly Hair Extension Styling', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 15000 }] },
  { id: 'wig-08', name: 'Hair Revamp without Styling', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 12000 }] },
  { id: 'wig-09', name: 'Hair Revamp with Styling', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 15000 }] },
  { id: 'wig-10', name: 'Sew In Wash & Style', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 12000 }] },
  { id: 'wig-11', name: 'Sew In Bundles / Leave Out', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 25000 }] },
  { id: 'wig-12', name: 'Sew In with Closure', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 27000 }] },
  { id: 'wig-13', name: 'Sew In with Frontal', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 30000 }] },
  { id: 'wig-14', name: 'Versatile Style (5x5 / 4x5)', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 27000 }] },
  { id: 'wig-15', name: 'Take Out Wig Without Re-wigging', category: 'Wigging/Installation/Sew-in', variations: [{ name: 'Default', price: 3000 }] },

  // Nails – Natural
  { id: 'nails-01', name: 'Gel Polish', category: 'Nails', subcategory: 'Natural', variations: [{ name: 'Default', price: 6000 }] },
  { id: 'nails-02', name: 'Regular Polish', category: 'Nails', subcategory: 'Natural', variations: [{ name: 'Default', price: 4000 }] },
  { id: 'nails-03', name: 'Polygel', category: 'Nails', subcategory: 'Natural', variations: [{ name: 'Default', price: 20000 }] },
  { id: 'nails-04', name: 'Nail Wrap with Powder/Acrylic', category: 'Nails', subcategory: 'Natural', variations: [{ name: 'Default', price: 20000 }] },
  { id: 'nails-05', name: 'File and Buff (Nail Bed Care)', category: 'Nails', subcategory: 'Natural', variations: [{ name: 'Default', price: 4000 }] },
  { id: 'nails-06', name: 'Kids Nail Polish', category: 'Nails', subcategory: 'Natural', variations: [{ name: 'Default', price: 4500 }] },

  // Nails – Acrylic
  { id: 'nails-07', name: 'Full Set Acrylic & Gel Polish', category: 'Nails', subcategory: 'Acrylic', variations: [{ name: 'Default', price: 25000 }] },
  { id: 'nails-08', name: 'Full Set Acrylic & Regular Polish', category: 'Nails', subcategory: 'Acrylic', variations: [{ name: 'Default', price: 22000 }] },
  { id: 'nails-09', name: 'Acrylic Colored Powder', category: 'Nails', subcategory: 'Acrylic', variations: [{ name: 'Default', price: 25000 }] },
  { id: 'nails-10', name: 'Acrylic and French Tip', category: 'Nails', subcategory: 'Acrylic', variations: [{ name: 'Default', price: 25000 }] },
  { id: 'nails-11', name: 'Ombré Acrylic', category: 'Nails', subcategory: 'Acrylic', variations: [{ name: 'Default', price: 25000 }] },
  { id: 'nails-12', name: 'Acrylic & Chrome', category: 'Nails', subcategory: 'Acrylic', variations: [{ name: 'Default', price: 25000 }] },
  { id: 'nails-13', name: 'Acrylic & Airbrush Design', category: 'Nails', subcategory: 'Acrylic', variations: [{ name: 'Default', price: 25000 }] },
  { id: 'nails-14', name: 'Acrylic & Cateye', category: 'Nails', subcategory: 'Acrylic', variations: [{ name: 'Default', price: 25000 }] },
  { id: 'nails-15', name: 'Acrylic & Blooming Gel', category: 'Nails', subcategory: 'Acrylic', variations: [{ name: 'Default', price: 25000 }] },
  { id: 'nails-16', name: 'Acrylic & Matt Polish', category: 'Nails', subcategory: 'Acrylic', variations: [{ name: 'Default', price: 25000 }] },
  { id: 'nails-17', name: 'Full Set Acrylic Refill', category: 'Nails', subcategory: 'Acrylic', variations: [{ name: 'Default', price: 22000 }] },

  // Stick-on / Extension Nails
  { id: 'nails-18', name: 'Stick-on Full Set with Gel Polish', category: 'Nails', subcategory: 'Extension', variations: [{ name: 'Default', price: 18000 }] },
  { id: 'nails-19', name: 'Stick-on Full Set & Regular Polish', category: 'Nails', subcategory: 'Extension', variations: [{ name: 'Default', price: 15000 }] },

  // Toes
  { id: 'nails-20', name: 'Full Toe Set and Gel Polish', category: 'Nails', subcategory: 'Toes', variations: [{ name: 'Default', price: 20000 }] },
  { id: 'nails-21', name: 'French Tip on Natural Nail Toe', category: 'Nails', subcategory: 'Toes', variations: [{ name: 'Default', price: 10000 }] },
  { id: 'nails-22', name: 'Gel Polish on Toes', category: 'Nails', subcategory: 'Toes', variations: [{ name: 'Default', price: 6000 }] },
  { id: 'nails-23', name: 'Regular Polish on Toes', category: 'Nails', subcategory: 'Toes', variations: [{ name: 'Default', price: 5000 }] },
  { id: 'nails-24', name: 'Stick-on & Gel Polish on Toes', category: 'Nails', subcategory: 'Toes', variations: [{ name: 'Default', price: 14000 }] },
  { id: 'nails-25', name: 'Stick-on & Regular Polish on Toes', category: 'Nails', subcategory: 'Toes', variations: [{ name: 'Default', price: 12000 }] },
  { id: 'nails-26', name: 'Acrylic on Toes (per toe)', category: 'Nails', subcategory: 'Toes', variations: [{ name: 'Default', price: 2000 }] },
  { id: 'nails-27', name: 'Stick-on per Toe', category: 'Nails', subcategory: 'Toes', variations: [{ name: 'Default', price: 1500 }] },

  // Nail Repairs
  { id: 'nails-28', name: 'Gel Polish (per nail)', category: 'Nails', subcategory: 'Repairs', variations: [{ name: 'Default', price: 1000 }] },
  { id: 'nails-29', name: 'Art on Nail (per nail)', category: 'Nails', subcategory: 'Repairs', variations: [{ name: 'Default', price: 1000 }] },
  { id: 'nails-30', name: 'Refill (per nail)', category: 'Nails', subcategory: 'Repairs', variations: [{ name: 'Default', price: 2000 }] },
  { id: 'nails-31', name: 'Stick-on Nails (per nail)', category: 'Nails', subcategory: 'Repairs', variations: [{ name: 'Default', price: 1500 }] },
  { id: 'nails-32', name: 'Acrylic (per nail)', category: 'Nails', subcategory: 'Repairs', variations: [{ name: 'Default', price: 1500 }] },
  { id: 'nails-33', name: 'Polygel (per nail)', category: 'Nails', subcategory: 'Repairs', variations: [{ name: 'Default', price: 1500 }] },
  { id: 'nails-34', name: 'Soak Off / Dissolving Nails', category: 'Nails', subcategory: 'Repairs', variations: [{ name: 'Default', price: 5000 }] },
  { id: 'nails-35', name: 'Regular Polish Removal', category: 'Nails', subcategory: 'Repairs', variations: [{ name: 'Default', price: 2000 }] },
  { id: 'nails-36', name: 'Gel Polish Removal', category: 'Nails', subcategory: 'Repairs', variations: [{ name: 'Default', price: 2500 }] },

  // Pedicure & Manicure
  { id: 'pedicure-01', name: 'Herbal Detox Pedicure & Feet Massage', category: 'Pedicure', variations: [{ name: 'Default', price: 15000 }] },
  { id: 'pedicure-02', name: 'Gel Pedicure & Feet Massage', category: 'Pedicure', variations: [{ name: 'Default', price: 12000 }] },
  { id: 'pedicure-03', name: 'Paraffin Wax Pedicure & Massage', category: 'Pedicure', variations: [{ name: 'Default', price: 20000 }] },
  { id: 'pedicure-04', name: 'Basic/Classic Pedicure & Massage', category: 'Pedicure', variations: [{ name: 'Default', price: 10000 }] },

  { id: 'manicure-01', name: 'Basic Manicure & Hand Massage', category: 'Manicure', variations: [{ name: 'Default', price: 8000 }] },
  { id: 'manicure-02', name: 'Paraffin Wax Manicure & Massage', category: 'Manicure', variations: [{ name: 'Default', price: 15000 }] },

  // Facial
  { id: 'facial-01', name: 'Hydrating Facial', category: 'Facial', variations: [{ name: 'Default', price: 8000 }] },
  { id: 'facial-02', name: 'Rejuvenating Facials', category: 'Facial', variations: [{ name: 'Default', price: 8000 }] },

  // Massage Chair
  { id: 'massage-01', name: 'Massage Chair – 30 Minutes', category: 'Massage Chair', variations: [{ name: 'Default', price: 25000 }] },
  { id: 'massage-02', name: 'Massage Chair – 1 Hour', category: 'Massage Chair', variations: [{ name: 'Default', price: 50000 }] }
];

// const sequelize = require("../config/database");
// const Route = require("../models/Route");

// async function seedRoutes() {
//     await sequelize.sync(); // Ensure tables exist

//     try {
//         const routes = await Route.bulkCreate([
//             { route_name: "สายหัวตะเข้", start_location: "ซอยวัดราชโกษา", end_location: "หมู่บ้านแฮปปี้เพลส2", factory_id: KCE01 },
//             { route_name: "สายร่มเกล้า", start_location: "ศูนย์บริการสาธารณสุข45", end_location: "ซอยดอกอ้อ" },
//             { route_name: "สายหนองจอกคันที่1", start_location: "หมู่บ้านนันทวีวิลลิจ2", end_location: "ปากทางซอยอยู่วิทยา" },
//             { route_name: "สายหนองจอกคันที่2", start_location: "ชุมชนร่วมพัฒนาสินอนันต์", end_location: "ซอยฉลองกกรุง36" },
//             { route_name: "สายกม8", start_location: "ซอยรามอนทรา73/1", end_location: "ซอยฉลองกกรุง50" },
//             { route_name: "สายหน้านิคม", start_location: "7-11ฉลองกรุง35", end_location: "ร้านลาดกระบังค้าวัสดุก่อสร้าง" },
//             { route_name: "สายตลาดเอี่ยม", start_location: "ธนาคารทหารไทย", end_location: "หมู่บ้านพิศาล2" },
//             { route_name: "สายบางกะปิ(กะ)", start_location: "สน.ลาดพร้าว", end_location: "ซอยเทเลคอม" },
//             { route_name: "สายตำหรุ(กะ)", start_location: "ซอยโอ่ง(เทศบาลบางปู45)", end_location: "หน้าศูนย์นิสสัน(สะพานแยกคลองขุด)" },
//             { route_name: "สายบางนา-ซอยโอ่ง(สองแถว)", start_location: "ปั๊มเอสโซ่สำโรง(สถานีรถไฟฟ้าแบริ่ง)", end_location: "ตรากบ" },
//             { route_name: "สายแพรกษา-ศูนย์ฮอนด้าคลองเก้า(สองแถว)", start_location: "เซเว่นตลาดนิคม", end_location: "หมู่บ้านเพชรงาม" },
//             { route_name: "สายรามอินทรา(สำนักงาน)", start_location: "เซ็นทรัลรามอินรา", end_location: "ป้ายรถเมล์แยกถนนคุ้มเกล้า" },
//             { route_name: "สายอนุสาวรีย์(สำนักงาน)", start_location: "Metro Resort", end_location: "วัดสุธาโภชน์" },
//             { route_name: "สายบางกะปิ(สำนักงาน)", start_location: "ซอยนวมินทร์10", end_location: "ร้านลาดกระบังค้าวัสดุก่อสร้าง" },
//             { route_name: "สายตำหรุ(สำนักงาน)", start_location: "ซอยโอ่ง(เทศบาลบางปู45)", end_location: "รุ่งกิจ" },
//             { route_name: "สายแพรกษา-ศูนย์ฮอนด้าคลองเก้า(สำนักงานสองแถว)", start_location: "ซอยมังกร", end_location: "ศุนย์ฮอนด้าคลองเก้า" },
//             { route_name: "สายบางนา-เทพสรักษ์(รถตู้สำนักงาน)", start_location: "สถานีรถไฟฟ้าเอราวัณ", end_location: "ป้ายรถเมล์ตรงข้าม ม.ทรัพย์ดินทอง" },
//         ], { returning: true });

//         console.log("✅ Routes seeded successfully!");
//         return routes; // return data if needed by other scripts
//     } catch (error) {
//         console.error("❌ Error seeding routes:", error);
//     }
// }

// module.exports = seedRoutes;

const Route = require("../models/Route");
const seedFactories = require("./seedFactories");

async function seedRoutes() {
  const factories = await seedFactories(); // get created factories

  const factoryMap = {};
  factories.forEach(f => factoryMap[f.name] = f.id); // easy access by name

  await Route.bulkCreate([
    { route_name: "สายหัวตะเข้", start_location: "ซอยวัดราชโกษา", end_location: "หมู่บ้านแฮปปี้เพลส2", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายร่มเกล้า", start_location: "ศูนย์บริการสาธารณสุข45", end_location: "ซอยดอกอ้อ", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายหนองจอกคันที่1", start_location: "หมู่บ้านนันทวีวิลลิจ2", end_location: "ปากทางซอยอยู่วิทยา", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายหนองจอกคันที่2", start_location: "ชุมชนร่วมพัฒนาสินอนันต์", end_location: "ซอยฉลองกกรุง36", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายกม8", start_location: "ซอยรามอนทรา73/1", end_location: "ซอยฉลองกกรุง50", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายหน้านิคม", start_location: "7-11ฉลองกรุง35", end_location: "ร้านลาดกระบังค้าวัสดุก่อสร้าง", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายตลาดเอี่ยม", start_location: "ธนาคารทหารไทย", end_location: "หมู่บ้านพิศาล2", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายบางกะปิ(กะ)", start_location: "สน.ลาดพร้าว", end_location: "ซอยเทเลคอม", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายตำหรุ(กะ)", start_location: "ซอยโอ่ง(เทศบาลบางปู45)", end_location: "หน้าศูนย์นิสสัน(สะพานแยกคลองขุด)", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายบางนา-ซอยโอ่ง(สองแถว)", start_location: "ปั๊มเอสโซ่สำโรง(สถานีรถไฟฟ้าแบริ่ง)", end_location: "ตรากบ", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายแพรกษา-ศูนย์ฮอนด้าคลองเก้า(สองแถว)", start_location: "เซเว่นตลาดนิคม", end_location: "หมู่บ้านเพชรงาม", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายรามอินทรา(สำนักงาน)", start_location: "เซ็นทรัลรามอินรา", end_location: "ป้ายรถเมล์แยกถนนคุ้มเกล้า", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายอนุสาวรีย์(สำนักงาน)", start_location: "Metro Resort", end_location: "วัดสุธาโภชน์", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายบางกะปิ(สำนักงาน)", start_location: "ซอยนวมินทร์10", end_location: "ร้านลาดกระบังค้าวัสดุก่อสร้าง", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายตำหรุ(สำนักงาน)", start_location: "ซอยโอ่ง(เทศบาลบางปู45)", end_location: "รุ่งกิจ", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายแพรกษา-ศูนย์ฮอนด้าคลองเก้า(สำนักงานสองแถว)", start_location: "ซอยมังกร", end_location: "ศุนย์ฮอนด้าคลองเก้า", factory_id: factoryMap["KCE Electronic"] },
    { route_name: "สายบางนา-เทพารักษ์(รถตู้สำนักงาน)", start_location: "สถานีรถไฟฟ้าเอราวัณ", end_location: "ป้ายรถเมล์ตรงข้าม ม.ทรัพย์ดินทอง", factory_id: factoryMap["KCE Electronic"] }

  ]);

  console.log("✅ Routes seeded with linked factory_id!");
}

module.exports = seedRoutes;
//seedRoutes();

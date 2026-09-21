const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });

async function main() {
  
  // สถานการณ์ที่ 1: หน้าแรก[cite: 1]
  console.log("--- สถานการณ์ 1 (หน้าแรก) ---");
  try {
    const results = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", true) 
    ]);
    console.log(`เปิดหน้าแรก: ${results.join(", ")}`);
  } catch (error) {
    console.log(`หน้าแรกเปิดไม่ได้: ${error.message}`);
  }
  // เหตุผล: Promise.all เหมาะกับสถานการณ์นี้ เพราะต้องการให้ "โหลดครบทุกชิ้น" ถ้าขาดชิ้นใดชิ้นหนึ่งหน้าเว็บต้องเปิดไม่ได้เลย[cite: 1]


  // สถานการณ์ที่ 2: แจ้งเตือน[cite: 1]
  console.log("\n--- สถานการณ์ 2 (แจ้งเตือน) ---");
  const notifications = await Promise.allSettled([
    wait(300, "อีเมล", false),
    wait(500, "SMS", true),
    wait(400, "แอป", false)
  ]);
  notifications.forEach(n => {
      if(n.status === "fulfilled") console.log(`รายงาน: ${n.value} ส่งสำเร็จ`);
      else console.log(`รายงาน: ${n.reason.message}`);
  });
  // เหตุผล: Promise.allSettled เหมาะที่สุด เพราะต้องการรู้ "ผลครบทุกช่องทาง" แม้จะมีบางตัวพัง ก็ห้ามทำให้การทำงานรวมระเบิดตามไปด้วย[cite: 1]


  // สถานการณ์ที่ 3: Mirror Server[cite: 1]
  console.log("\n--- สถานการณ์ 3 (Mirror Server) ---");
  try {
      const mirror = await Promise.any([
          wait(300, "mirror-A", true), 
          wait(600, "mirror-B", false) 
      ]);
      console.log(`ใช้ข้อมูลจาก: ${mirror}`);
  } catch (error) {
      console.log("เซิร์ฟเวอร์ล่มทั้งหมด");
  }
  // เหตุผล: Promise.any เพราะต้องการแค่ "ตัวแรกที่สำเร็จ" แล้วเอาค่านั้นมาใช้งานเลย โดยจะข้ามตัวที่ Error/พังไปเลยแบบไม่สนใจ[cite: 1]


  // สถานการณ์ที่ 4: ทำ Timeout ค้นหา[cite: 1]
  console.log("\n--- สถานการณ์ 4 (Timeout) ---");
  const timeoutPromise = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("หมดเวลาการรอ")), ms));
  
  try {
      const searchResult = await Promise.race([
          wait(1200, "ข้อมูลจากฐานข้อมูลหลัก"), // ช้า
          timeoutPromise(800)                 // หมดเวลาก่อน
      ]);
      console.log(`ผลการค้นหา: ${searchResult}`);
  } catch (error) {
      if (error.message === "หมดเวลาการรอ") console.log("ใช้แคชเก่าแทน");
      else console.log(`เกิดข้อผิดพลาดอื่น: ${error.message}`);
  }
  // เหตุผล: Promise.race เอามาทำ "Timeout" ได้ดีที่สุด เพราะใช้แข่งขันกันว่าใครทำงานจบก่อน (ทั้งแบบ resolve หรือ reject) จะถือเป็นผู้ชนะทันที[cite: 1]
}
main();
# ใช้ Node.js image เป็น base image
FROM node:18

# ตั้งค่า working directory
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json ไปยัง working directory
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ source code ไปยัง working directory
COPY . .

# สร้างตัวแปรสภาพแวดล้อมสำหรับ port
ENV PORT=3000

# เปิด port ที่ใช้โดยแอปพลิเคชัน
EXPOSE 3000

# คำสั่งในการรันแอปพลิเคชัน
CMD [ "npm", "start" ]

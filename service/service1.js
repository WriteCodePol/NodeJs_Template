const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser'); // Install with `npm install csv-parser`

const { logger } = require('../middleware/logloki');  // นำเข้า logger และ router จาก loki.js


async function Hello(req, res) {
  try {
    logger.info('Hello World!' + req.ip);
  }
  catch {
    logger.error('Hello World!' + req.ip);
  }
  res.send('Hello World!' + req.ip);
}

async function getapifile(req, res) {
  const jsonFilePath = path.join('files', 'filedata.json'); // พาธไฟล์ JSON

  // อ่านไฟล์ JSON
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).send('Internal server error');
    }
    // แปลงข้อมูล JSON
    const fileData = JSON.parse(data);
    // สร้าง array สำหรับเก็บ URL ของไฟล์
    const fileUrls = fileData.map((row) => {
      return `http://localhost:9000/api/file/${row.uuid}`; // สร้าง URL จาก uuid ของแต่ละแถว
    });
    // ส่งผลลัพธ์เป็น JSON
    res.json({ fileUrls });
  });
}

async function method1(req, res) {
  const { name } = req.body;
  logger.info('Body:', req.body);
  res.status(200).json({ body: req.body, msg: 'method1' });
}

async function filefromuuid(req, res) {
  const { uuid } = req.params; // รับ UUID จาก URL
  const jsonFilePath = path.join( 'files', 'filedata.json'); // พาธไฟล์ JSON

  // อ่านไฟล์ JSON
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).send('Internal server error');
    }

    // แปลงข้อมูล JSON
    const fileData = JSON.parse(data);
    const foundFile = fileData.find((row) => row.uuid === uuid); // ค้นหา UUID

    if (foundFile) {
      const filePath = foundFile.field1; // รับพาธไฟล์จาก field1
      console.log(`Found file path: ${filePath}`);

      // ตรวจสอบว่าไฟล์มีอยู่จริงหรือไม่
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          console.error('File not found:', filePath);
          return res.status(404).send('File not found');
        }

        // ส่งไฟล์ PDF กลับ
        res.contentType('application/pdf'); // กำหนดประเภทไฟล์เป็น PDF
        res.sendFile(filePath, (err) => {
          if (err) {
            console.error('Error sending file:', err);
            return res.status(500).send('Error sending the file.');
          }
        });
      });
    } else {
      console.error('UUID not found in JSON:', uuid);
      return res.status(404).send('UUID not found in JSON');
    }
  });
}

module.exports = {
  Hello
  , getapifile
  , method1
  , filefromuuid
};

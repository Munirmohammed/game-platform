const fs = require('fs');
const readline = require('readline');
const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

async function processBulkPhoneNumbers(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const phoneNumber = line.trim();
    if (phoneNumber) {
      try {
        const user = await prismaClient.user.findFirst({
          where: { phoneNumber: phoneNumber }
        });
        
        if (user) {
          console.log(`User found: ${user.username}`);
        } else {
          console.log(`No user found with phone number: ${phoneNumber}`);
        }
      } catch (error) {
        console.error(`Error finding user with phone number ${phoneNumber}: ${error.message}`);
      }
    }
  }
}

module.exports = processBulkPhoneNumbers;

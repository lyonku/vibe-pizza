export function generateVerificationCode(userId?: number) {
  const generatedUserId = userId ?? Math.floor(100000 + Math.random() * 900000);
  const idString = generatedUserId.toString();

  const idPart = parseInt(idString, 10) || 0;

  const randomPart = Math.floor(100000 + Math.random() * 900000);

  const verificationCode = (idPart + randomPart) % 1000000;

  return verificationCode.toString().padStart(6, "0");
}

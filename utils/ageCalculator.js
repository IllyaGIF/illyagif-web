export function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const currentDate = new Date();
  
    const diffInMs = currentDate - birthDate;
  
    const msInYear = 1000 * 60 * 60 * 24 * 365.25;
  
    return diffInMs / msInYear;
  }
  
import dayjs from 'dayjs';

export const FormatterDate = (
  value: string | Date | dayjs.Dayjs | null | undefined,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string => {
  if (!value) return ''; 
  
  try {
    return dayjs(value).isValid() 
      ? dayjs(value).format(format) 
      : String(value);
  } catch (error) {
    console.error('Date formatting error:', error);
    return String(value); 
  }
};
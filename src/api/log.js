import instance from '@/api/request'

// 查找所有日记
export const findAllLogService = () => {
  return instance.get('/log/all')
}

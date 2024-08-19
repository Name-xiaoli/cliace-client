import instance from '@/api/request'

// 查找随机10条博客
export const blogTenService = () => {
  return instance.get('/blog')
}

// 获取我的最新十条数据
export const myBlogTenService = ({ userId, page }) => {
  return instance.post('/blog/myTen', {
    userId: userId,
    page: page
  })
}

// 模糊查询博客数据
export const vagueFindBlogService = (title) => {
  return instance.post('/blog/vague', {
    title
  })
}

import request from '@/utils/request'
export const getImg = (num) => {
  return request({
    url: `/user-service/user/imageCode/${num}`,
    method: 'GET',
    // 设置图片数据流的返回值
    responseType: 'blob'
  })
}

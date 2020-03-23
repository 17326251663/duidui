// 1 导入axios
import axios from 'axios'
// 1.1 导入element message组件
import { Message } from 'element-ui'

import Vue from 'vue'



// 2 设置相关参数：基本路径、超时时间 等
axios.defaults.baseURL = 'http://192.168.1.7:10010/api'
axios.defaults.timeout = 3000

// 3 配置拦截器
axios.interceptors.request.use(request=>{
    let token = sessionStorage.getItem('token')
    if(token){
        request.headers.authorization = token
    }

    // let url = ['/imageservice/image/like','/imageservice/image/collect']

    // url.forEach(e=>{
    //     if(request.url.indexOf(e)!=-1){
    //         //说明需要校验身份
    //         if(!token){
    //             //校验未通过
    //             Message.error('请先登录')
    //             return
    //         }
    //     }
    // })

    return request
},error=>{})
axios.interceptors.response.use(response => {
    
    // 放行
    return response
}, error => {
    // 错误提示
    if(error.response.status&&error.response.status=='403'){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('loginUser')
        Vue.router.push('/')
    }else
    Message.error(error.message)
    return Promise.reject(error)
})

// 5 所有请求（每一个都是一个功能）
export function test(){
    return axios.get('/test')
}

//1.查询所有顶级素材分类
export function selectAllCategory(){
    return axios.get('/materialservice/category')
}
//2.根据parentId查询素材分类
export function selectCateByParentid(parentId){
    return axios.get(`/materialservice/category/${parentId}`)
}
//3.验证用户名是否重复
export function verifyUsername(user){
    return axios.post('/userservice/user/verifyUsername',user)
}
//4.发送验证码
export function sendCode(telephone){
    return axios.get('/userservice/user/code/'+telephone)
}
//5.验证验证码
export function verifyCode(telephone,code){
    return axios.get(`/userservice/user/verifycode/${telephone}/${code}`)
}
//6.注册
export function registry(user){
    return axios.post('/userservice/user/registry',user)
}
//7.密码登录
export function login(user){
    return axios.post('/userservice/user/login',user)
}
//8.查询菜单选项
export function selectAllMenuList(){
    return axios.get('/materialservice/list/')
}
//9.查询所有专辑
export function selectAllAlbum(){
    return axios.get('/imageservice/album')
}
//10.新增专辑
export function addAlbum(album,num){
    return axios.post('/imageservice/album',num==0?album:{"aname":album})
}
//11.新增图片
export function addimage(image){
    let data = {...image}
    if(data.dataurl.length!=0)
    data.dataurl = data.dataurl.join(',')
    if(data.tags.length!=0)
    data.tags = data.tags.join(',')
    return axios.post('/imageservice/image/add',data)
}
//12.每日精选
export function selectChoiceness(pageNum,pageSize){
    return axios.get(`/imageservice/image/choiceness/${pageNum}/${pageSize}`)
}
//13.查看个人信息
export function userMessage(uid){
    return axios.get(`/userservice/user/msg/${uid}`)
}
//14.查看近期动态
export function state(uid) {
    return axios.get(`/imageservice/image/state/${uid}`)
}
//15.查看个人专辑
export function AlbumwithImg(uid){
    return axios.get(`/imageservice/album/user/${uid}`)
}
//16.查看专辑信息
export function AlbumMsgWithImg(aid){
    return axios.get(`/imageservice/album/withImg/${aid}`)
}
//17.展示常用标签
export function selectOftenLabel(){
    return axios.get('/imageservice/label')
}
//18.查看信息
export function selectImageByImgId(imgId) {
    return axios.get(`/imageservice/image/${imgId}`)
}
//19.查看图片所属评论
export function selectReviewByImgId(ImageReviewVo){
    return axios.post('/imageservice/review',ImageReviewVo)
}
//20.根据标签匹配图片
export function selectImageByTagName(imageVo){
    return axios.post('/imageservice/image/tag',imageVo)
}

//21.根据条件查询资源(分页)
export function selectSourceByCondition(search){
    return axios.post('/imageservice/image/resource',search)
}
//22.收藏与取消收藏
export function collectImg(imgId){
    return axios.get(`/imageservice/image/collect/${imgId}`)
}

//23.点赞与取消点赞
export function likeImg(imgId){
    return axios.get(`/imageservice/image/like/${imgId}`)
}
//24.评论
export function addImgReview(imgreview){
    return axios.post('/imageservice/review/add',imgreview)
}
//25.查看评论
export function lookImgReview(imgreviewVo){
    return axios.post('/imageservice/review',imgreviewVo)
}
//26.评论点赞与取消
export function likereview(rid){
    return axios.get(`/imageservice/review/likereview/${rid}`)
}

//27.查看未读评论
export function lookUnreadReview(){
    return axios.get('/imageservice/review/lookUnreadReview')
}

//28.查看未读信息评论信息
export function lookUnreadReviewMsg(){
    return axios.get('/imageservice/review/lookUnreadReviewMsg')
}

//29.是否关注
export function isAttention(uid){
    return axios.get(`/userservice/attention/isAttention/${uid}`)
}
//30.关注用户
export function attentionUser(uid){
    return axios.get(`/userservice/attention/${uid}`)
}
//31.删除图片集
export function delImgListByImgIdWithUid(imgId){
    return axios.delete(`/imageservice/image/${imgId}`)
}
//32.展示收藏图片集
export function selectCollectImgList(uid){
    return axios.get(`/imageservice/image/collectList/${uid}`)
}
//33.修改用户资料
export function updateUserMsg(user){
    return axios.put('/userservice/user/',user)
}

//查看用户粉丝或关注
export function myCollectOrFans(condition){
    return axios.get(`/userservice/user/myCollectOrFans/${condition.type}/${condition.uid}/${condition.pageNum}/${condition.pageSize}`)
}

//编辑标签
export function updateTags(img){
    return axios.put(`/imageservice/image/updateTags`,img)
}
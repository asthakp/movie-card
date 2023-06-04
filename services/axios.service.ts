import axios from "axios"


const BASE_URL='http://localhost:8080/api/v1/'

export const postData= async(url:string, data:any)=>{
    const response= await axios.post(BASE_URL +url, data)
    return response
}

export const getData= async (url:any)=>{
    const response= await axios.get('https://api.themoviedb.org/3/discover/movie?'+url, {
        headers:{
            Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODdjZGJhOGY2Yjc0YjgyOTEwYzFhZDU2ZTljOTNjNCIsInN1YiI6IjY0NzU5NTljOTI0Y2U2MDBmOTc2MmU0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFY8SaJ0_ZZFVmSrA5qsEcjSC9vJ_3QUJxHab-B-jqQ'
        }
    })

    return response
}

export const searchData= async (url:any)=>{
    const response= await axios.get('https://api.themoviedb.org/3/search/movie?'+url)
    
    
    return response
}

export const getGenreData= async ()=>{
    const response= await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', {
        headers:{
            Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODdjZGJhOGY2Yjc0YjgyOTEwYzFhZDU2ZTljOTNjNCIsInN1YiI6IjY0NzU5NTljOTI0Y2U2MDBmOTc2MmU0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFY8SaJ0_ZZFVmSrA5qsEcjSC9vJ_3QUJxHab-B-jqQ'
        }
    })
    return response
}
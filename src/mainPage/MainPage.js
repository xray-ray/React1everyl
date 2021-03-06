import React,{useState,useRef, useMemo, useEffect} from 'react'
import InformServiceApi from '../API/InformServiceApi';
import { FilterAndSearch } from '../Components/FilterAndSearch';
import InformForm from '../Components/InformForm';
import TableList from '../Components/TableList';
import MyButton from '../Components/UI/button/MyButton';
import MyLoader from '../Components/UI/loader/MyLoader';
import MyModal from '../Components/UI/modal/MyModal';
import MyPagination from '../Components/UI/pagination/MyPagination';
import { useInforms } from '../hooks/useCreateInform';
import { useFetching } from '../hooks/useFetching';
import { getPageArray, getPageCount } from '../utils/pages';
function MainPage() {
  
  const [informs,setInforms]=useState([])
  // const [firstname,setName]=useState("");
  // const [surname,setSurname]=useState("");
  // const [jobs,setJobs]=useState("");
  // const [years,setYears]=useState("");
  // const [address,setAddress]=useState("");
  // const [emailAddress,setEmailAddress]=useState("");
  // object sifatifa berb yuborish usestatga
 
  const createInform=(newInform)=>{
    setInforms([...informs,newInform])
    setModal(false)
  }
 
  // async function fetchInform(){

  //   setIsLoading(true)
  //       const informs=await InformServiceApi.getAllInforms()
  //   // // console.log(response);
  //   setInforms(informs);
  //   setIsLoading(false)
  // } 
  const removeInform=(inform)=>{
      setInforms(informs.filter(s=>s.id!==inform.id))
  }
  const [select,setSelect]=useState('');
  const [search,setSearch]=useState('');
  const [filter,setFilter]=useState({sort:'',query:''})
  const [modal,setModal]=useState(false);
  const sortedAndSearchInforms=useInforms(informs,filter.sort,filter.query)
  const [totalPage,setTotalPage]=useState(0)
  const [limit,setLimit]=useState(5)
  const [page,setPage]=useState(1)
 
  // console.log(pageArray)
    const [fetchInform,isLoading,informError]=useFetching(async (limit,page)=>{
    const response= await InformServiceApi.getAllInforms(limit,page)
    setInforms(response.data)
    const totalCount=response.headers['x-total-count']
    setTotalPage(getPageCount(totalCount,limit))
  })

  useEffect(()=>{
    fetchInform(limit,page)
  },[])
  const changePage=(page)=>{
    setPage(page)
    fetchInform(limit,page)
  }
  // console.log(totalPage)
  // const addPost=(e)=>{
  //   e.preventDefault();
  //   const newPost={
  //     id:Date.now(),
  //     firstname,
  //     surname,
  //     jobs,
  //     years,
  //     address,
  //     emailAddress
  //   }
    // setFirstname("");
    // setSurname("");
    // setJobs("");
    // setYears("");
    // setAddress(""); //input ichidagini uchirib tashash un qushiladi
    // setEmailAddress("");
    // console.log(name);
  // }
  // const  SortedInform=useMemo(()=>{
  //   // console.log("first")
  //   if(filter.sort){
  //     return [...informs].sort((a,b)=>a[filter.sort].localeCompare(b[filter.sort]))
  //   }
  //   return informs
  // },[filter.sort,informs])
  // const sortedSearchAndInform=useMemo(()=>{
  //     return SortedInform.filter(inform=>inform.firstname.toLowerCase().includes(filter.query.toLowerCase()))
  // },[filter.query,SortedInform])
  // const sortSelect=(sort)=>{
  //   setSelect(sort);
  //   // console.log(sort);
  //   setInforms([...informs].sort((a,b)=>a[sort].localeCompare(b[sort])))
  //   // setInforms([...informs].sort((a,b)=>a[sort].localeCompare(b[sort])))

  // }
  return (
    <>
    <div className="app px-3 my-5 py-3 ">
      <MyButton onClick={()=>setModal(true)} className="btn btn-outline-success w-100">Add Inform Workers</MyButton>
      <MyModal modal={modal} setModal={setModal}>
      <InformForm createInform={createInform}/>
      </MyModal>
      <FilterAndSearch filter={filter} setFilter={setFilter}/>
      {/* {informError?<p>xatolik</p>:<p>tugri</p>} */}
      {isLoading
      ?
      <div className='loadercenter'><MyLoader/></div> 
      :
      <TableList remove={removeInform} informse={sortedAndSearchInforms} title={"Uzbekistan, Tashkent Shop Managment System Info"}/>
      }
    
      <MyPagination page={page} changePage={changePage} totalPage={totalPage}/>
    </div>
  
    </>
  );
  }

export default MainPage;

import React, { useEffect, useState } from 'react'
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {styled} from '@mui/material';
import { Box } from '@mui/system';
import SimpleTypegraphy from '../../Components/SimpleTypegraphy/index';
import {  TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {instance} from '../../../axios';
import { useRouter } from 'next/router'


function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const StyledRow = styled(TableRow)(
    ( theme ) => `
        background:#fff;
        border: 1px solid #f1f1f2;
        border-radius:10px;
        padding:14px 21px;
        height:50px;
        cursor:pointer;
        margin-bottom:1px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width:100%;

        &:hover{
            background:#fafafa
        }

        td,th{
            border: 0;
            width:14.2%
        }
  `
  );

const tabsWrapperStyle = {
    background:"#fff",
    paddingRight:"32px",
    borderRadius:"12px 12px 0px 0px",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between"
}

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];



function OrdersTable() {
    const [value, setValue] = useState(0);
    const [orders,setOrders] = useState([])
    const route = useRouter()
   
    useEffect(()=> {
        instance.post(
            `/users/login`,{tgid: 123, password: "admin"}
          )
          .then(function(response) {
          })
          .catch(function(error) {
            console.log(error);
          });
    },[]) 

    useEffect(()=> {
        instance.get(
            `orders`,{headers: {
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0Z2lkIjpudWxsLCJpZCI6MSwicm9sZSI6MiwiaWF0IjoxNjY4MjUyNTU1fQ.KOXs06thZAisjqPr1ICoJTHNQL4WzXgD2M59V-LJ3JI"
              }}
          )
          .then(function(response) {
            setOrders(response)
          })
          .catch(function(error) {
            console.log(error);
          });
    },[]) 

    console.log();

    const TabsData = [
        {
            id:1,
            text:"Barcha",
        },
        {
            id:2,
            text:"Tasdiqlanmagan",
        },
        {
            id:3,
            text:"Tayyorlanmoqda",
        },
        {
            id:4,
            text:"Yetkazilgan",
        },
    ]

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function rowHandler(id) {
        console.log(id);
        route.push(
            `/order/${id}`)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{  borderColor: 'divider' }}>
                <Box sx={tabsWrapperStyle}>
                    <Tabs   sx={{
                        [`& .${tabsClasses.indicator}`]: {
                            backgroundColor:"#01605a"
                        },
                    }} value={value} onChange={handleChange} aria-label="basic tabs example">
                        {
                            TabsData.map(item => (
                                <Tab sx={{padding:"21px 32px"}}  key={item.id} label={<SimpleTypegraphy text={item.text} variant="span" className="tab__text" />} {...a11yProps(item.id)} />
                            ))
                        }
                        
            
                    </Tabs>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            sx={{width:"300px"}}
                            label="ID/Xaridor bo’yicha qidiring..."
                            id="outlined-size-small"
                            size="small"
                            
                        />
                    </Box>
                </Box>
                <TableContainer sx={{boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.03)",padding:"24px 34px"}} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <StyledRow sx={{background:"#f6f6f6"}}>
                                <TableCell sx={{width:"14.2%"}}><SimpleTypegraphy className="table__title" variant={"span"} text={"ID"} /></TableCell>
                                <TableCell sx={{width:"14.2%"}} ><SimpleTypegraphy className="table__title" variant={"span"} text={"Buyurtmalar soni"} /></TableCell>
                                <TableCell sx={{width:"14.2%"}} ><SimpleTypegraphy className="table__title" variant={"span"} text={"Xaridorning raqami"} /></TableCell>
                                <TableCell sx={{width:"14.2%"}} ><SimpleTypegraphy className="table__title" variant={"span"} text={"Narx"} /></TableCell>
                                <TableCell sx={{width:"14.2%"}} ><SimpleTypegraphy className="table__title" variant={"span"} text={"Xaridor"} /></TableCell>
                                <TableCell sx={{width:"14.2%"}} ><SimpleTypegraphy className="table__title" variant={"span"} text={"Buyurtma vaqti"} /></TableCell>
                                <TableCell sx={{width:"14.2%"}} ><SimpleTypegraphy className="table__title" variant={"span"} text={"Status"} /></TableCell>
                            </StyledRow>
                        </TableHead>
                        <TableBody >
                        {orders?.data?.data?.orders?.map((order,index) => (

                            <StyledRow
                                key={index}
                                onClick={()=> rowHandler(order.id)}
                            >
                                <TableCell  component="th" scope="row">
                                    <SimpleTypegraphy className="table__id" variant={"span"} text={`#${order.id}`} />
                                </TableCell>
                                <TableCell >
                                    <SimpleTypegraphy className="order__items" variant={"span"} text={`${order.order_items.length} ta`} />
                                </TableCell>
                                <TableCell >{order.user.phone_number}</TableCell>
                                <TableCell >{order.price === null ? <SimpleTypegraphy className="order__price--empty" variant={"span"} text={"KIRITILMAGAN"} /> : null}</TableCell>
                                <TableCell >{order.user.full_name}</TableCell>
                                <TableCell >Naqd</TableCell>
                                <TableCell>
                                    {
                                        order.status === 1 ?  <SimpleTypegraphy className="order__new" variant={"span"} text={`YANGI`} /> : null
                                    }
                                    {
                                        order.status === 0 ?  <SimpleTypegraphy className="order__cancelled" variant={"span"} text={`BEKOR_QILINGAN`} /> : null
                                    }
                                    {
                                        order.status === 2 ?  <SimpleTypegraphy className="order__pending" variant={"span"} text={`TO'LOVDA`} /> : null
                                    }
                                    {
                                        order.status === 4 ?  <SimpleTypegraphy className="order__verify" variant={"span"} text={`TASDIQLANGAN`} /> : null
                                    }
                                    {
                                        order.status === 5 ?  <SimpleTypegraphy className="order__delivered" variant={"span"} text={`YETQAZILGAN`} /> : null
                                    }
                                    {
                                        order.status === 3 ?  <SimpleTypegraphy className="order__checking" variant={"span"} text={`TEKSHRILMOQDA`} /> : null
                                    }
                                
                                </TableCell>
                            </StyledRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default OrdersTable
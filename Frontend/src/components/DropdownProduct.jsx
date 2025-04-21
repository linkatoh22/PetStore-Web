import styled from "styled-components";
import {useNavigate} from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
const ProductFoodDog = ["Thức ăn Hạt","Sữa Cho Bé Lớn Và Nhỏ","Pate - Nước Sốt","Bánh thưởng & Xương Gặm"]
const ProductFoodCat = ["Thức ăn Hạt","Sữa Cho Bé Lớn Và Nhỏ","Pate - Nước Sốt","Bánh thưởng & Xương Gặm"]

const ProductAccessoriesDog=["Quần áo","Đồ chơi","Vòng cổ & Dây Dắt & Phụ kiện","Bình nước & Bát ăn & Lược Chải"];
const ProductAccessoriesCat=["Quần áo","Đồ chơi","Vòng cổ & Dây Dắt & Phụ kiện","Bình nước & Bát ăn & Lược Chải"];

const ProductHygineCareDog=["Sữa Tắm & Khăn Tắm & Nước Hoa","Bỉm & Tã & Khay Vệ Sinh"];
const ProductHygineCareCat=["Sữa Tắm & Khăn Tắm & Nước Hoa","Cát vệ sinh cho mèo"];

const ProductCageDog=["Chuồng & Nhà & Chậu Cát","Balo & Túi Vận Chuyển","Đệm & Nệm - Ổ nằm"];
const ProductCageCat=["Chuồng & Nhà & Chậu Cát","Balo & Túi Vận Chuyển","Đệm & Nệm - Ổ nằm"];

const ProductMedicineDog=["Thuốc Thú Y và thiết bị y Tế","Thực Phẩm Chức Năng"];
const ProductMedicineCat=["Thuốc Thú Y và thiết bị y Tế","Thực Phẩm Chức Năng"];
const DropdownProductContainer  = styled.div`
    display:flex;
    width:1200px;
    flex-direction:row;
    padding:1rem;
    background-color: rgb(3, 74, 126);
    position: absolute;
    gap:1.5rem;
    top:100%;
    left:-220%;
    z-index:1000;
`
const DropdownProductItem = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:5rem;
    align-items:center;
`
const DropdownProductCategoryContainer = styled.div`
    display:flex;
    flex-direction: row;
    gap:1rem;
`
const DropdownProductCategoryItem =styled.div`
    display:flex;
    flex-direction:column;
    font-size:1.1rem;
    color: var(--success-500);
    gap:1rem;
    
`
const DropdownProductCategory = styled.div`
    display:flex;
    flex-direction:column;
    font-size:1rem;
    color:var(--grey-200);
    gap:1rem;
    

`

const DropdownProductCategoryBtn = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    width:100%;
    border:none;
    border-bottom: 1px solid white;
    padding-bottom:1rem;
    &:hover{
        color :var(--grey-400);
    }


`

export function DropdownProduct(){
    const navigate = useNavigate();
    const HandleNav = (category,subcategory)=>{
        navigate(`/category/phu-kien/${category}/${subcategory}`)

    }

    return (
        <DropdownProductContainer>
                <DropdownProductItem>
                    <div style={{color:"var(--warning-600)", fontWeight:"bold"}}>PHỤ KIỆN CỦA CHÓ</div>
                    <DropdownProductCategoryContainer>
                        <DropdownProductCategoryItem>

                            <div>THỨC ĂN VÀ THỰC PHẨM DINH DƯỠNG</div>

                                <DropdownProductCategory>
                                    { ProductFoodDog.map((item)=>{

                                        return (
                                            <DropdownProductCategoryBtn onClick={()=>HandleNav("Thức ăn và thực phẩm dinh dưỡng",item)}> 
                                                <IoIosArrowForward /> {item}
                                            </DropdownProductCategoryBtn>
                                        )

                                    })}
                                </DropdownProductCategory>

                            <div>ĐỒ DÙNG & ĐỒ CHƠI & PHỤ KIỆN</div>

                                <DropdownProductCategory>
                                    { ProductAccessoriesDog.map((item)=>{

                                        return (
                                            <DropdownProductCategoryBtn onClick={()=>HandleNav("Đồ dùng & đồ chơi & phụ kiện",item)}> 
                                                <IoIosArrowForward /> {item}
                                            </DropdownProductCategoryBtn>
                                        )
                                    })}
                                </DropdownProductCategory>
                        
                        </DropdownProductCategoryItem>


                        <DropdownProductCategoryItem>
                           <div>VỆ SINH & CHĂM SÓC</div>
                           <DropdownProductCategory>

                                    { ProductHygineCareDog.map((item)=>{

                                        return (
                                            <DropdownProductCategoryBtn onClick={()=>HandleNav("Vệ sinh & Chăm sóc",item)}>
                                                <IoIosArrowForward /> {item}
                                            </DropdownProductCategoryBtn>
                                        )


                                    })}

                            </DropdownProductCategory>



                           <div> CHUỒNG, NHÀ, BALO, QUÂY, ĐỆM</div>
                           <DropdownProductCategory>

                                    { ProductCageDog.map((item)=>{

                                        return (
                                            <DropdownProductCategoryBtn onClick={()=>HandleNav("Chuồng, nhà , balo, quây, đệm",item)}>
                                                <IoIosArrowForward /> {item}
                                            </DropdownProductCategoryBtn>
                                        )
                                    })}

                            </DropdownProductCategory>

                           <div> THUỐC VÀ THỰC PHẨM CHỨC NĂNG</div>
                           <DropdownProductCategory>

                                    { ProductMedicineDog.map((item)=>{

                                        return (
                                            <DropdownProductCategoryBtn 
                                            onClick={()=>HandleNav("Thuốc và thực phẩm chức năng",item)}
                                            >
                                                <IoIosArrowForward /> {item}
                                            </DropdownProductCategoryBtn>
                                        )
                                    })}

                            </DropdownProductCategory>


                        </DropdownProductCategoryItem>



                    </DropdownProductCategoryContainer>
                </DropdownProductItem>


                <DropdownProductItem>
                    <div style={{color:"var(--blue-600)", fontWeight:"bold"}}>PHỤ KIỆN CỦA MÈO</div>

                    <DropdownProductCategoryContainer>

                        <DropdownProductCategoryItem>

                        <div>THỨC ĂN VÀ THỰC PHẨM DINH DƯỠNG</div>
                                <DropdownProductCategory>

                                    { ProductFoodCat.map((item)=>{

                                            return (
                                                <DropdownProductCategoryBtn 
                                                onClick={()=>HandleNav("Thức ăn và thực phẩm dinh dưỡng",item)}
                                                > 
                                                    <IoIosArrowForward /> {item}
                                                </DropdownProductCategoryBtn>
                                            )
                                    })}

                                </DropdownProductCategory>


                            <div>ĐỒ DÙNG & ĐỒ CHƠI & PHỤ KIỆN</div>
                                <DropdownProductCategory>

                                    { ProductAccessoriesCat.map((item)=>{

                                            return (
                                                <DropdownProductCategoryBtn
                                                onClick={()=>HandleNav("Đồ dùng & đồ chơi & phụ kiện",item)}
                                                
                                                > 
                                                    <IoIosArrowForward /> {item}
                                                </DropdownProductCategoryBtn>
                                            )
                                    })}

                                </DropdownProductCategory>

                        </DropdownProductCategoryItem>


                        <DropdownProductCategoryItem>
                           <div>VỆ SINH VÀ CHĂM SÓC</div>
                                <DropdownProductCategory>

                                    { ProductHygineCareCat.map((item)=>{

                                            return (
                                                <DropdownProductCategoryBtn
                                                onClick={()=>HandleNav("Vệ sinh & Chăm sóc",item)}>
                                                    <IoIosArrowForward /> {item}
                                                </DropdownProductCategoryBtn>
                                            )
                                    })}

                                </DropdownProductCategory>



                           <div> CHUỒNG, NHÀ, BALO, QUÂY, ĐỆM</div>
                                <DropdownProductCategory>

                                    { ProductCageCat.map((item)=>{

                                        return (
                                            <DropdownProductCategoryBtn
                                            onClick={()=>HandleNav("Chuồng, nhà , balo, quây, đệm",item)}
                                            > 
                                                <IoIosArrowForward /> {item}
                                            </DropdownProductCategoryBtn>
                                        )
                                    })}

                                </DropdownProductCategory>


                           <div> THUỐC VÀ THỰC PHẨM CHỨC NĂNG</div>
                                <DropdownProductCategory>

                                    { ProductMedicineCat.map((item)=>{

                                            return (
                                                <DropdownProductCategoryBtn
                                                onClick={()=>HandleNav("Thuốc và thực phẩm chức năng",item)}
                                                > 
                                                    <IoIosArrowForward /> {item}
                                                </DropdownProductCategoryBtn>
                                            )
                                    })}

                                </DropdownProductCategory>


                        </DropdownProductCategoryItem>


                    </DropdownProductCategoryContainer>
                </DropdownProductItem>

            </DropdownProductContainer>

    )
}
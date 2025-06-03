export const FormattedPrice = (price)=>{
    if(price)
    {
        const formattedMaxPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
            }).format(price);

        return formattedMaxPrice
    }
    return "Chưa cập nhập"
}
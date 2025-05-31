export const FormattedPrice = (price)=>{
    const formattedMaxPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
            }).format(price);
    return formattedMaxPrice
}